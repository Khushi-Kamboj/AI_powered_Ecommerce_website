import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";

export const registration = async(req , res) => {
    try{
        const {name , email , password } = req.body;

        const existUser = await User.findOne({email});
        if(existUser){
            const token = await genToken(existUser._id);
            res.cookie("token" , token , {
                httpOnly : true,
                secure: false,
                sameSite:"Strict",
                maxAge : 7 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({message: "User already exists, logged in successfully", user: existUser});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message : "Enter valid email"});
        }
        if(password.length < 8){
            return res.status(400).json({message:"Enter strong Password"});
        }

        let hashPassword = await bcrypt.hash(password , 10);

        const user = await User.create({name , email , password:hashPassword});

        const token = await genToken(user._id);
        res.cookie("token" , token , {
            httpOnly : true,
            secure: false,
            sameSite:"Strict",
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user);
    } catch(error){
        console.log("registration error");
        return res.status(500).json({message:`registration error ${error}`});

    }
}

export const login = async(req , res) => {
    try{
        let {email , password}  = req.body;

        let user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User is not Found"});
        }

        let isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"});
        }

        const token = await genToken(user._id);
        res.cookie("token" , token , {
            httpOnly : true,
            secure: false,
            sameSite: "Lax", // Changed from "Strict" to "Lax"
            path: "/", // Added explicit path
            maxAge : 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user);
    }
    catch(error){
        console.log("login error");
        return res.status(500).json({message:`login error ${error}`});
    }
}

export const logout = async(req ,res) =>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"Logout successful"});
    }
    catch(error){
        console.log("logout error");
        return res.status(500).json({message:`logout error ${error}`});
    }
}

export const googleLogin = async(req , res) => {
    try{
        const {name , email } = req.body;

        let user = await User.findOne({email});
        if(!user){
            user = await User.create({ name, email });
        }

        const token = await genToken(user._id);
        res.cookie("token" , token , {
            httpOnly : true,
            secure: false,
            sameSite:"Strict",
            maxAge : 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json(user);
    } catch(error){
        console.log("Google login error", error);
        return res.status(500).json({message:`Google login error ${error}`});
    }
}


export const adminLogin = async(req, res) => {
    try{
        let {email , password} = req.body;
        
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = await genToken1(email);
            res.cookie("token" , token , {
                httpOnly : true,
                secure: false,
                sameSite: "Lax", // Changed from "Strict" to "Lax"
                path: "/", // Added explicit path
                maxAge : 1 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json({ 
                email, 
                role: 'admin',
                token: token // Add token to response body
            });
        }

        return res.status(400).json({message:"Invalid credentials"})
    }catch(error){
        console.log("Admin login error", error);
        return res.status(500).json({message:`Admin login error ${error}`});
    }
}
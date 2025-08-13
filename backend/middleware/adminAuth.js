import jwt from 'jsonwebtoken';

const adminAuth = async(req , res , next) => {
  
    try{
        let {token} = req.cookies;

        if(!token){
            return res.status(400).json({message: "Not Authorized Login Again"})
        }
    
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
    
        if(!verifyToken){
            return res.status(400).json({message: "Not Authorized Login Again, Invalid Token"})
        }

        if(!verifyToken.email || verifyToken.email !== process.env.ADMIN_EMAIL){
            return res.status(400).json({message: "Not Authorized - Admin access required"})
        }
    
        req.adminEmail = verifyToken.email;
        next();
    
    }catch(error){
        console.log("adminAuth error", error);
        return res.status(400).json({message: "Not Authorized Login Again, Invalid Token"})
    }
}

export default adminAuth
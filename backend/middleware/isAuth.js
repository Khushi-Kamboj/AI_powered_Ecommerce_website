import jwt from 'jsonwebtoken';

const isAuth = async(req , res , next) => {
    try{
        let {token} = req.cookies
        
        if(!token){
            return res.status(400).json({message : "User Doesn't have token"})
        }

        let verifyToken;
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "User doesn't have a valid token" });
        }

        // The payload property name depends on how you sign the token
        // If you use { userId: ... } in your payload, this is correct
        req.userId = verifyToken.userId || verifyToken.id || verifyToken._id;
        next();
    } catch (error) {
        console.log("isAuth error", error);
        return res.status(500).json({ message: `isAuth error ${error}` });
    }
};

export default isAuth;
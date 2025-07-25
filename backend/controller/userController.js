import User from "../model/userModel.js";

export const getCurrentUser = async(req , res) => {
    try{
        let user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User is not found" });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error("getCurrentUser error:", error);
        return res.status(500).json({ message: `getCurrentUser error: ${error.message || error}` });
    }
};
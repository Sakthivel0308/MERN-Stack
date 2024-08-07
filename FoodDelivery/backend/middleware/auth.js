import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if(!token) {
        return res.json({success: false, message: "Not authorized Login Again"})
    }

    try{
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        next();
    }catch(err){
        console.log(err);
        return res.json({success: false, message: "Error"})
    }
}

export default authMiddleware;
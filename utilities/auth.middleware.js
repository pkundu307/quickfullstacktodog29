import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";

const JWT_SECRET = process.env.secretKey || "secretkey";

export const protect = async (req, res, next) => {
  try {
    console.log("Auth Middleware Invoked");
    
    const auth = req.headers
    console.log(auth);
    
    // if (!auth || !auth.startsWith("Bearer "))
    //   return res.status(401).json({ message: "No token provided" });

    const token = auth.authorization.split(" ")[1];
    console.log(token);
    console.log(JWT_SECRET);
    
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(token,'./././.');

    // attach user minimal info
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    

    req.user = { id: user._id, email: user.email, name: user.name };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
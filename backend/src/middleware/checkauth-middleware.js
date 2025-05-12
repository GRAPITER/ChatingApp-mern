import jwt from "jsonwebtoken";
import User from "../modals/user.js";
export async function checkAuthMiddleware(req, res, next) {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      res.status(404).json({
        success: false,
        message: "this user is not loged in currently",
      });
    }
    const checkToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!checkToken) {
      res.status(400).json({
        success: false,
        message: "this user is not loged in currently",
      });
    }

    const dataUser = await User.findById(checkToken.id).select("-password");

    if (!dataUser) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = dataUser;

    next();
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: "this user is erreo in middleware",
    });
  }
}

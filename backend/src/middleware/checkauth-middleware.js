import jwt from "jsonwebtoken";
export async function checkAuthMiddleware(req, res, next) {
  try {
    const token = req.cookie?.jwtToken;
    if (!token) {
      res.status(200).json({
        success: false,
        message: "this user is not loged in currently",
      });
    }
    const checkToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!checkToken) {
      res.status(200).json({
        success: false,
        message: "this user is not loged in currently",
      });
    }
    req.user = checkToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: "this user is erreo in middleware",
    });
  }
}

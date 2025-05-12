import User from "../modals/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../libs/cloudinary.js";

export async function signup(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "plz enter Fullname OR EMAIL OR pASSWORD",
      });
    }

    const checkEmail = await User.findOne({
      email,
    });

    if (checkEmail) {
      return res.status(404).json({
        success: false,
        message: "this email is already exist",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const addUser = await User.create({
      fullName,
      email,
      password: encryptedPassword,
    });

    if (addUser) {
      const token = jwt.sign({ id: addUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("jwtToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      res.status(202).json({
        success: true,
        message: "signup is sussessfull",
        token: token,
        data: addUser,
      });
    } else {
      res.status(202).json({
        success: false,
        message: "user can not added in database",
      });
    }
  } catch (error) {
    console.log("there is an error on signup", error);
    res.status(404).json({
      success: false,
      message: "there is an error on signup",
    });
  }
}
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "there is no user with this email",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(404).json({
        success: false,
        message: "your email or password is wrong",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwtToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({
      success: true,
      message: "user is Loged IN",
      data: user,
    });
  } catch (error) {
    console.log("there is an error on login", error);
    res.status(404).json({
      success: false,
      message: "there is an error on login",
    });
  }
}
export async function logout(req, res) {
  try {
    res.cookie("jwtToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "there is an error on logout",
    });
  }
}

export async function profile(req, res) {
  try {
    const { image } = req.body;
    const Userid = req.user._id;

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "plz upload you image first",
      });
    }

    const uploadCloud = await cloudinary.uploader.upload(image);

    const update = await User.findByIdAndUpdate(
      Userid,
      { image: uploadCloud.secure_url },
      { new: true }
    );
    res.status(200).json(update);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "there is an error on logout",
    });
  }
}

export async function checkAuth(req, res) {
  try {
    res.status(202).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    console.log("there is an error ochecking auth", error);
    res.status(404).json({
      success: false,
      message: "there is an error checking auth",
    });
  }
}

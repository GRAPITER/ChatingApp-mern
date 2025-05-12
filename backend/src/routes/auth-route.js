import express from "express";

import {
  checkAuth,
  login,
  logout,
  profile,
  signup,
} from "../controllers/auth-controller.js";
import { checkAuthMiddleware } from "../middleware/checkauth-middleware.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", checkAuthMiddleware, profile);

router.get("/checkauth", checkAuthMiddleware, checkAuth);

export default router;

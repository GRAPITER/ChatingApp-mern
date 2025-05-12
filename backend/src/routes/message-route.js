import express from "express";
import {
  allUser,
  getMessages,
  sendMessages,
} from "../controllers/message-controller.js";
import { checkAuthMiddleware } from "../middleware/checkauth-middleware.js";
const router = express.Router();

router.get("/allUser", checkAuthMiddleware, allUser);
router.get("/:id", checkAuthMiddleware, getMessages);
router.post("/send/:id", checkAuthMiddleware, sendMessages);

export default router;

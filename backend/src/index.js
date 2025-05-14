import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import connectToDB from "./database/data.js";
import authRouter from "./routes/auth-route.js";
import cors from "cors";
import router from "./routes/message-route.js";
import { app, server, io } from "./libs/socket.js";

const PORT = process.env.PORT;

connectToDB();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", router);

server.listen(PORT, () => {
  console.log(`connected to the Port ${PORT}`);
});

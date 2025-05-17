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
const __dirname = path.resolve();
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`connected to the Port ${PORT}`);
});

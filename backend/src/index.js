import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDB from "./database/data.js";
import authRouter from "./routes/auth-route.js";
const app = express();
const PORT = process.env.PORT;

connectToDB();

app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`connected to the Port ${PORT}`);
});

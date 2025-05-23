import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getRecieverSocket(userId) {
  return userSocketMap[userId];
}

//use to store online user

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  console.log("userID of shakeHand query", userId);
  if (userId) userSocketMap[userId] = socket.id;
  console.log(userSocketMap);

  io.emit("currentlyConnectedUser", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("currentlyConnectedUser", Object.keys(userSocketMap));
  });
});

export { io, app, server };

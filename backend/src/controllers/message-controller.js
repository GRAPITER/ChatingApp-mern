import User from "../modals/user.js";
import Message from "../modals/message-modal.js";
import cloudinary from "../libs/cloudinary.js";
import { getRecieverSocket, io } from "../libs/socket.js";

//ok so in sidebar of application we show the user who is currently logged in so we goona fetch all user expect me real quick
export async function allUser(req, res) {
  try {
    const curUserId = req.user._id;
    const loggedIn = await User.find({ _id: { $ne: curUserId } }).select(
      "-password"
    );
    if (!loggedIn) {
      return res.status(400).json({
        success: false,
        message: "there is no user in this app",
      });
    }

    res.status(200).json({
      success: true,
      data: loggedIn,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "can not fetch all user",
    });
  }
}

//to get all messages

export async function getMessages(req, res) {
  try {
    const { id: toChatWith } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverID: toChatWith },
        { senderId: toChatWith, recieverID: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "can not fetch all messages",
    });
  }
}

//to send messages to user to chat with
export async function sendMessages(req, res) {
  try {
    const { message, image } = req.body;
    const { id: receiverId } = req.params;
    const myId = req.user.id;
    let imageUrl;
    if (image) {
      const imageUpload = await cloudinary.uploader.upload(image);
      imageUrl = imageUpload.secure_url;
    }

    const post = await Message.create({
      senderId: myId,
      recieverID: receiverId,
      text: message,
      image: imageUrl,
    });

    const recieverSocketId = getRecieverSocket(receiverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("userNewMessage", post);
    }

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "can not send messages",
    });
  }
}

import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_DATA);
    console.log("connection to databse is successfull");
  } catch (error) {
    console.log("could not connected to Database ", error);
  }
}

import mongoose from "mongoose";

const connectMongoose = async () =>
  mongoose.connect(process.env.MONGODB_URI as string);

export default connectMongoose;

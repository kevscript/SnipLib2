import { Schema, model, models } from "mongoose";

export type UserType = {
  name: string;
  email: string;
  image: string;
  emailVerified: any;
};

const userSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  emailVerified: {
    required: false,
  },
});

const User = models.User || model("User", userSchema);

export default User;

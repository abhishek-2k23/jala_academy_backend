import mongoose, { Schema, Document } from "mongoose";

// Define the User interface extending mongoose.Document
interface IUser extends Document {
  id?: number; // Optional because it's not marked as required in the schema
  email: string;
  password: string;
  name: string;
  role?: "ADMIN" | "STUDENT"; // Optional because it's not marked as required in the schema
}

// Define the User schema
const userSchema: Schema<IUser> = new mongoose.Schema({
  id: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "STUDENT"],
  },
});

// Export the User model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
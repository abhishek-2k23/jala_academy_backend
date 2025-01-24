import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
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
    enum: ["ADMIN", "STUDENT"],
  },
})

const User = mongoose.model("User", userSchema)
export default User

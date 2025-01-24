import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: Number,
    email: String,
    password: String,
    name: String,
    role: String,
})

const User = mongoose.model('User', userSchema);
export default User;
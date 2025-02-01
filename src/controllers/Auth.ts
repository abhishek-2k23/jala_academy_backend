import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Define a type for the User object
interface IUser {
  id?: string;
  email: string;
  password: string;
  name: string;
  role?: string;
}

// Register Controller
export const register = async (req: Request, res: Response) => {
  try {
    const { id, email, password, name, role }: IUser = req.body;

    // Check for required data
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Missing data",
      });
    }

    // Check for already registered user
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(302).json({
        status: false,
        message: "You are already registered",
      });
    }

    // Encrypt the password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
    const encrypted_password = await bcrypt.hash(password, saltRounds);

    // Create a new user instance
    const updatedUser = new User({
      id,
      email,
      password: encrypted_password,
      name,
      role,
    });

    // Save the user
    const saved_user = await updatedUser.save();

    return res.status(200).json({
      status: true,
      message: "User created successfully",
      user: saved_user,
    });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    // Check for missing data
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Missing data",
      });
    }

    // Check for user in the database
    const isUserExist = await User.findOne({ email }).lean();
    if (!isUserExist) {
      return res.status(401).json({
        status: false,
        message: "You are not registered",
      });
    }

    // Extract user data without the password
    const { _id, password: hashPassword, ...userWithoutPassword } = isUserExist;

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, hashPassword || "");
    if (passwordMatch) {
      return res.status(200).json({
        status: true,
        message: "Logged in successfully",
        user: userWithoutPassword,
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Password is incorrect",
      });
    }
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
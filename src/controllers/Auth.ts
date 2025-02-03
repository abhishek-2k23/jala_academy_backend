import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Define a type for the User object
interface IUser {
  email: string;
  password: string;
  name: string;
  role: string;
}

//register multiple users
export const registerMultipleUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = req.body; // Expect an array of user objects

    // Check if the request body is an array
    if (!Array.isArray(users)) {
      return res.status(400).json({
        status: false,
        message: "Expected an array of user data",
      });
    }

    // Validate each user in the array
    const validUsers: IUser[] = [];
    const duplicateEmails: string[] = [];

    for (const user of users) {
      const { email, password, name } = user;

      // Check for required data
      if (!name || !email || !password) {
        return res.status(400).json({
          status: false,
          message: "Missing data for one or more users",
        });
      }

      // Check for duplicate email
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        duplicateEmails.push(email);
        continue; // Skip this user if duplicate
      }

      // Encrypt the password
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
      const encrypted_password = await bcrypt.hash(password, saltRounds);

      // Add valid user to the list
      validUsers.push({
        ...user,
        password: encrypted_password,
        role: "ADMIN"
      });
    }

    // If all users are duplicates, return an error
    if (validUsers.length === 0 && duplicateEmails.length > 0) {
      return res.status(400).json({
        status: false,
        message: "All users already exist",
        duplicateEmails,
      });
    }

    // Save valid users to the database
    const savedUsers = await User.insertMany(validUsers);

    return res.status(200).json({
      status: true,
      message: "Users created successfully",
      users: savedUsers,
      duplicateEmails, // Return list of duplicate emails (if any)
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
import User from "../models/User"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

export const register = async (req, res) => {
  try {
    const { id, email, password, name, role } = req.body

    // Check for required data
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Missing data",
      })
    }
    //check for already registered user
    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      return res.status(302).json({
        status: false,
        message: "you are already register",
      })
    }

    // Encrypt the password
    const encrypted_password = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
    )

    // Create a new user instance
    const updatedUser = new User({
      id,
      email,
      password: encrypted_password,
      name,
      role,
    })

    // Save the user
    const saved_user = await updatedUser.save()

    return res.status(200).json({
      status: true,
      message: "User created successfully",
      user: saved_user,
    })
  } catch (e) {
    console.error(e.message)
    return res.status(500).json({
      status: false,
      message: "Server error",
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    //check for data missing
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Missing data",
      })
    }

    //check for user in db
    const isUserExist = await User.findOne({ email }).lean()
    if (!isUserExist) {
      return res.status(401).json({
        status: false,
        message: "you are not registered",
      })
    } else {
      const { password: hashPassword, ...userWithoutPassword } = isUserExist
      //if user exist then match the password by comparing
      bcrypt.compare(password, hashPassword || "").then((passwordMatch) => {
        //on password match

        if (passwordMatch) {
          return res.status(200).json({
            status: true,
            message: "logged in successfully",
            user: userWithoutPassword,
          })
        } else {
          //on password not match
          return res.status(401).json({
            status: false,
            message: "Password is incorrect",
          })
        }
      })
    }
  } catch (e) {
    console.error(e.message)
    return res.status(500).json({
      status: false,
      message: "Server error",
    })
  }
}

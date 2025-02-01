import { Request, Response } from "express";
import Student from "../models/Student.js";

// Define a type for the Student object
interface IStudent {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  type: string;
  amountPaid?: number;
  dueAmount?: number;
  discount?: number;
  dateOfJoining: string;
  incentivesPaid?: number;
  country: string;
  state: string;
  address: string;
  governmentIdProof: string;
  activityStatus?: string;
  inactiveOn?: string;
  inactivityReason?: string;
}

// Create Student Controller
export const createStudent = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      phoneNumber,
      email,
      type,
      amountPaid,
      dueAmount,
      discount,
      dateOfJoining,
      incentivesPaid,
      country,
      state,
      address,
      governmentIdProof,
      activityStatus,
      inactiveOn,
      inactivityReason,
    }: IStudent = req.body;

    // Validate required fields
    if (
      !id ||
      !name ||
      !phoneNumber ||
      !email ||
      !type ||
      !dateOfJoining ||
      !country ||
      !state ||
      !address ||
      !governmentIdProof
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields",
      });
    }

    // Check if phoneNumber or email is already registered
    const existingStudent = await Student.findOne({
      $or: [{ phoneNumber }, { email }],
    });

    if (existingStudent) {
      return res.status(409).json({
        status: false,
        message: "Phone number or email is already registered",
      });
    }

    // Create the new student object
    const newStudent = new Student({
      id,
      name,
      phoneNumber,
      email,
      type,
      amountPaid,
      dueAmount,
      discount,
      dateOfJoining,
      incentivesPaid,
      country,
      state,
      address,
      governmentIdProof,
      activityStatus,
      inactiveOn,
      inactivityReason,
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();

    // Return success response
    return res.status(201).json({
      status: true,
      message: "Student created successfully",
      studentData: savedStudent,
    });
  } catch (error: any) {
    console.error("Error creating student:", error.message);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// Search Student by Phone Number Controller
export const searchStudentWithNumber = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;

    // Validate phone number format
    if (phoneNumber.length !== 12 || isNaN(Number(phoneNumber))) {
      return res.status(403).json({
        status: false,
        message: "Not a correct phone number",
      });
    }

    // Find student by phone number
    const studentData = await Student.findOne({ phoneNumber });

    // If no student found
    if (!studentData) {
      return res.status(404).json({
        status: false,
        message: "No student found with this phone number",
      });
    }

    // Return student data
    return res.status(200).json({
      status: true,
      message: "Found student",
      studentData,
    });
  } catch (e: any) {
    console.log(e.message);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// Get All Students Controller
export const getStudentData = (req: Request, res: Response) => {
  Student.find()
    .then((data) =>
      res.status(200).json({
        status: true,
        message: "Fetched student data",
        studentData: data,
      })
    )
    .catch((e: any) => {
      console.log(e.message);
      return res.status(500).json({
        status: false,
        message: "Error while fetching student data",
      });
    });
};

// Update Student Controller
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract student ID from URL params
    const updateData = req.body; // Extract new data from request body

    // Check if student exists
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        status: false,
        message: "Student not found",
      });
    }

    // Update student data while keeping the ID intact
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Return updated doc & validate changes
    });

    return res.status(200).json({
      status: true,
      message: "Student updated successfully",
      updatedStudentData: updatedStudent,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
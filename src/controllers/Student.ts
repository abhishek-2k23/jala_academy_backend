import Student from '../models/Student.js';

export const createStudent = async (req, res) => {
  try {
    const {
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
    } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !email || !type || !dateOfJoining || !country || !state || !address || !governmentIdProof) {
      return res.status(400).json({
        status: false,
        message: 'Missing required fields',
      });
    }

    // Check if phoneNumber or email is already registered
    const existingStudent = await Student.findOne({
      $or: [{ phoneNumber }, { email }],
    });

    if (existingStudent) {
      return res.status(409).json({
        status: false,
        message: 'Phone number or email is already registered',
      });
    }

    // Get the last student's ID and increment
    const lastStudent = await Student.findOne().sort({ id: -1 }).lean();
    const newId = lastStudent ? lastStudent.id + 1 : 1;

    // Create the new student
    const newStudent = new Student({
      id: newId,
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
      message: 'Student created successfully',
      student: savedStudent,
    });
  } catch (error) {
    console.error('Error creating student:', error.message);
    return res.status(500).json({
      status: false,
      message: 'Server error',
    });
  }
};

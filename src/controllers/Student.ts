import Student from "../models/Student.js"

export const createStudent = async (req, res) => {
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
    } = req.body

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
      })
    }

    // Check if phoneNumber or email is already registered
    const existingStudent = await Student.findOne({
      $or: [{ phoneNumber }, { email }],
    })

    if (existingStudent) {
      return res.status(409).json({
        status: false,
        message: "Phone phoneNumber or email is already registered",
      })
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
    })
    console.log(newStudent)
    // Save the student to the database
    const savedStudent = await newStudent.save()

    // Return success response
    return res.status(201).json({
      status: true, 
      message: "Student created successfully",
      studentData: savedStudent,
    })
  } catch (error) {
    console.error("Error creating student:", error.message)
    return res.status(500).json({
      status: false,
      message: "Server error",
    })
  }
}

export const searchStudent = async (req, res) => {
  try {
    const { searchInput } = req.params // Extract search searchInput from request searchInput params

    if (!searchInput) {
      return res.status(400).json({
        status: false,
        message: "Search searchInput is required",
      })
    }

    let searchCriteria

    // Determine the type of data (email, phoneNumber, or name)
    if (searchInput.includes("@")) {
      // If the searchInput contains '@', assume it's an email
      searchCriteria = { email: searchInput }
    } else if (/^\d+$/.test(searchInput)) {
      // If the searchInput is numeric, assume it's a phone number
      searchCriteria = { phoneNumber: searchInput }
    } else {
      // Otherwise, assume it's a name
      searchCriteria = { name: { $regex: searchInput, $options: "i" } } // Case-insensitive search
    }

    // Search the database
    const student = await Student.findOne(searchCriteria).lean()

    if (!student) {
      return res.status(404).json({
        status: false,
        message: "No student found matching the searchInput",
      })
    }

    // Return the found student
    return res.status(200).json({
      status: true,
      message: "Student found",
      student,
    })
  } catch (error) {
    console.error("Error searching for student:", error.message)
    return res.status(500).json({
      status: false,
      message: "Server error",
    })
  }
}

export const searchStudentWithNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.params
    if (
      phoneNumber.length !== 12 ||
      typeof parseInt(phoneNumber) !== "number"
    ) {
      return res.status(403).json({
        status: false,
        message: "not a correct phoneNumber",
      })
    }

    const studentData = await Student.findOne({ phoneNumber })
    //if no student
    if (!studentData) {
      return res.status(404).json({
        status: false,
        message: "No student found with this phone phoneNumber",
      })
    } else {
      return res.status(200).json({
        status: true,
        message: "found student",
        studentData,
      })
    }
  } catch (e) {
    console.log(e.message)
    return res.status(500).json({
      status: false,
      message: "server error",
    })
  }
}

export const getStudentData = (req, res) => {
  Student.find()
    .then((data) =>
      res
        .status(200)
        .json({
          status: true,
          message: "fetched student data",
          studentData: data,
        }),
    )
    .catch((e) => {
      console.log(e.message)
      return res
        .status(500)
        .json({ status: false, message: "error while fetching student data" })
    })
}

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params; // Extract student ID from URL params
        const updateData = req.body; // Extract new data from request body

        // Check if student exists
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({
                status: false,
                message: 'Student not found',
            });
        }

        // Update student data while keeping the ID intact
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Return updated doc & validate changes
        );

        return res.status(200).json({
            status: true,
            message: 'Student updated successfully',
            updatedStudentData: updatedStudent,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Server error',
        });
    }
};

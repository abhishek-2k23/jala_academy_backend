import mongoose from 'mongoose';

// Define the Student schema
const studentSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      autoIncrement: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['STUDENT'], // Keeping it simple for now
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
      default: 0,
    },
    dueAmount: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    incentivesPaid: {
      type: Number,
      default: 0,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    governmentIdProof: {
      type: String,
      required: true,
    },
    activityStatus: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    inactiveOn: {
      type: Date,
    },
    inactivityReason: {
      type: String,
    },
  },
  { timestamps: true }
);

// Middleware to auto-increment the `id` field
studentSchema.pre('save', async function (next) {
  const Student = mongoose.model('Student');
  const lastStudent = await Student.findOne().sort({ id: -1 }).lean();
  this.id = lastStudent ? lastStudent.id + 1 : 1;
  next();
});

// Export the Student model
const Student = mongoose.model('Student', studentSchema);
export default Student;

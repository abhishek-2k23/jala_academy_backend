import mongoose, { Schema, Document } from "mongoose";

// Define the Student interface extending mongoose.Document
interface IStudent extends Document {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  type: "JOB_SEEKER" | "PAID_INTERN" | "UNPAID_INTERN" | "STUDENT" | "LEARNER";
  amountPaid: number;
  dueAmount: number;
  discount: number;
  dateOfJoining: Date;
  incentivesPaid: number;
  country: string;
  state: string;
  address: string;
  governmentIdProof: string;
  activityStatus: "ACTIVE" | "INACTIVE";
  inactiveOn?: Date;
  inactivityReason?: string;
}

// Define the Student schema
const studentSchema: Schema<IStudent> = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
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
      enum: ["JOB_SEEKER", "PAID_INTERN", "UNPAID_INTERN", "STUDENT", "LEARNER"],
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
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
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

// Export the Student model
const Student = mongoose.model<IStudent>("Student", studentSchema);
export default Student;
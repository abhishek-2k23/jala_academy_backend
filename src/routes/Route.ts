import express from "express";
import { login, register } from "../controllers/Auth";
import {
  createStudent,
  getStudentData,
  searchStudentWithNumber,
  updateStudent,
} from "../controllers/Student";

const router = express.Router();

// Auth Routes
router.post("/user/register", register as any);
router.post("/user/login", login as any);

// Student Routes
router.post("/student/create", createStudent as any);
router.put("/student/update/:id", updateStudent as any);
router.get("/student/searchWithPhoneNumber/:phoneNumber", searchStudentWithNumber as any);
router.get("/student/getStudentData", getStudentData as any);

export default router;
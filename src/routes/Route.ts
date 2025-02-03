import express from "express";
<<<<<<< HEAD
import { login, registerMultipleUsers } from "../controllers/Auth";
=======
import { login, register } from "../controllers/Auth";
>>>>>>> 6a190544f5f2630a3ba182cf937a20a8524711c5
import {
  createStudent,
  getStudentData,
  searchStudentWithNumber,
  updateStudent,
} from "../controllers/Student";

const router = express.Router();

// Auth Routes
<<<<<<< HEAD
router.post("/user/login", login as any);
router.post("/user/register", registerMultipleUsers as any);
=======
router.post("/user/register", register as any);
router.post("/user/login", login as any);
>>>>>>> 6a190544f5f2630a3ba182cf937a20a8524711c5

// Student Routes
router.post("/student/create", createStudent as any);
router.put("/student/update/:id", updateStudent as any);
router.get("/student/searchWithPhoneNumber/:phoneNumber", searchStudentWithNumber as any);
router.get("/student/getStudentData", getStudentData as any);

export default router;
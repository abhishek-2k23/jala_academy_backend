import express from "express";
import { login, register } from "../controllers/Auth";
import {createStudent, searchStudent, searchStudentWithNumber} from '../controllers/Student'
const router = express.Router();

router.post('/user/register', register);
router.post('/user/login', login);
router.post('/student/create', createStudent);
router.get('/student/search/:searchInput', searchStudent);
router.get('/student/:phoneNumber', searchStudentWithNumber);
export default router;
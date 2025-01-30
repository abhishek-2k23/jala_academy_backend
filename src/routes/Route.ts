import express from "express";
import { login, register } from "../controllers/Auth";
import {createStudent, getStudentData, searchStudent, searchStudentWithNumber, updateStudent} from '../controllers/Student'
const router = express.Router();

router.post('/user/register', register);
router.post('/user/login', login);
router.post('/student/create', createStudent);
router.put('/student/update/:id', updateStudent);
router.get('/student/search/:searchInput', searchStudent);
router.get('/student/searchWithPhoneNumber/:phoneNumber', searchStudentWithNumber);
router.get('/student/getStudentData', getStudentData);
export default router;
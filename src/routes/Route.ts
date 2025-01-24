import express from "express";
import { login, register } from "../controllers/Auth";
import {createStudent} from '../controllers/Student'
const router = express.Router();

router.post('/user/register', register);
router.get('/user/login', login);
router.post('/student/create', createStudent);
router.get('/student/')
export default router;
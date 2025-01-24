import express from "express";
import { register } from "../controllers/Auth";
const router = express.Router();

router.post('/user/register', register);

export default router;
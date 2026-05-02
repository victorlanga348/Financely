import express from 'express';
import { createTransition, getAllTransitions, getSummary} from '../../Controllers/transitionController.js';
import { authMiddleware } from '../../Middlewares/auth.js';

const router = express.Router();

router.post("/create", authMiddleware, createTransition);
router.get("/list", authMiddleware, getAllTransitions);
router.get("/summary", authMiddleware, getSummary);

export default router
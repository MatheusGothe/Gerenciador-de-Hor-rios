import express from 'express';
import { gerarHorarios } from '../controllers/horarioController.js';

const router = express.Router();

router.post("/", gerarHorarios);

export default router;

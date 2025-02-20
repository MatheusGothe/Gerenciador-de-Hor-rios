import express from 'express';
import { createDisponibilidade, getAllDisponibilidade } from '../controllers/DisponibilidadeProfessorController.js';
import { validateDisponibilidade } from '../middlewares/DisponibilidadeProfessor.js';


const router = express.Router();

router.get("/", getAllDisponibilidade)
router.post("/",validateDisponibilidade, createDisponibilidade);/*
router.get("/:id", getProfessorById);
router.delete("/:id", deleteIntervalo)
router.put("/:id",validateUpdateIntervalo, updateIntervalo);*/


export default router;

import express from 'express';  
import { getProfessorOnDisciplinaByProfessor } from '../controllers/professorOnDisciplinaController.js';

const router = express.Router();

router.get("/:id", getProfessorOnDisciplinaByProfessor)/*
router.post("/",validateIntervalo, createIntervalo);
router.delete("/:id", deleteIntervalo)
router.put("/:id",validateUpdateIntervalo, updateIntervalo);*/


export default router;

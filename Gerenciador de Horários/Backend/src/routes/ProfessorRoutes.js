import express from 'express';
import { getAllProfessores,createProfessor } from '../controllers/professorController.js';
import { validateProfessor } from '../middlewares/validateProfessor.js';



const router = express.Router();

router.get("/", getAllProfessores);
router.post("/",validateProfessor, createProfessor);
/*
router.get("/:id", getProfessorById);
router.put("/:id", updateProfessor);
router.delete("/:id", deleteProfessor);*/

export default router;

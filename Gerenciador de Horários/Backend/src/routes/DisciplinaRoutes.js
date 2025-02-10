import express from 'express';
import { validateProfessor, validateUpdateProfessor } from '../middlewares/validateProfessor.js';
import { getAllDisciplinas } from '../controllers/disciplinaController.js';


const router = express.Router();

router.get("/", getAllDisciplinas)/*
router.post("/",validateProfessor, createProfessor);
router.get("/:id", getProfessorById);
router.delete("/:id", deleteProfessor);
router.put("/:id",validateUpdateProfessor, updateProfessor);*/


export default router;

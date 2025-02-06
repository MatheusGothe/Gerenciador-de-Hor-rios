import express from 'express';
import { getAllProfessores,createProfessor, deleteProfessor, getProfessorById, updateProfessor } from '../controllers/professorController.js';
import { validateProfessor, validateUpdateProfessor } from '../middlewares/validateProfessor.js';


const router = express.Router();

router.get("/", getAllProfessores)
router.post("/",validateProfessor, createProfessor);
router.get("/:id", getProfessorById);
router.delete("/:id", deleteProfessor);
router.put("/:id",validateUpdateProfessor, updateProfessor);


export default router;

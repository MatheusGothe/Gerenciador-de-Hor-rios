import express from 'express';
import { getAllProfessores } from '../controllers/professorController.js';



const router = express.Router();

router.get("/", getAllProfessores);
/*router.post("/", createProfessor);
router.get("/:id", getProfessorById);
router.put("/:id", updateProfessor);
router.delete("/:id", deleteProfessor);*/

export default router;

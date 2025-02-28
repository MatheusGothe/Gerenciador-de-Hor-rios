import express from 'express';
import { createDisponibilidade, deleteDisponibilidade, getAllDisponibilidade, getDIsponibilidadeByProfessorId, updateDisponibilidade } from '../controllers/DisponibilidadeProfessorController.js';
import { validateDisponibilidade, validateUpdateDisponibilidade } from '../middlewares/DisponibilidadeProfessor.js';


const router = express.Router();

router.get("/", getAllDisponibilidade)
router.post("/",validateDisponibilidade, createDisponibilidade)
router.put("/:id",validateUpdateDisponibilidade, updateDisponibilidade);
router.get("/:id", getDIsponibilidadeByProfessorId);
router.delete("/:id", deleteDisponibilidade)


export default router;

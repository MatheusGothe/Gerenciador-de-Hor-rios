import express from 'express';
import { createTurma, deleteTurma, getAllTurmas, getTurmaById, updateTurma } from '../controllers/turmaController.js';
import { validateTurma, validateUpdateTurma } from '../middlewares/Turma.js';

const router = express.Router();

router.get("/", getAllTurmas)
router.post("/",validateTurma, createTurma);
router.get("/:id", getTurmaById);
router.delete("/:id", deleteTurma);
router.put("/:id",validateUpdateTurma, updateTurma);


export default router;

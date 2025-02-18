import express from 'express';
import { createTurma, getAllTurmas } from '../controllers/turmaController.js';
import { validateTurma } from '../middlewares/Turma.js';

const router = express.Router();

router.get("/", getAllTurmas)
router.post("/",validateTurma, createTurma);/*
router.get("/:id", getProjetoById);
router.delete("/:id", deleteProjeto);
router.put("/:id",validateUpdateProjeto, updateProjeto);*/


export default router;

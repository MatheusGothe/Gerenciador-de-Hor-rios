import express from 'express';
import { createProjeto, getAllProjetos } from '../controllers/projetoController.js';
import { validateProjeto } from '../middlewares/Projeto.js';

const router = express.Router();

router.get("/", getAllProjetos)
router.post("/",validateProjeto, createProjeto);/*
router.get("/:id", getDisciplinaById);
//router.delete("/:id", deleteProfessor);
router.put("/:id",validateUpdateDisciplina, updateDisciplina);
*/

export default router;

import express from 'express';
import { getAllProjetos } from '../controllers/projetoController.js';

const router = express.Router();

router.get("/", getAllProjetos)/*
router.post("/",validadeDisciplina, createDiscplina);
router.get("/:id", getDisciplinaById);
//router.delete("/:id", deleteProfessor);
router.put("/:id",validateUpdateDisciplina, updateDisciplina);
*/

export default router;

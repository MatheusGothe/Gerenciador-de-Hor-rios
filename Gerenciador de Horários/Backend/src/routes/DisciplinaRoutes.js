import express from 'express';
import { createDiscplina, deleteDisciplina, getAllDisciplinas, getDisciplinaById, updateDisciplina } from '../controllers/disciplinaController.js';
import { validateUpdateDisciplina,validadeDisciplina } from '../middlewares/Disciplina.js';


const router = express.Router();

router.get("/", getAllDisciplinas)
router.post("/",validadeDisciplina, createDiscplina);
router.get("/:id", getDisciplinaById);
router.delete("/:id", deleteDisciplina);
router.put("/:id",validateUpdateDisciplina, updateDisciplina);


export default router;

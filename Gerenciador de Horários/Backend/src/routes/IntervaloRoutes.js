import express from 'express';

import { createIntervalo, getAllIntervalos } from '../controllers/intervaloController.js';
import { validateIntervalo } from '../middlewares/ValidateIntervalo.js';


const router = express.Router();

router.get("/", getAllIntervalos)
router.post("/",validateIntervalo, createIntervalo);/*
router.get("/:id", getDisciplinaById);
router.delete("/:id", deleteDisciplina);
router.put("/:id",validateUpdateDisciplina, updateDisciplina);*/


export default router;

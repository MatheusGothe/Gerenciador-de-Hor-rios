import express from 'express';
import { createProjeto, deleteProjeto, getAllProjetos, getProjetoById, updateProjeto } from '../controllers/projetoController.js';
import { validateProjeto, validateUpdateProjeto } from '../middlewares/Projeto.js';

const router = express.Router();

router.get("/", getAllProjetos)
router.post("/",validateProjeto, createProjeto);
router.get("/:id", getProjetoById);
router.delete("/:id", deleteProjeto);
router.put("/:id",validateUpdateProjeto, updateProjeto);


export default router;

import express from 'express';
import { createProjeto, deleteProjeto, getAllProjetos, getProjetoById, updateProjeto } from '../controllers/projetoController.js';
import { checkProjetoLinks, validateProjeto, validateUpdateProjeto } from '../middlewares/Projeto.js';

const router = express.Router();

router.get("/", getAllProjetos)
router.post("/",validateProjeto, createProjeto);
router.get("/:id", getProjetoById);
router.delete("/:id",checkProjetoLinks ,deleteProjeto);
router.put("/:id",validateUpdateProjeto, updateProjeto);


export default router;

import express from 'express';  
import { createProfessorOnDisciplina, getAssociationByDiscipline, getAssociationByProfessor,} from '../controllers/professorOnDisciplinaController.js';

const router = express.Router();

router.get("/professor/:id", getAssociationByProfessor )
router.get("/disciplina/:id", getAssociationByDiscipline )
router.post("/", createProfessorOnDisciplina);
/*router.get("/", getProfessorOnDisciplinaByProfessor);/*
router.delete("/:id", deleteIntervalo)
router.put("/:id",validateUpdateIntervalo, updateIntervalo);*/


export default router;

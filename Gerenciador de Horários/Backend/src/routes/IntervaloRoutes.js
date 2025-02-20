import express from 'express';

import { createIntervalo, deleteIntervalo, getAllIntervalos, updateIntervalo } from '../controllers/intervaloController.js';
import { validateIntervalo, validateUpdateIntervalo } from '../middlewares/ValidateIntervalo.js';


const router = express.Router();

router.get("/", getAllIntervalos)
router.post("/",validateIntervalo, createIntervalo);
router.delete("/:id", deleteIntervalo)
router.put("/:id",validateUpdateIntervalo, updateIntervalo);


export default router;

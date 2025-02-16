import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

  
export const validateUpdateDisciplina = async (req, res, next) => {
    const { nome, duracao } = req.body;

    try {
        
    if(!nome || nome.trim() === ""){
        return res.status(400).json({ error: "Nome da disciplina deve ser informado" });
    }

    if(!duracao){
        return res.status(400).json({ error: "Duração da disciplina deve ser informada" });
    }

    if(duracao < 0){
        return res.status(400).json({ error: "Duração da disciplina deve ser maior de que 0" });
    }
    next()
    }
    catch (error) {
        console.log(error.message)
    }

  };
  
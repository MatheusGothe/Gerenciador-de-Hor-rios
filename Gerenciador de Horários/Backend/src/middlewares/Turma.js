import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const validateTurma = async (req, res, next) => {
    const { nome } = req.body;

    try {
        
    if(!nome || nome.trim() === ""){
        return res.status(400).json({ error: "Nome da turma deve ser informado" });
    }

    next()
    }
    catch (error) {
        console.log(error.message)
    }

  };
  

  
  export const validateUpdateTurma = async (req, res, next) => {
    const { nome } = req.body;
  
    try {
      // Verifica se pelo menos um dos campos foi informado
      if(!nome || nome.trim() === ""){
        return res.status(400).json({ error: "Nome da turma deve ser informado" });
    }
  
      next(); // Continua para a próxima middleware ou controller
    } catch (error) {
      console.error("Erro na validação da turma:", error);
      res.status(500).json({ error: "Erro interno ao validar a turma." });
    }
  };
  
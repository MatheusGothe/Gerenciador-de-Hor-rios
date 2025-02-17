import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const validateProjeto = async (req, res, next) => {
    const { nome, descricao, usuarioId, } = req.body;

    try {
        
    if(!nome || nome.trim() === ""){
        return res.status(400).json({ error: "Nome do projeto deve ser informado" });
    }
    if (!usuarioId) {
        return res.status(400).json({ error: "ID do usuário deve ser passado" });
    } 
    next()
    }
    catch (error) {
        console.log(error.message)
    }

  };
  

  export const validateUpdateProjeto = async (req, res, next) => {
    const { nome, descricao, } = req.body;

    try {
        
    if(!nome || nome.trim() === ""){
        return res.status(400).json({ error: "Nome do projeto deve ser informado" });
    }

    next()
    }
    catch (error) {
        console.log(error.message)
    }

  };
  

  
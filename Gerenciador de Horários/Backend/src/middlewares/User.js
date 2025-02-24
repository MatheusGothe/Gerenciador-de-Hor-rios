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

export const checkUserLinks = async(req,res,next) => {
    try {
        
        const {usuarioId} = req.params
        const userExistsInProjeto = await prisma.projeto.findFirst({
            where : {
                usuarioId
            }
        })

        if(userExistsInProjeto){
            return res.status(400).json({ error: "O usuário está associado a um projeto" });
        }

        next()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Ocorreu um erro ao deltear o projeto" });

    }
}
  
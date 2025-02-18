import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const validateTurma = async (req, res, next) => {
    const { nome } = req.body;

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

    if(!projetoId){
        return res.status(400).json({ error: "Projeto deve ser informado" });

    }
    next()
    }
    catch (error) {
        console.log(error.message)
    }

  };
  

  /*
  export const validateUpdateDisciplina = async (req, res, next) => {
    const { nome, duracao } = req.body;
  
    try {
      // Verifica se pelo menos um dos campos foi informado
      if (!nome && duracao === undefined) {
        return res.status(400).json({ error: "Informe pelo menos um dos campos: nome ou duração." });
      }
  
      // Validação do nome (se fornecido)
      if (nome !== undefined && nome.trim() === "") {
        return res.status(400).json({ error: "Nome da disciplina não pode estar vazio." });
      }
  
      // Validação da duração (se fornecida)
      if (duracao !== undefined && (typeof duracao !== "number" || duracao <= 0)) {
        return res.status(400).json({ error: "Duração da disciplina deve ser um número maior que 0." });
      }
  
      next(); // Continua para a próxima middleware ou controller
    } catch (error) {
      console.error("Erro na validação da disciplina:", error);
      res.status(500).json({ error: "Erro interno ao validar a disciplina." });
    }
  };*/
  
import { PrismaClient } from "@prisma/client";
import { parsePhoneNumberFromString } from "libphonenumber-js";
const prisma = new PrismaClient();

export const validateProfessor = async (req, res, next) => {
  const { nome, email,telefone } = req.body;
  // Verificar se nome e email estão presentes

  // validação se campos vieram na requisição
  if (nome === undefined || email === undefined || telefone === undefined) {
    return res.status(400).json({ 
      error: "Campos obrigatórios ausentes.",
      missingFields: {
        nome: nome === undefined ? "Nome não foi enviado." : undefined,
        email: email === undefined ? "Email não foi enviado." : undefined,
        telefone: telefone === undefined ? "Telefone não foi enviado." : undefined
      }
    });
  }
  
  // validação se campos são nulos
  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de email inválido." });
}


  try {
    // Validar se o email já existe
    const emailExistente = await prisma.professor.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExistente) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Se tudo estiver correto, segue para a próxima função
    next();
  } catch (error) {
    console.error("Erro ao verificar email:", error.message);
    return res.status(500).json({ error: "Erro ao verificar email" });
  }
};


export const validateUpdateProfessor = async (req, res, next) => {
  const { id } = req.params; // Pegando o ID do professor a ser atualizado
  const { nome, email, telefone } = req.body;

  // Regex para validar telefone (formatos aceitos: (99) 99999-9999, (99) 9999-9999, 99999-9999, 9999-9999)
  if(telefone){
    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (telefone && !telefoneRegex.test(telefone)) {
      return res.status(400).json({ error: "Formato de telefone inválido." });
    }
  }

  try {
    const telefoneExistente = await prisma.professor.findFirst({
      where: {
        telefone: telefone,
        NOT: {
          id: String(id), // Exclui o próprio professor da verificação
        },
      },
    });

    if(telefoneExistente){
      return res.status(400).json({ error: "Telefone já cadastrado por outro professor." });
    }

    // Verificar se já existe outro professor com esse email
    if(email){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Formato de email inválido." });
      }
    
    const emailExistente = await prisma.professor.findFirst({
      where: {
        email: email,
        NOT: {
          id: String(id), // Exclui o próprio professor da verificação
        },
      },
    });

    if (emailExistente) {
      return res.status(400).json({ error: "Email já cadastrado por outro professor." });
    }
  }
    // Se tudo estiver correto, segue para a próxima função
    next();
  } catch (error) {
    console.error("Erro ao verificar email:", error.message);
    return res.status(500).json({ error: "Erro interno ao validar o email." });
  }
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const validateProfessor = async (req, res, next) => {
  const { nome, email } = req.body;

  // Verificar se nome e email estão presentes
  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllProfessores = async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.json(professores);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao buscar professores" });
  }
};


export const createProfessor = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }

    const novoProfessor = await prisma.professor.create({
      data: { nome, email, telefone },
    });
    res.status(201).json(novoProfessor);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao criar professor" });
  }
};
/*
export const getProfessorById = async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await prisma.professor.findUnique({ where: { id } });
    if (!professor) return res.status(404).json({ error: "Professor não encontrado" });
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professor" });
  }
};

export const updateProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    const professorAtualizado = await prisma.professor.update({
      where: { id },
      data: { nome, email, telefone },
    });
    res.json(professorAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar professor" });
  }
};

export const deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.professor.delete({ where: { id } });
    res.json({ message: "Professor deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar professor" });
  }
};*/

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllProjetos = async (req, res) => {
  try {
    const projetos = await prisma.projeto.findMany();
    res.json(projetos);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
};

/*
export const createProfessor = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    

    const novoProfessor = await prisma.professor.create({
      data: { nome, email, telefone },
    });
    res.status(201).json(novoProfessor);
  } catch (error) {
    console.log(error.message)
    console.log(req.body)
    res.status(500).json({ error: "Erro ao criar professor" });
  }
};

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

    const professor = await prisma.professor.findUnique({ where: { id } });
    if (!professor) return res.status(404).json({ error: "Professor não encontrado" });
    
    const professorAtualizado = await prisma.professor.update({
      where: { id },
      data: { nome, email, telefone },
    });
    res.json({professorAtualizado,message:"Professor Atualizado"});
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar professor" });
  }
};

export const deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o professor existe antes de deletar
    const professor = await prisma.professor.findUnique({ where: { id: String(id) } });

    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }

    // Deleta o professor se ele existir
    await prisma.professor.delete({ where: { id: String(id) } });

    res.json({ message: "Professor deletado com sucesso" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao deletar professor" });
  }
};*/


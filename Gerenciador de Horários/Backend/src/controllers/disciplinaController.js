import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllDisciplinas = async (req, res) => {
  try {
    const disciplinas = await prisma.disciplina.findMany();
    res.json(disciplinas);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao buscar disciplinas" });
  }
};


export const createDiscplina = async (req, res) => {
  try {
    const { nome, duracao } = req.body;

    const discplinaExistente = await prisma.disciplina.findUnique({
      where: {
        nome: nome,
      },
    });

    if (discplinaExistente) {
      return res.status(400).json({ error: "Nome da disciplina já cadastrado" });
    }
    
    const novaDisciplina = await prisma.disciplina.create({
      data: { nome, duracao },
    });
    res.status(201).json(novaDisciplina);
  } catch (error) {
    console.log(error.message)
    console.log(req.body)
    res.status(500).json({ error: "Erro ao criar discplina" });
  }
};

export const getDisciplinaById = async (req, res) => {
  try {
    const { id } = req.params;
    const disciplina = await prisma.disciplina.findUnique({ where: { id } });
    if (!disciplina) return res.status(404).json({ error: "Disciplina não encontrada" });
    res.json(disciplina);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar disciplina" });
  }
};

export const updateDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, duracao } = req.body;

    const disciplina = await prisma.disciplina.findUnique({ where: { id } });
    if (!disciplina) return res.status(404).json({ error: "Disciplina não encontrado" });

   
    const DisciplinaAtualizada = await prisma.disciplina.update({
      where: { id },
      data: { nome, duracao },
    });
    res.json({DisciplinaAtualizada,message:"Disciplina Atualizado"});
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar disciplina" });
  }
};
/*
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
};

*/
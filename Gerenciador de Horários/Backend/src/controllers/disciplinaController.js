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
    const { nome, duracao, projetoId } = req.body;


    const projetoExistente = await prisma.projeto.findFirst({
      where: {
        id: projetoId
      }
    })

    if(!projetoExistente){
      return res.status(400).json({ error: "Projeto não existente" });
    }

    const discplinaExistente = await prisma.disciplina.findFirst({
      where: {
        nome: nome,
        projetoId: projetoId
      },
    });
    if (discplinaExistente) {
      return res.status(400).json({ error: "Nome da disciplina já cadastrado" });
    }
    
    const novaDisciplina = await prisma.disciplina.create({
      data: { nome, duracao,projetoId },
    });
    res.status(201).json(novaDisciplina);
  } catch (error) {
    console.log(error.message)
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
    if (!disciplina) return res.status(404).json({ error: "Disciplina não encontrada" });
    
    if(disciplina.nome === nome){
      return res.status(401).json({ error: "Nome da disciplina deve ser diferente" });
    }
    if(disciplina.duracao === duracao){
      return res.status(401).json({ error: "Duração da disciplina deve ser diferente" });
    }
    const DisciplinaAtualizada = await prisma.disciplina.update({
      where: { id },
      data: { nome, duracao },
    });
    res.json({DisciplinaAtualizada,message:"Disciplina Atualizada"});
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar disciplina" });
  }
};

export const deleteDisciplina = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o professor existe antes de deletar
    const disciplina = await prisma.disciplina.findUnique({ where: { id: String(id) } });

    if (!disciplina) {
      return res.status(404).json({ error: "Disciplina não encontrada" });
    }

    // Deleta o professor se ele existir
    await prisma.disciplina.delete({ where: { id: String(id) } });

    res.json({ message: "Disciplina deletada" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao deletar professor" });
  }
};


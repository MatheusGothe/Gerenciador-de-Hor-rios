import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllTurmas = async (req, res) => {
  try {
    const turmas = await prisma.turma.findMany();
    res.json(turmas);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao buscar turmas" });
  }
};


export const createTurma = async (req, res) => {
  try {
    const { nome,  } = req.body;

    

    const novaTurma = await prisma.turma.create({
      data: { nome },
    });
    res.status(201).json(novaTurma);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao criar turma" });
  }
};

export const getTurmaById = async (req, res) => {
  try {
    const {id} = req.params
    const turma = await prisma.turma.findUnique({ where: { id } });
    if (!turma) return res.status(404).json({ error: "Turma não encontrada" });
    res.json(turma);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao buscar turma" });
  }
};

export const updateTurma = async (req, res) => {
  try {
    const {id} = req.params
    const { nome } = req.body;

    const turma = await prisma.turma.findUnique({ where: { id: id } });
    if (!turma) return res.status(404).json({ error: "Turma não encontrada" });

    if(turma.nome === nome){
      return res.status(401).json({message: "Nome da turma deve ser diferente"})
    }
    
    const turmaAtualizada = await prisma.turma.update({
      where: { id },
      data: { nome },
    });
    res.json({turmaAtualizada,message:"Turma Atualizada"});
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar professor" });
  }
};

export const deleteTurma = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o professor existe antes de deletar
    const turma = await prisma.turma.findUnique({ where: { id: id } });

    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada" });
    }

    // Deleta o professor se ele existir
    await prisma.turma.delete({ where: { id: id } });

    res.json({ message: "Turma deletada com sucesso" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao deletar turma" });
  }
};


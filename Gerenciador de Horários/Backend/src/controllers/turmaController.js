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
    const { nome, descricao, usuarioId } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where : { id : usuarioId}
    })

    if(!usuario){
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    

    const novoProjeto = await prisma.projeto.create({
      data: { nome, descricao, usuarioId },
    });
    res.status(201).json(novoProjeto);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
};
/*
export const getProjetoById = async (req, res) => {
  try {
    const {id} = req.params
    const projeto = await prisma.projeto.findUnique({ where: { id: Number(id) } });
    if (!projeto) return res.status(404).json({ error: "Projeto não encontrado" });
    res.json(projeto);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao buscar projeto" });
  }
};

export const updateProjeto = async (req, res) => {
  try {
    const {id} = req.params
    const { nome, descricao } = req.body;

    const projeto = await prisma.projeto.findUnique({ where: { id: Number(id) } });
    if (!projeto) return res.status(404).json({ error: "Projeto não encontrado" });
    
    const projetoAtualizado = await prisma.projeto.update({
      where: { id: Number(id) },
      data: { nome, descricao },
    });
    res.json({projetoAtualizado,message:"Projeto Atualizado"});
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar professor" });
  }
};

export const deleteProjeto = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o professor existe antes de deletar
    const projeto = await prisma.projeto.findUnique({ where: { id: Number(id) } });

    if (!projeto) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Deleta o professor se ele existir
    await prisma.projeto.delete({ where: { id: Number(id) } });

    res.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao deletar projeto" });
  }
};

*/
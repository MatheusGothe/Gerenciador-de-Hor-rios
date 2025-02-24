import { PrismaClient } from "@prisma/client";
import { parseTime } from "../functions/functions.js";
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

export const createProjeto = async (req, res) => {
  const { nome, descricao, usuarioId, horaInicioManha, horaFimManha, horaInicioTarde, horaFimTarde } = req.body;
  try {

    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId }
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Criar novo projeto com horários corrigidos
    const novoProjeto = await prisma.projeto.create({
      data: {
        nome,
        descricao,
        usuarioId,
        horaInicioManha: parseTime(horaInicioManha),
        horaFimManha : parseTime(horaFimManha),
        horaInicioTarde: parseTime(horaInicioTarde),
        horaFimTarde: parseTime(horaFimTarde)
      },
    });

    res.status(201).json(novoProjeto);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
};


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
    const { id } = req.params;
    const { nome, descricao, horaInicioManha, horaFimManha, horaInicioTarde, horaFimTarde } = req.body;

    // Verifica se o projeto existe
    const projeto = await prisma.projeto.findUnique({ where: { id: Number(id) } });
    if (!projeto) return res.status(404).json({ error: "Projeto não encontrado" });

    // Atualiza o projeto
    const projetoAtualizado = await prisma.projeto.update({
      where: { id: Number(id) },
      data: {
        nome,
        descricao,
        horaInicioManha: parseTime(horaInicioManha),
        horaFimManha:  parseTime(horaFimManha),
        horaInicioTarde: parseTime(horaInicioTarde),
        horaFimTarde:  parseTime(horaFimTarde)
      },
    });

    res.json({ projetoAtualizado, message: "Projeto atualizado com sucesso!" });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro ao atualizar projeto" });
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




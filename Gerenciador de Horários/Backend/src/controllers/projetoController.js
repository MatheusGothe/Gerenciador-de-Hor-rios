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


export const createProjeto = async (req, res) => {
  try {
    const { nome, descricao, usuarioId, horaInicioManha, horaFimManha, horaInicioTarde, horaFimTarde } = req.body;

    // Função para validar o formato "HH:MM"
    const isValidTimeFormat = (time) => /^\d{2}:\d{2}$/.test(time);

    // Verifica se os horários foram enviados corretamente
    if (![horaInicioManha, horaFimManha, horaInicioTarde, horaFimTarde].every(isValidTimeFormat)) {
      return res.status(400).json({ error: "Os horários devem estar no formato HH:MM (ex: 08:30)" });
    }

    // Função para transformar "HH:MM" em um objeto Date com uma data fixa
    const fixDate = (time) => new Date(`2000-01-01T${time}:00.000Z`);

    // Converte os horários para o formato correto
    const horaInicioManhaFixed = fixDate(horaInicioManha);
    const horaFimManhaFixed = fixDate(horaFimManha);
    const horaInicioTardeFixed = fixDate(horaInicioTarde);
    const horaFimTardeFixed = fixDate(horaFimTarde);

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
        horaInicioManha: horaInicioManhaFixed,
        horaFimManha: horaFimManhaFixed,
        horaInicioTarde: horaInicioTardeFixed,
        horaFimTarde: horaFimTardeFixed,
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


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { parseTime } from "../functions/functions.js";

export const getAllDisponibilidade = async (req, res) => {
  try {
    const disponibilidade = await prisma.disponibilidadeprofessor.findMany();
    res.json(disponibilidade);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao buscar disponibilidades" });
  }
};


export const createDisponibilidade = async (req, res) => {
  try {
    const { professorId, diaSemana, horaInicio, horaFim, disponivel = true} = req.body;


    const professorExistente = await prisma.professor.findFirst({
      where: { id: professorId}
    })

    if(!professorExistente){
      return res.status(400).json({error : "Professor não encontrado"})
    }

    const disponibilidadeExistente = await prisma.disponibilidadeprofessor.findFirst({
      where: {
        professorId,
        diaSemana
      }
    });

    if (disponibilidadeExistente) {
      return res.status(400).json({ error: "O professor já possui uma disponibilidade cadastrada para este dia." });
    }


    const novaDisponibilidade = await prisma.disponibilidadeprofessor.create({
      data: { professorId,
              diaSemana,
              horaInicio : parseTime(horaInicio),
              horaFim : parseTime(horaFim),
              disponivel
             },
    });
    return res.status(201).json(novaDisponibilidade);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: "Erro ao criar disponibilidade" });
  }
};

export const getDIsponibilidadeByProfessorId = async (req, res) => {
  try {
    const {professorId} = req.params
    const disponibilidadeprofessor = await prisma.disponibilidadeprofessor.findMany({ where: { professorId:professorId } });
    if (!disponibilidadeprofessor) return res.status(404).json({ error: "Turma não encontrada" });
    return res.json(disponibilidadeprofessor);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: "Erro ao buscar disponibilidade" });
  }
};

export const updateDisponibilidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { horaInicio, horaFim, diaSemana,disponivel } = req.body;

    const disponibilidade = await prisma.disponibilidadeprofessor.findUnique({ where: { id } });
    if (!disponibilidade) {
      return res.status(404).json({ error: "Disponibilidade não encontrada" });
    }

    // Só verifica conflito se o dia for alterado
    if (disponibilidade.diaSemana !== diaSemana) {
      const disponibilidadeExistente = await prisma.disponibilidadeprofessor.findFirst({
        where: {
          professorId: disponibilidade.professorId,
          diaSemana,
          NOT: { id }, // Ignora a própria disponibilidade
        },
      });

      if (disponibilidadeExistente) {
        return res.status(400).json({ error: "O professor já possui uma disponibilidade cadastrada para este dia." });
      }
    }

    const disponibilidadeAtualizada = await prisma.disponibilidadeprofessor.update({
      where: { id },
      data: { horaInicio: parseTime(horaInicio), horaFim: parseTime(horaFim), diaSemana, disponivel },
    });

    res.json({ disponibilidadeAtualizada, message: "Disponibilidade Atualizada" });

  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar disponibilidade" });
  }
};


export const deleteDisponibilidade = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o professor existe antes de deletar
    const disponibilidade = await prisma.disponibilidadeprofessor.findUnique({ where: { id: id } });

    if (!disponibilidade) {
      return res.status(404).json({ error: "Disponibilidade não encontrada" });
    }

    // Deleta o professor se ele existir
    await prisma.disponibilidadeprofessor.delete({ where: { id: id } });

    res.json({ message: "Disponibilidade deletada com sucesso" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao deletar disponibilidade" });
  }
};


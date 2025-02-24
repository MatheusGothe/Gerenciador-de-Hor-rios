import { PrismaClient } from "@prisma/client";
import { isValidTimeFormat } from "../functions/functions.js";
const prisma = new PrismaClient();

export const validateIntervalo = async (req, res, next) => {
  const { diaSemana, horaInicio, horaFim, projetoId } = req.body;

  try {
    // Verifica se o dia da semana foi informado corretamente
    const diasValidos = [
      "DOMINGO",
      "SEGUNDA",
      "TERCA",
      "QUARTA",
      "QUINTA",
      "SEXTA",
      "SABADO",
    ];
    if (!diaSemana || !diasValidos.includes(diaSemana.toUpperCase())) {
      return res
        .status(400)
        .json({ error: "Dia da semana inválido ou não informado" });
    }

    // Verifica se o horário de início e fim foram informados
    if (!horaInicio || !horaFim) {
      return res
        .status(400)
        .json({ error: "Horário de início e fim devem ser informados" });
    }
    // Array com os horários
    const horarios = [horaInicio,horaFim];

    // Verifica se algum horário está no formato errado
    if (horarios.some((hora) => hora && !isValidTimeFormat(hora))) {
      return res.status(400).json({
        error: "Os horários devem estar no formato HH:MM:SS (ex: 08:30:00)",
      });
    }

    // Verifica se o horário de início é menor que o de fim
    if (horaInicio >= horaFim) {
      return res.status(400).json({
        error: "Horário de início deve ser menor que o horário de fim",
      });
    }

    // Verifica se o projeto foi informado
    if (!projetoId) {
      return res.status(400).json({ error: "Projeto deve ser informado" });
    }

    next();
  } catch (error) {
    console.error("Erro na validação:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const validateUpdateIntervalo = async (req, res, next) => {
  const { diaSemana, horaInicio, horaFim, projetoId } = req.body;

  try {
    // Verifica se o dia da semana foi informado corretamente
    const diasValidos = [
      "DOMINGO",
      "SEGUNDA",
      "TERCA",
      "QUARTA",
      "QUINTA",
      "SEXTA",
      "SABADO",
    ];
    if (!diaSemana || !diasValidos.includes(diaSemana.toUpperCase())) {
      return res
        .status(400)
        .json({ error: "Dia da semana inválido ou não informado" });
    }

    // Verifica se o horário de início e fim foram informados
    if (!horaInicio || !horaFim) {
      return res
        .status(400)
        .json({ error: "Horário de início e fim devem ser informados" });
    }
    // Array com os horários
    const horarios = [horaInicio,horaFim];

    // Verifica se algum horário está no formato errado
    if (horarios.some((hora) => hora && !isValidTimeFormat(hora))) {
    return res.status(400).json({
        error: "Os horários devem estar no formato HH:MM:SS (ex: 08:30:00)",
    });
    }
   

    // Verifica se o horário de início é menor que o de fim
    if (horaInicio >= horaFim) {
      return res.status(400).json({
        error: "Horário de início deve ser menor que o horário de fim",
      });
    }

    // Verifica se o projeto foi informado
    if (!projetoId) {
      return res.status(400).json({ error: "Projeto deve ser informado" });
    }

    next();
  } catch (error) {
    console.error("Erro na validação:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

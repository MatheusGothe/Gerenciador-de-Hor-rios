import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const validateIntervalo = async (req, res, next) => {
  const { diaSemana, horaInicio, horaFim, projetoId } = req.body;

  try {
      // Verifica se o dia da semana foi informado corretamente
      const diasValidos = ["DOMINGO", "SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO"];
      if (!diaSemana || !diasValidos.includes(diaSemana.toUpperCase())) {
          return res.status(400).json({ error: "Dia da semana inválido ou não informado" });
      }

      // Verifica se o horário de início e fim foram informados
      if (!horaInicio || !horaFim) {
          return res.status(400).json({ error: "Horário de início e fim devem ser informados" });
      }

      // Converte os horários para objetos Date
      const horaInicioDate = new Date(horaInicio);
      const horaFimDate = new Date(horaFim);

      // Verifica se os horários são válidos
      if (isNaN(horaInicioDate.getTime()) || isNaN(horaFimDate.getTime())) {
          return res.status(400).json({ error: "Horário de início ou fim inválido" });
      }

      // Verifica se o horário de início é menor que o de fim
      if (horaInicioDate >= horaFimDate) {
          return res.status(400).json({ error: "Horário de início deve ser menor que o horário de fim" });
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

  

  
  export const validateUpdateDisciplina = async (req, res, next) => {
    const { nome, duracao } = req.body;
  
    try {
      // Verifica se pelo menos um dos campos foi informado
      if (!nome && duracao === undefined) {
        return res.status(400).json({ error: "Informe pelo menos um dos campos: nome ou duração." });
      }
  
      // Validação do nome (se fornecido)
      if (nome !== undefined && nome.trim() === "") {
        return res.status(400).json({ error: "Nome da disciplina não pode estar vazio." });
      }
  
      // Validação da duração (se fornecida)
      if (duracao !== undefined && (typeof duracao !== "number" || duracao <= 0)) {
        return res.status(400).json({ error: "Duração da disciplina deve ser um número maior que 0." });
      }
  
      next(); // Continua para a próxima middleware ou controller
    } catch (error) {
      console.error("Erro na validação da disciplina:", error);
      res.status(500).json({ error: "Erro interno ao validar a disciplina." });
    }
  };
  
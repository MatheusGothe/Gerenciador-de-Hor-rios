import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const validateDisponibilidade = async (req, res, next) => {
    const { professorId, diaSemana, horaInicio, horaFim, disponivel = true } = req.body;

    try {
        // Enum de dias da semana
        const DiasSemanaEnum = ["DOMINGO", "SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO"];
        
        // Array para armazenar os erros
        const errors = [];
        

        // Verificação de campos obrigatórios
        if (!professorId) errors.push("O campo 'professorId' é obrigatório.");
        if (!diaSemana) errors.push("O campo 'diaSemana' é obrigatório.");
        if (!horaInicio) errors.push("O campo 'horaInicio' é obrigatório.");
        if (!horaFim) errors.push("O campo 'horaFim' é obrigatório.");

        // Validação do diaSemana baseado no enum
        if (diaSemana && !DiasSemanaEnum.includes(diaSemana.toUpperCase())) {
            errors.push("O campo 'diaSemana' deve ser um dos seguintes valores: " + DiasSemanaEnum.join(", "));
        }

        // Validação do formato de horaInicio e horaFim (deve ser uma string ISO 8601)
        const isValidDate = (date) => !isNaN(Date.parse(date));

        if (horaInicio && typeof horaInicio !== "string") {
            errors.push("O campo 'horaInicio' deve ser uma string no formato ISO 8601 (ex: '2024-02-20T08:00:00Z').");
        } else if (horaInicio && !isValidDate(horaInicio)) {
            errors.push("O campo 'horaInicio' deve estar em um formato de data válido (ISO 8601).");
        }

        if (horaFim && typeof horaFim !== "string") {
            errors.push("O campo 'horaFim' deve ser uma string no formato ISO 8601 (ex: '2024-02-20T10:00:00Z').");
        } else if (horaFim && !isValidDate(horaFim)) {
            errors.push("O campo 'horaFim' deve estar em um formato de data válido (ISO 8601).");
        }

        // Verificação se horaFim é maior que horaInicio
        if (isValidDate(horaInicio) && isValidDate(horaFim)) {
            const start = new Date(horaInicio);
            const end = new Date(horaFim);
            if (end <= start) {
                errors.push("O campo 'horaFim' deve ser maior que 'horaInicio'.");
            }
        }

        // Se houver erros, retorna a resposta com status 400
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        next(); // Se tudo estiver certo, continua para o próximo middleware
    } catch (error) {
        console.error("Erro na validação:", error.message);
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};

  

  export const validateUpdateProjeto = async (req, res, next) => {
    const { nome, descricao, } = req.body;

    try {
        
    if(!nome || nome.trim() === ""){
        return res.status(400).json({ error: "Nome do projeto deve ser informado" });
    }

    next()
    }
    catch (error) {
        console.log(error.message)
    }

  };
  

  
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Cria uma associação entre um professor e uma disciplina
export const createProfessorOnDisciplina = async (req, res) => {
  const { professorId, disciplinaId, projetoId } = req.body;
  try {
    // Verifica se o professor existe
    const professor = await prisma.professor.findUnique({
      where: { id: professorId },
    });

    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }

    // Verifica se a disciplina existe
    const disciplina = await prisma.disciplina.findUnique({
      where: { id: disciplinaId },
    });

    if (!disciplina) {
      return res.status(404).json({ error: "Disciplina não encontrada" });
    }

    // Verifica se o projeto existe
    const projeto = await prisma.projeto.findUnique({
      where: { id: projetoId },
    });

    if (!projeto) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Cria a associação entre o professor e a disciplina
    const novaAssociacao = await prisma.professorOnDisciplina.create({
      data: {
        professorId,
        disciplinaId,
        projetoId,
      },
    });

    return res.status(201).json(novaAssociacao); // Retorna a nova associação criada
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao criar associação entre professor e disciplina" });
  }
};

// Obtém todas as associações de um professor específico
export const getProfessorOnDisciplinaByProfessor = async (req, res) => {
  const { professorId } = req.params;
  try {
    const associacoes = await prisma.professorOnDisciplina.findMany({
      where: { professorId },
      include: {
        disciplina: true, // Inclui os dados da disciplina associada
      },
    });

    // Retorna um array vazio se não houver associações
    return res.json(associacoes); // Se associacoes estiver vazio, retornará um array vazio
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar associações de professor" });
  }
};


// Obtém todas as associações de uma disciplina específica
export const getProfessorOnDisciplinaByDisciplina = async (req, res) => {
  const { disciplinaId } = req.params;
  try {
    const associacoes = await prisma.professorOnDisciplina.findMany({
      where: { disciplinaId },
      include: {
        professor: true, // Inclui os dados do professor associado
      },
    });

    if (!associacoes || associacoes.length === 0) {
      return res.status(404).json({ error: "Nenhuma associação encontrada para esta disciplina" });
    }

    return res.json(associacoes); // Retorna as associações encontradas
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar associações de disciplina" });
  }
};

// Atualiza uma associação entre professor e disciplina
export const updateProfessorOnDisciplina = async (req, res) => {
  const { professorId, disciplinaId } = req.params;
  const { projetoId } = req.body;

  try {
    // Verifica se a associação existe
    const associacaoExistente = await prisma.professorOnDisciplina.findUnique({
      where: {
        professorId_disciplinaId: {
          professorId,
          disciplinaId,
        },
      },
    });

    if (!associacaoExistente) {
      return res.status(404).json({ error: "Associação não encontrada" });
    }

    // Atualiza a associação
    const associacaoAtualizada = await prisma.professorOnDisciplina.update({
      where: {
        professorId_disciplinaId: {
          professorId,
          disciplinaId,
        },
      },
      data: {
        projetoId,
      },
    });

    return res.json({ associacaoAtualizada, message: "Associação atualizada com sucesso!" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao atualizar associação" });
  }
};

// Deleta uma associação entre professor e disciplina
export const deleteProfessorOnDisciplina = async (req, res) => {
  const { professorId, disciplinaId } = req.params;
  try {
    // Verifica se a associação existe
    const associacaoExistente = await prisma.professorOnDisciplina.findUnique({
      where: {
        professorId_disciplinaId: {
          professorId,
          disciplinaId,
        },
      },
    });

    if (!associacaoExistente) {
      return res.status(404).json({ error: "Associação não encontrada" });
    }

    // Deleta a associação
    await prisma.professorOnDisciplina.delete({
      where: {
        professorId_disciplinaId: {
          professorId,
          disciplinaId,
        },
      },
    });

    return res.json({ message: "Associação entre professor e disciplina deletada com sucesso!" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao deletar associação" });
  }
};

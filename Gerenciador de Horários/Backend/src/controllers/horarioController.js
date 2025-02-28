import { Router } from "express";
import { PrismaClient } from "@prisma/client";


export const gerarHorarios = async(projetoId) => {
  // Busca as disciplinas, professores, salas, turmas e intervalos
  const disciplinas = await prisma.d.findMany({ where: { projetoId } });
  const professores = await prisma.professor.findMany({ where: { projetoId }, include: { disponibilidade: true } });
  const salas = await prisma.sala.findMany();
  const turmas = await prisma.turma.findMany();
  const intervalos = await prisma.intervalo.findMany({ where: { projetoId } });

  const horariosGerados = [];

  for (const disciplina of disciplinas) {
    for (const turma of turmas) {
      const professor = professores.find((prof) =>
        prof.disponibilidade.some((disp) => validarDisponibilidade(disp, disciplina.duracao, intervalos))
      );

      if (!professor) continue;

      const sala = salas.find((sala) => sala.horarios.length === 0);
      if (!sala) continue;

      const novoHorario = {
        diaSemana: "SEGUNDA",
        horaInicio: new Date("08:00:00"),
        horaFim: new Date("09:00:00"),
        projetoId,
        turmaId: turma.id,
        disciplinaId: disciplina.id,
        salaId: sala.id,
        professorId: professor.id,
      };

      horariosGerados.push(novoHorario);
    }
  }

  await prisma.horario.createMany({ data: horariosGerados });
}

// Função para validar se o professor está disponível
function validarDisponibilidade(disp, duracao, intervalos) {
  const horaFim = new Date(disp.horaInicio);
  horaFim.setMinutes(horaFim.getMinutes() + duracao);

  return !intervalos.some(
    (int) =>
      disp.diaSemana === int.diaSemana &&
      ((disp.horaInicio >= int.horaInicio && disp.horaInicio < int.horaFim) ||
        (horaFim > int.horaInicio && horaFim <= int.horaFim))
  );
}

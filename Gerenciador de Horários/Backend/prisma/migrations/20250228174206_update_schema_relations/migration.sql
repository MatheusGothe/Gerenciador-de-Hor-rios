/*
  Warnings:

  - You are about to drop the `disciplina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `disponibilidadeprofessor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `horario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `intervalo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sala` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `turma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "disciplina" DROP CONSTRAINT "disciplina_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "disponibilidadeprofessor" DROP CONSTRAINT "disponibilidadeprofessor_professorId_fkey";

-- DropForeignKey
ALTER TABLE "horario" DROP CONSTRAINT "horario_disciplinaId_fkey";

-- DropForeignKey
ALTER TABLE "horario" DROP CONSTRAINT "horario_professorId_fkey";

-- DropForeignKey
ALTER TABLE "horario" DROP CONSTRAINT "horario_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "horario" DROP CONSTRAINT "horario_salaId_fkey";

-- DropForeignKey
ALTER TABLE "horario" DROP CONSTRAINT "horario_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "intervalo" DROP CONSTRAINT "intervalo_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "professor" DROP CONSTRAINT "professor_projetoId_fkey";

-- DropTable
DROP TABLE "disciplina";

-- DropTable
DROP TABLE "disponibilidadeprofessor";

-- DropTable
DROP TABLE "horario";

-- DropTable
DROP TABLE "intervalo";

-- DropTable
DROP TABLE "professor";

-- DropTable
DROP TABLE "sala";

-- DropTable
DROP TABLE "turma";

-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessorOnDisciplina" (
    "professorId" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "ProfessorOnDisciplina_pkey" PRIMARY KEY ("professorId","disciplinaId")
);

-- CreateTable
CREATE TABLE "DisponibilidadeProfessor" (
    "id" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "diaSemana" "DiaSemana" NOT NULL,
    "horaInicio" TIME NOT NULL,
    "horaFim" TIME NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DisponibilidadeProfessor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sala" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" TEXT NOT NULL,
    "diaSemana" "DiaSemana" NOT NULL,
    "horaInicio" TIME NOT NULL,
    "horaFim" TIME NOT NULL,
    "projetoId" INTEGER NOT NULL,
    "turmaId" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    "salaId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intervalo" (
    "id" TEXT NOT NULL,
    "diaSemana" "DiaSemana" NOT NULL,
    "horaInicio" TIME NOT NULL,
    "horaFim" TIME NOT NULL,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "Intervalo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_nome_projetoId_key" ON "Disciplina"("nome", "projetoId");

-- CreateIndex
CREATE UNIQUE INDEX "Sala_nome_key" ON "Sala"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Turma_nome_key" ON "Turma"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Horario_diaSemana_horaInicio_professorId_key" ON "Horario"("diaSemana", "horaInicio", "professorId");

-- CreateIndex
CREATE UNIQUE INDEX "Horario_diaSemana_horaInicio_turmaId_key" ON "Horario"("diaSemana", "horaInicio", "turmaId");

-- CreateIndex
CREATE UNIQUE INDEX "Horario_diaSemana_horaInicio_salaId_key" ON "Horario"("diaSemana", "horaInicio", "salaId");

-- CreateIndex
CREATE UNIQUE INDEX "unique_intervalo" ON "Intervalo"("diaSemana", "projetoId", "horaInicio", "horaFim");

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorOnDisciplina" ADD CONSTRAINT "ProfessorOnDisciplina_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorOnDisciplina" ADD CONSTRAINT "ProfessorOnDisciplina_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisponibilidadeProfessor" ADD CONSTRAINT "DisponibilidadeProfessor_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervalo" ADD CONSTRAINT "Intervalo_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "TipoHorario" AS ENUM ('AULA', 'INTERVALO');

-- CreateTable
CREATE TABLE "professor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disponibilidadeprofessor" (
    "id" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "diaSemana" TEXT NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disponibilidadeprofessor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sala" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,

    CONSTRAINT "sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turma" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horario" (
    "id" TEXT NOT NULL,
    "diaSemana" TEXT NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFim" TIMESTAMP(3) NOT NULL,
    "tipo" "TipoHorario" NOT NULL,
    "projetoId" INTEGER NOT NULL,
    "turmaId" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    "salaId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,

    CONSTRAINT "horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professor_email_key" ON "professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "disciplina_nome_projetoId_key" ON "disciplina"("nome", "projetoId");

-- CreateIndex
CREATE UNIQUE INDEX "sala_nome_key" ON "sala"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "turma_nome_key" ON "turma"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "horario_diaSemana_horaInicio_professorId_key" ON "horario"("diaSemana", "horaInicio", "professorId");

-- CreateIndex
CREATE UNIQUE INDEX "horario_diaSemana_horaInicio_turmaId_key" ON "horario"("diaSemana", "horaInicio", "turmaId");

-- CreateIndex
CREATE UNIQUE INDEX "horario_diaSemana_horaInicio_salaId_key" ON "horario"("diaSemana", "horaInicio", "salaId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplina" ADD CONSTRAINT "disciplina_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilidadeprofessor" ADD CONSTRAINT "disponibilidadeprofessor_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horario" ADD CONSTRAINT "horario_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horario" ADD CONSTRAINT "horario_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horario" ADD CONSTRAINT "horario_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horario" ADD CONSTRAINT "horario_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horario" ADD CONSTRAINT "horario_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

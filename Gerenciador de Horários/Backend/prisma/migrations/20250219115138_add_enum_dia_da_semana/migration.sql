/*
  Warnings:

  - Changed the type of `diaSemana` on the `disponibilidadeprofessor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `diaSemana` on the `horario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `diaSemana` on the `intervalo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DiaSemana" AS ENUM ('DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO');

-- AlterTable
ALTER TABLE "disponibilidadeprofessor" DROP COLUMN "diaSemana",
ADD COLUMN     "diaSemana" "DiaSemana" NOT NULL;

-- AlterTable
ALTER TABLE "horario" DROP COLUMN "diaSemana",
ADD COLUMN     "diaSemana" "DiaSemana" NOT NULL;

-- AlterTable
ALTER TABLE "intervalo" DROP COLUMN "diaSemana",
ADD COLUMN     "diaSemana" "DiaSemana" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "horario_diaSemana_horaInicio_professorId_key" ON "horario"("diaSemana", "horaInicio", "professorId");

-- CreateIndex
CREATE UNIQUE INDEX "horario_diaSemana_horaInicio_turmaId_key" ON "horario"("diaSemana", "horaInicio", "turmaId");

-- CreateIndex
CREATE UNIQUE INDEX "horario_diaSemana_horaInicio_salaId_key" ON "horario"("diaSemana", "horaInicio", "salaId");

-- CreateIndex
CREATE UNIQUE INDEX "unique_intervalo" ON "intervalo"("diaSemana", "horaInicio", "projetoId");

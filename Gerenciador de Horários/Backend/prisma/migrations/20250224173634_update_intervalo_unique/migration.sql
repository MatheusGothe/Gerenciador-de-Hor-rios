/*
  Warnings:

  - A unique constraint covering the columns `[diaSemana,projetoId,horaInicio,horaFim]` on the table `intervalo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "unique_intervalo";

-- CreateIndex
CREATE UNIQUE INDEX "unique_intervalo" ON "intervalo"("diaSemana", "projetoId", "horaInicio", "horaFim");

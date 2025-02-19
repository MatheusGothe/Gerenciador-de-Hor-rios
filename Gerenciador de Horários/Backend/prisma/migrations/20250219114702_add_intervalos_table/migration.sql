/*
  Warnings:

  - You are about to drop the column `tipo` on the `horario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "horario" DROP COLUMN "tipo";

-- DropEnum
DROP TYPE "TipoHorario";

-- CreateTable
CREATE TABLE "intervalo" (
    "id" TEXT NOT NULL,
    "diaSemana" TEXT NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFim" TIMESTAMP(3) NOT NULL,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "intervalo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_intervalo" ON "intervalo"("diaSemana", "horaInicio", "projetoId");

-- AddForeignKey
ALTER TABLE "intervalo" ADD CONSTRAINT "intervalo_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

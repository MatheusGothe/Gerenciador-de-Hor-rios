/*
  Warnings:

  - Added the required column `tipo` to the `horario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoHorario" AS ENUM ('AULA', 'INTERVALO');

-- AlterTable
ALTER TABLE "horario" ADD COLUMN     "tipo" "TipoHorario" NOT NULL;

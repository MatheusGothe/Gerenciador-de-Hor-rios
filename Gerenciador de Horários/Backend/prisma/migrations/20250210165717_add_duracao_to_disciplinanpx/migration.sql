/*
  Warnings:

  - Added the required column `duracao` to the `disciplina` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "disciplina" ADD COLUMN     "duracao" INTEGER NOT NULL;

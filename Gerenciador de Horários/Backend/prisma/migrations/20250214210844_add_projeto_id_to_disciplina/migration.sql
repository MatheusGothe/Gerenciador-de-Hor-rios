/*
  Warnings:

  - A unique constraint covering the columns `[nome,projetoId]` on the table `disciplina` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projetoId` to the `disciplina` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "disciplina_nome_key";

-- AlterTable
ALTER TABLE "disciplina" ADD COLUMN     "projetoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "disciplina_nome_projetoId_key" ON "disciplina"("nome", "projetoId");

-- AddForeignKey
ALTER TABLE "disciplina" ADD CONSTRAINT "disciplina_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

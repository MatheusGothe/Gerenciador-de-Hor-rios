/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `disciplina` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "disciplina_nome_key" ON "disciplina"("nome");

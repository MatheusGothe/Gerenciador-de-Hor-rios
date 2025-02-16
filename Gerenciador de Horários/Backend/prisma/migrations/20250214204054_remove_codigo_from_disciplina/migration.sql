/*
  Warnings:

  - You are about to drop the column `codigo` on the `disciplina` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "disciplina_codigo_key";

-- AlterTable
ALTER TABLE "disciplina" DROP COLUMN "codigo";

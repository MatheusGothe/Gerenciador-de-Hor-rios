/*
  Warnings:

  - You are about to drop the `UsuarioProjeto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuarioId` to the `Projeto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsuarioProjeto" DROP CONSTRAINT "UsuarioProjeto_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioProjeto" DROP CONSTRAINT "UsuarioProjeto_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Projeto" ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "UsuarioProjeto";

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "professor" DROP CONSTRAINT "professor_projetoId_fkey";

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

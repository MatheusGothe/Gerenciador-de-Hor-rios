-- AlterTable
ALTER TABLE "Projeto" ADD COLUMN     "horaFimManha" TIMESTAMP(3),
ADD COLUMN     "horaFimTarde" TIMESTAMP(3),
ADD COLUMN     "horaInicioManha" TIMESTAMP(3),
ADD COLUMN     "horaInicioTarde" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "disponibilidadeprofessor" ADD COLUMN     "disponivel" BOOLEAN NOT NULL DEFAULT true;

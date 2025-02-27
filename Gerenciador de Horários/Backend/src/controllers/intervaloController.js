import { PrismaClient } from "@prisma/client";
import { parseTime } from "../functions/functions.js";
const prisma = new PrismaClient();

export const getAllIntervalos = async (req, res) => {
  try {
    const interavlos = await prisma.intervalo.findMany();
    res.json(interavlos);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao buscar interavlos" });
  }
};


export const createIntervalo = async (req, res) => {
  try {
    const { diaSemana, horaInicio, horaFim, projetoId } = req.body;

    // Verifica se o projeto existe
    const projetoExistente = await prisma.projeto.findFirst({
      where: { id: projetoId }
    });

    if (!projetoExistente) {
      return res.status(400).json({ error: "Projeto não existente" });
    }

    // (Opcional) Verifica se há sobreposição de horários para o mesmo dia e projeto
    const intervaloSobreposto = await prisma.intervalo.findFirst({
      where: {
        projetoId: projetoId,
        diaSemana: diaSemana,
        OR: [
          {
            horaInicio: { lt: parseTime(horaFim) }, // O início do novo intervalo é antes do fim de algum existente
            horaFim: { gt: parseTime(horaInicio) }  // O fim do novo intervalo é depois do início de algum existente
          }
        ]
      }
    });

    if (intervaloSobreposto) {
      return res.status(400).json({ error: "Horário sobreposto com outro intervalo existente" });
    }

    // Cria um novo intervalo
    const novoIntervalo = await prisma.intervalo.create({
      data: { diaSemana, horaInicio : parseTime(horaInicio), horaFim: parseTime(horaFim), projetoId },
    });

    res.status(201).json(novoIntervalo);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Erro ao criar intervalo" });
  }
};

/*
export const getDisciplinaById = async (req, res) => {
  try {
    const { id } = req.params;
    const disciplina = await prisma.disciplina.findUnique({ where: { id } });
    if (!disciplina) return res.status(404).json({ error: "Disciplina não encontrada" });
    res.json(disciplina);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar disciplina" });
  }
};
*/
export const updateIntervalo = async (req, res) => {
  try {
    const { id } = req.params;
    let { diaSemana,horaInicio, horaFim, projetoId } = req.body;

    horaFim = parseTime(horaFim)
    horaInicio = parseTime(horaInicio)

    const intervalo = await prisma.intervalo.findUnique({ where: { id } });
    if(!intervalo) return res.status(404).json({ error: "Intervalo não encontrado" });

      // (Opcional) Verifica se há sobreposição de horários para o mesmo dia e projeto
    const intervaloSobreposto = await prisma.intervalo.findFirst({
        where: {
          projetoId: projetoId,
          diaSemana: diaSemana,
          id: {not : id},
          OR: [
            {
              horaInicio: { lt: horaFim }, // O início do novo intervalo é antes do fim de algum existente
              horaFim: { gt: horaInicio }  // O fim do novo intervalo é depois do início de algum existente
            }
          ]
        }
      });
  
    if (intervaloSobreposto) {
        return res.status(400).json({ error: "Horário sobreposto com outro intervalo existente" });
    } 

    const projetExistente = await prisma.projeto.findFirst({
      where: {
        id: projetoId
      }
    })

    if(!projetExistente){
      return res.status(400).json({ error: "Projeto não existe" });
    }
    
    const IntervaloAtualizado = await prisma.intervalo.update({
      where: { id },
      data: { horaInicio, horaFim,diaSemana },
    });
    res.json({IntervaloAtualizado,message:"Intervalo atualizado"});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao atualizar intervalo" });
  }
};

export const deleteIntervalo = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o professor existe antes de deletar
    const intervalo = await prisma.intervalo.findUnique({ where: { id: String(id) } });

    if (!intervalo) {
      return res.status(404).json({ error: "Intervalo não encontrado" });
    }

    // Deleta o professor se ele existir
    await prisma.intervalo.delete({ where: { id: String(id) } });

    res.json({ message: "Intervalo deletado" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao deletar intervalo" });
  }
};


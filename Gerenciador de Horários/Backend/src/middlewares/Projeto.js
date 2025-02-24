import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const isValidTime = (time) => {
    const regex = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/;
    return regex.test(time);
};

export const validateProjeto = async (req, res, next) => {
    const { nome, descricao, usuarioId, horaInicioManha, horaFimManha, horaInicioTarde, horaFimTarde } = req.body;

    try {
        // Verificar se o nome foi fornecido
        if (!nome || nome.trim() === "") {
            return res.status(400).json({ error: "Nome do projeto deve ser informado" });
        }

        // Verificar se o id do usuário foi fornecido
        if (!usuarioId) {
            return res.status(400).json({ error: "ID do usuário deve ser passado" });
        }

              // Função para validar o formato "HH:MM:SS"
            const isValidTimeFormat = (time) => /^\d{2}:\d{2}:\d{2}$/.test(time);

            // Array com os horários
            const horarios = [horaInicioManha, horaFimManha, horaInicioTarde, horaFimTarde];

            // Verifica se algum horário está no formato errado
            if (horarios.some(hora => hora && !isValidTimeFormat(hora))) {
                return res.status(400).json({ error: "Os horários devem estar no formato HH:MM:SS (ex: 08:30:00)" });
            }

        // Verificar se os horários de manhã foram fornecidos e estão corretos
        if (!horaInicioManha || !horaFimManha) {
            return res.status(400).json({ error: "Horário de início e fim da manhã devem ser informados" });
        }

        // Verificar se os horários da tarde foram fornecidos e estão corretos
        if (!horaInicioTarde || !horaFimTarde) {
            return res.status(400).json({ error: "Horário de início e fim da tarde devem ser informados" });
        }

        // Verificar se o horário de início da manhã é antes do horário de fim da manhã
        if (horaInicioManha >= horaFimManha) {
            return res.status(400).json({ error: "O horário de início da manhã deve ser antes do horário de fim" });
        }

        // Verificar se o horário de início da tarde é antes do horário de fim da tarde
        if (horaInicioTarde >= horaFimTarde) {
            return res.status(400).json({ error: "O horário de início da tarde deve ser antes do horário de fim" });
        }

        // Se tudo estiver correto, passa para o próximo middleware
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Erro no processamento da requisição" });
    }
};

  export const validateUpdateProjeto = async (req, res, next) => {
    const { nome, descricao, usuarioId, horaInicioManha, horaFimManha, horaInicioTarde, horaFimTarde } = req.body;
    try {
        // Verificar se o nome foi fornecido
        if (!nome || nome.trim() === "") {
            return res.status(400).json({ error: "Nome do projeto deve ser informado" });
        }

              // Função para validar o formato "HH:MM:SS"
            const isValidTimeFormat = (time) => /^\d{2}:\d{2}:\d{2}$/.test(time);

            // Array com os horários
            const horarios = [horaInicioManha, horaFimManha, horaInicioTarde, horaFimTarde];

            // Verifica se algum horário está no formato errado
            if (horarios.some(hora => hora && !isValidTimeFormat(hora))) {
                return res.status(400).json({ error: "Os horários devem estar no formato HH:MM:SS (ex: 08:30:00)" });
            }

        // Verificar se os horários de manhã foram fornecidos e estão corretos
        if (!horaInicioManha || !horaFimManha) {
            return res.status(400).json({ error: "Horário de início e fim da manhã devem ser informados" });
        }

        // Verificar se os horários da tarde foram fornecidos e estão corretos
        if (!horaInicioTarde || !horaFimTarde) {
            return res.status(400).json({ error: "Horário de início e fim da tarde devem ser informados" });
        }

        // Verificar se o horário de início da manhã é antes do horário de fim da manhã
        if (horaInicioManha >= horaFimManha) {
            return res.status(400).json({ error: "O horário de início da manhã deve ser antes do horário de fim" });
        }

        // Verificar se o horário de início da tarde é antes do horário de fim da tarde
        if (horaInicioTarde >= horaFimTarde) {
            return res.status(400).json({ error: "O horário de início da tarde deve ser antes do horário de fim" });
        }

        // Se tudo estiver correto, passa para o próximo middleware
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Erro no processamento da requisição" });
    }

    
  };
  

  export const checkProjetoLinks = async(req,res,next) => {

    try {
        const {id} = req.params

        const linkWithProfessor = await prisma.professor.findFirst({
            where: {
                projetoId: Number(id)
            }
        })

        if(linkWithProfessor){
            return res.status(401).json({ error: "O projeto possuí professores vínculados" });
        }
        next()

        
    } catch (error) {
        console.log(error.message)
        return res.status(501).json({ error: "Erro ao excluir projeto" });
    }
    

  }
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};


export const createUser = async (req, res) => {
  try {
    const { nome, email,password } = req.body;

    const userExists = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, password:hashedPassword },
    });
    res
      .status(201)
      .json({
        message: "Usuário criado com sucesso",
        user: {
          name: novoUsuario.nome,
          email: novoUsuario.email,
          Id: novoUsuario.id,
        },
      });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao criar discplina" });
  }
};

export const gerUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,  // Exclui o campo `password`
      }
    });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email,password,confirmPassword } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario){
    return res.status(404).json({ error: "Usuário não encontrado" }) 
    }

    const emailExists = await prisma.usuario.findFirst({
      where: {
        email: email,
        id: { not: id } // Isso vai garantir que o email já não existe para outro id
      }
    });
    
    
    if (emailExists) {
      return res.status(400).json({ error: "E-mail já em uso por outro usuário" });
    }

   
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: { nome, email },
    });
    res.json({usuarioAtualizado,message:"Usuario atualizado"});
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuarios" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o professor existe antes de deletar
    const usuario = await prisma.usuario.findUnique({ where: { id: String(id) } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Deleta o usuario se ele existir
    await prisma.usuario.delete({ where: { id: String(id) } });

    res.json({ message: "Usuario deletado com sucesso" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};


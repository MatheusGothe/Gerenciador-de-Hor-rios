// Importando dependências
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Configurando o dotenv para carregar variáveis de ambiente
dotenv.config();

// Inicializando o Prisma Client
const prisma = new PrismaClient();

// Criando o servidor Express
const app = express();

// Usando middleware para aceitar JSON no corpo das requisições
app.use(express.json());

// Rota de exemplo para listar os professores
app.get('/professores', async (req, res) => {
    try {
        // Buscando todos os professores no banco de dados
        const professores = await prisma.professor.findMany();
        res.json(professores);
    } catch (error) {
        // Caso ocorra algum erro
        res.status(500).json({ error: 'Erro ao buscar professores' });
    }
});

// Iniciando o servidor
const startServer = async () => {
    try {
        // Conectando ao banco de dados
        await prisma.$connect();
        console.log('Conectado ao banco de dados com sucesso!');
        
        // Rodando o servidor na porta 3000
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados', error);
    }
};

// Iniciando o servidor
startServer();

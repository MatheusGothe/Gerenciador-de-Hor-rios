// Importando dependências
import express from 'express';

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv'
import router from './src/routes/Route.js'
// Configurando o dotenv para carregar variáveis de ambiente
dotenv.config();

// Inicializando o Prisma Client
const prisma = new PrismaClient();

// Criando o servidor Express
const app = express();

// Usando middleware para aceitar JSON no corpo das requisições
app.use(router);


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

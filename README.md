# 📚 BiblioTech - Sistema de Gerenciamento de Biblioteca

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

A **BiblioTech** é uma aplicação web full-stack desenvolvida para automatizar e simplificar a gestão de acervos, usuários e empréstimos em bibliotecas. O sistema conta com controle de acesso baseado em cargos (RBAC) e autenticação segura via JSON Web Token (JWT).

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Documentação da API](#-documentação-da-api)
- [Licença](#-licença)

---

## 🔍 Visão Geral

O projeto resolve o problema de controle manual de livros e prazos de devolução. A plataforma separa a experiência do usuário em dois perfis principais:
- **Administrador:** Responsável pela manutenção do acervo, gestão de membros e monitoramento geral da plataforma.
- **Usuário Comum:** Pode navegar pelo catálogo, verificar disponibilidade em tempo real e realizar solicitações de empréstimo/devolução.

---

## ✨ Funcionalidades Principais

- **Autenticação e Segurança:** Login/Registro seguro com senhas criptografadas via `bcrypt` e sessões gerenciadas por `JWT`.
- **Controle de Acesso (RBAC):** Rotas protegidas no frontend e middleware de permissão no backend.
- **Gestão de Acervo:** CRUD completo de livros com controle automático de status (*Disponível* / *Emprestado*).
- **Gestão de Empréstimos:** Histórico detalhado com datas de retirada e limite para devolução.
- **Dashboard Dinâmico:** Métricas e resumos adaptados ao tipo de conta autenticada.
- **API Swagger:** Documentação interativa e testável diretamente pelo navegador.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** + **Vite** — Construção de interface rápida e reativa.
- **Tailwind CSS** — Estilização moderna e responsiva.
- **Lucide React** — Biblioteca de ícones.
- **Axios** — Cliente HTTP para integração com a API.

### Backend
- **Node.js** + **Express** — Arquitetura de API RESTful.
- **PostgreSQL** — Banco de dados relacional e persistência de dados.
- **JSON Web Token (JWT)** & **bcrypt** — Autenticação e hash de senhas.
- **Swagger UI** — Documentação padronizada da API (OpenAPI).
- **dotenv** & **CORS** — Configurações de ambiente e segurança entre origens.

---

## 🛠️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (Versão 14 ou superior)
- [Git](https://git-scm.com/)

---

# 📦 Instalação e Configuração

# 1. Clone o repositório

git clone https://github.com/arthursouzaaa/BiblioTech.git

cd BiblioTech

Configurando o Backend

Acesse a pasta do servidor
cd backend

# Instale as dependências
npm install

Configure o banco de dados PostgreSQL e execute as migrações/scripts SQL
(Execute seu arquivo .sql de criação de tabelas no PostgreSQL)

Inicie o servidor em modo de desenvolvimento
npm run dev

# Configurando o Frontend

Em outro terminal, acesse a pasta da interface
cd frontend

Instale as dependências
npm install

Inicie a aplicação React
npm run dev

Fragmento do código
Configurações do Servidor
PORT=3000

# Configurações do Banco de Dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=bibliotech_db

Segredo JWT
JWT_SECRET=sua_chave_secreta_aqui

## 👨‍💻 Autores

- [@arthursouzaaa](https://www.github.com/arthursouzaaa)
- [@Dev-Andreson](https://github.com/Dev-Andreson)
- [@italocarlos691-lang](https://github.com/italocarlos691-lang)
- [@lucas7nascimento7-boop](https://github.com/lucas7nascimento7-boop)

## ♾️ Licença

[MIT](https://choosealicense.com/licenses/mit/)

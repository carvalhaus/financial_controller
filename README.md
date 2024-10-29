# Treasure

Treasure é um aplicativo de controle financeiro projetado para ajudar os usuários a gerenciar suas finanças de forma eficaz e segura. Este projeto foi desenvolvido como TCC (Trabalho de Conclusão de Curso) do curso de Pós-graduação em Desenvolvimento Full Stack pela PUCRS (Pontifícia Universidade Católica do Rio Grande do Sul).

## Acesse o Projeto

Você pode acessar o projeto "Treasure" através do seguinte link: [Treasure - Controle Financeiro](https://treasurefinances.vercel.app/).

[![Demonstração do Treasure](https://img.youtube.com/vi/w3PKEWs9VHI/maxresdefault.jpg)](https://www.youtube.com/watch?v=w3PKEWs9VHI)

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Rodar Localmente](#como-rodar-localmente)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Configuração das Variáveis de Ambiente](#configuração-das-variáveis-de-ambiente)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Funcionalidades

- **Registro de Receitas e Despesas**: Permite aos usuários registrar todas as suas transações financeiras.
- **Histórico de Transações**: Exibe um histórico detalhado de todas as transações realizadas.
- **Cálculo de Saldo em Tempo Real**: Calcula automaticamente o saldo do usuário com base nas transações registradas.
- **Limites de Gastos**: Permite aos usuários definir limites de gastos e monitorar esses limites.

## Tecnologias Utilizadas

- **Frontend**: Next.js, ShadcnUI, Tailwind CSS
- **Backend**: Node.js, Express
- **Banco de Dados**: PostgreSQL, Prisma ORM
- **Autenticação**: Google OAuth 2.0
- **Containerização**: Docker-compose

## Estrutura do Projeto

O projeto é dividido em três principais componentes:

1. **Frontend**: Desenvolvido com Next.js, utilizando ShadcnUI e Tailwind CSS para a interface do usuário.
2. **Backend**: Implementado com Node.js e Express, responsável pela lógica do servidor e comunicação com o banco de dados.
3. **Banco de Dados**: PostgreSQL, gerenciado pelo Prisma ORM, para armazenar todas as transações e informações financeiras dos usuários.

## Como Rodar Localmente

### Pré-requisitos

Para rodar o projeto localmente, você precisa ter instalado em sua máquina:

- [Docker](https://www.docker.com/get-started) (certifique-se de que o Docker está rodando corretamente)

### Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/treasure.git
   cd treasure
   ```

2. **Configuração das Variáveis de Ambiente**

   Crie um arquivo `.env` no diretório `backend` com as seguintes variáveis:

   ```bash
   cd backend
   touch .env
   ```

   Abra o arquivo `.env` e adicione as seguintes variáveis:

   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/treasure
   SALT_ROUNDS=10
   GOOGLE_CLIENT_ID=seu-google-client-id
   GOOGLE_CLIENT_SECRET=seu-google-client-secret
   GOOGLE_REDIRECT_URL=http://localhost:3000/auth/google/callback
   PRIVATE_KEY=sua-chave-privada
   PUBLIC_KEY=sua-chave-publica
   FRONTEND_URL=http://localhost:3000
   GOOGLE_EMAIL_TEST=email@teste.com
   ```

### Explicação das Variáveis

- **DATABASE_URL**: URL de conexão com o banco de dados PostgreSQL.
- **SALT_ROUNDS**: Número de rodadas para o hashing de senhas.
- **GOOGLE_CLIENT_ID**: ID do cliente OAuth 2.0 do Google.
- **GOOGLE_CLIENT_SECRET**: Segredo do cliente OAuth 2.0 do Google.
- **GOOGLE_REDIRECT_URL**: URL de redirecionamento após a autenticação com o Google.
- **PRIVATE_KEY**: Chave privada usada para criptografia de dados.
- **PUBLIC_KEY**: Chave pública correspondente à chave privada, usada para verificar dados criptografados.
- **FRONTEND_URL**: URL do frontend da aplicação, normalmente algo como `http://localhost:3000` durante o desenvolvimento.
- **GOOGLE_EMAIL_TEST**: Endereço de e-mail de teste para simular login do Google OAuth.

### Rodar os Containers com Docker Compose

No diretório raiz do projeto, execute:

```bash
docker-compose up --build

```

Isso irá construir e iniciar os containers necessários para rodar o frontend, backend e o banco de dados PostgreSQL.

### Acessar a Aplicação

Após os containers estarem rodando, abra o seu navegador e acesse:

http://localhost:3000

A aplicação estará pronta para uso.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias ou correções de bugs.

## Licença

Este projeto é licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

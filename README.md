# 💰 Financial API

API REST para **gerenciamento financeiro pessoal**, desenvolvida com foco em organização, segurança, testes e boas práticas de desenvolvimento.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.19.3-2D3748?logo=prisma&logoColor=white)

---

## 📑 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Status](#-status)
- [Tecnologias](#-tecnologias)
- [Modelagem do banco de dados](#-modelagem-do-banco-de-dados)
- [Como executar](#-como-executar)
- [Roadmap](#-roadmap)

---

## 📌 Sobre o projeto

O objetivo é construir uma API financeira completa, que permita aos usuários:

- gerenciar suas **contas** (corrente, poupança, cartão de crédito e dinheiro);
- registrar **transações** de entrada e saída, organizadas por **categorias**;
- acompanhar o **saldo** em tempo real;
- obter **relatórios** sobre sua movimentação financeira.

O projeto é evoluído de forma incremental, com novas funcionalidades, melhorias de arquitetura, testes, segurança e infraestrutura a cada etapa.

---

## 🚧 Status

> **Em desenvolvimento.** A camada de dados está modelada; a conexão com o banco, as migrations e os endpoints são os próximos passos.

**Já implementado:**

- ✅ Modelagem inicial do banco de dados
- ✅ Prisma ORM e Prisma Client configurados
- ✅ Models `User`, `Account`, `Category`, `Transaction` e `RefreshToken`
- ✅ Enums para tipos de conta e de transação
- ✅ Relacionamentos entre as entidades
- ✅ Constraints de unicidade e índices para otimizar consultas
- ✅ Configuração para PostgreSQL

---

## 🛠 Tecnologias

| Categoria        | Tecnologia                     |
| ---------------- | ------------------------------ |
| Runtime          | Node.js                        |
| Linguagem        | TypeScript                     |
| Framework        | NestJS                         |
| Banco de dados   | PostgreSQL                     |
| ORM              | Prisma `6.19.3`                |
| Autenticação     | JWT (access + refresh token)   |
| Testes           | Jest                           |
| Containerização  | Docker                         |
| CI/CD            | GitHub Actions                 |

---

## 🗄 Modelagem do banco de dados

O schema está em [`prisma/schema.prisma`](prisma/schema.prisma) e possui **5 entidades**.

### Diagrama

```mermaid
erDiagram
    User ||--o{ Account : possui
    User ||--o{ Transaction : realiza
    User ||--o{ RefreshToken : autentica
    Account ||--o{ Transaction : registra
    Category ||--o{ Transaction : classifica

    User {
        uuid id PK
        string name
        string email UK
        string passwordHash
        datetime createdAt
        datetime updatedAt
    }
    Account {
        uuid id PK
        uuid userId FK
        string name "único por usuário"
        AccountType type "CHECKING | SAVINGS | WALLET"
        decimal initialBalance "12,2"
        datetime createdAt
        datetime updatedAt
    }
    Category {
        uuid id PK
        string name UK
        TransactionType type "INCOME | EXPENSE"
        datetime createdAt
        datetime updatedAt
    }
    Transaction {
        uuid id PK
        uuid userId FK
        uuid accountId FK
        uuid categoryId FK
        string description
        decimal amount "12,2"
        TransactionType type "INCOME | EXPENSE"
        date date
        datetime createdAt
        datetime updatedAt
    }
    RefreshToken {
        uuid id PK
        uuid userId FK
        string token UK "hash"
        datetime expiresAt
        datetime createdAt
    }
```

### Entidades

| Entidade         | Descrição                                                        | Regras                                                       |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ |
| **User**         | Usuário da aplicação                                             | E-mail único                                                 |
| **Account**      | Conta financeira do usuário                                      | Um usuário não pode ter duas contas com o mesmo nome         |
| **Category**     | Categoria das transações (ex.: Alimentação, Transporte, Salário) | Nome único                                                   |
| **Transaction**  | Movimentação financeira vinculada a usuário, conta e categoria   | Índices em `usuário + data` e `usuário + categoria`          |
| **RefreshToken** | Refresh tokens usados na autenticação                            | Token único, vinculado ao usuário                            |

### Enums

**`AccountType`**

| Valor         | Significado       |
| ------------- | ----------------- |
| `CHECKING`    | Conta corrente    |
| `SAVINGS`     | Poupança          |
| `CREDIT_CARD` | Cartão de crédito |
| `CASH`        | Dinheiro          |

**`TransactionType`**

| Valor     | Significado |
| --------- | ----------- |
| `INCOME`  | Entrada     |
| `EXPENSE` | Saída       |

### Regras de exclusão

| Ao excluir…   | Comportamento                                                               |
| ------------- | --------------------------------------------------------------------------- |
| **User**      | Contas, transações e refresh tokens são removidos em cascata                |
| **Account**   | Bloqueado se houver transações vinculadas                                   |
| **Category**  | Bloqueado se houver transações vinculadas                                   |

---

## ▶️ Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- [PostgreSQL](https://www.postgresql.org/)
- npm

### Passo a passo

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd financial-api

# 2. Instale as dependências
npm install
```

**3. Configure as variáveis de ambiente** criando um arquivo `.env` na raiz:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/financial_db"
```

**4. Valide o schema e gere o Prisma Client:**

```bash
npx prisma validate
npx prisma generate
```

> ⚠️ O banco PostgreSQL e as migrations ainda estão em configuração. Esta seção será atualizada com os comandos de migration e de inicialização da API.

---

## 🗺 Roadmap

**Banco de dados**
- [ ] Configurar PostgreSQL e criar o banco
- [ ] Criar a primeira migration
- [ ] Configurar a conexão da aplicação com o banco

**Autenticação**
- [ ] Implementar autenticação com JWT
- [ ] Implementar cadastro e login

**Funcionalidades**
- [ ] CRUD de contas
- [ ] CRUD de categorias
- [ ] CRUD de transações
- [ ] Cálculo e consulta de saldo
- [ ] Relatórios financeiros
- [ ] Paginação e filtros

**Qualidade e infraestrutura**
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Docker
- [ ] CI com GitHub Actions
- [ ] Documentação da API (Swagger)

---

## 👤 Autor

Feito por **Jhon** — contribuições, sugestões e feedbacks são bem-vindos!

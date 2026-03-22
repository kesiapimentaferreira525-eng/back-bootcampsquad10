# Projeto do Curso DFS-2026.1

Este projeto consiste em um backend desenvolvido com Node.js e Express, focado na gestão de 'ofertas de conhecimentos'. A aplicação utiliza o Prisma ORM integrado ao PostgreSQL 15, integridade de dados e uma estrutura de banco de dados.

---

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL 15**
- **Nodemon**

---

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- Node.js (versão LTS recomendada)
- PostgreSQL 15
- Git

---

## 📥 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/kesiapimentaferreira525-eng/bootcampsquad10
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo .env na raiz do projeto com a variável DATABASE_URL apontando para o banco de dados:

```env
DATABASE_URL="postgresql://postgres:root@localhost:5433/db_dados?schema=public"
```

4. Execute as migrations:

```bash
npx prisma migrate dev
```

5. Visualizar as tabelas:

```bash
npx prisma studio
```

6. Inicie o projeto:

```bash
npm start
```

📁 Estrutura básica do projeto

📦 aula03-2026.1

┣ 📂 prisma

┣ 📂 node_modules

┣ 📜 index.js

┣ 📜 package.json

┗ 📜 .env

📜 Scripts disponíveis

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "nodemon --env-file=.env index.js"
}

import express, { request, response } from "express"
import prisma from "./PrismaClient.js";


import 'dotenv/config' // 1. Isso deve ser a PRIMEIRA LINHA do arquivo
import { createClient } from '@supabase/supabase-js'

// 2. Agora o Node vai conseguir ler as variáveis do seu .env
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_ANON_KEY
)









const app = express();
app.use(express.json());

app.get("/users", async (request, response) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                name: "asc"
            }
        });
        return response.status(200).json(users);
    } catch(error) {
        return response.status(500).send();
    }
})

// pagination
app.get("/users-posts", async (request, response) => {
  const { page = 1, limit = 5 } = request.query

  const take = Number(limit)
  const skip = (Number(page) - 1) * take

  try {
    const users = await prisma.user.findMany({ skip, take });

    const total = await prisma.user.count();

    return response.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / take),
      data: users
    })

  } catch (error) {
    return response.status(500).send()
  }
})




app.post('/signup', async (req, res) => {
  const { email, password, name, phone, description } = req.body

  try {
    // 1. Cadastra no Supabase Auth (Gera o JWT e o ID de autenticação)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    // 2. Salva no seu banco usando o Prisma
    const newUser = await prisma.user.create({
      data: {
        id: authData.user.id, // O ID vem do Supabase Auth
        email,
        name,
        phone,
        description
      }
    })

    res.status(201).json({ message: "Usuário criado!", user: newUser })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})






app.put("/users/:id", async (request, response) => {
    const { name, email, phone } = request.body;
    const { id } = request.params;
    try {
        const user = await prisma.user.findUnique({ where: { id } });

        if(!user) {
            return response.status(404).json("User not found");
        }

        const userUpdated = await prisma.user.update({
            data: { name, email, phone },
            where: { id }
        })

        return response.status(200).json(userUpdated);
    } catch(error) {
        return response.status(500).send();
    }
})

app.delete("/users/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const user = await prisma.user.findUnique({ where: { id } });

        if(!user) {
            return response.status(404).json("User not found");
        }

        await prisma.user.delete({ 
            where: { id }
        })

        return response.status(204).send();
    } catch(error) {
        return response.status(500).send();
    }
})

app.listen(8080, () => {
    console.log("Running on port 8080")
})

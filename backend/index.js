import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "MegaDell",
    password: "",
    port: 5432,
});

db.connect();

app.get("/get-all-info", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM users");
        const users = response.rows;
        console.log(users);
        res.json(users);
    } catch (err) {
        console.error("Erro executando a busca", err.stack);
        res.status(500).json({ error: "Um erro aconteceu ao buscar usuários" });
    }
})

app.post("/send-info", async (req, res) => {
    console.log(req.body)
    try {
        const { nome, cpf, numeros } = req.body;

        if (!nome || !cpf || !numeros) {
            return res.status(400).json({ error: "Faltam dados requeridos" });
        }

        const queryText = "INSERT INTO users (nome, cpf, numeros) VALUES ($1, $2, $3)";
        const queryValues = [nome, cpf, numeros];

        await db.query(queryText, queryValues);

        return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (err) {
        console.error("Erro executando a busca", err.stack);
        return res.status(500).json({ error: "Um erro ocorreu enquanto o usuário era criado" })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
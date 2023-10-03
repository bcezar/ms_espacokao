const express = require("express");
const app = express();
const mongodb = require("mongodb");
const cors = require('cors');
const connectionString = "mongodb://localhost:27017/personal";
const client = new mongodb.MongoClient(connectionString);

app.use(express.json()); // Adiciona o middleware para interpretar JSON
app.use(cors()); // Adiciona o middleware para permitir requisições de outros domínios

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get("/dados", async (req, res) => {
    const collection = client.db("personal").collection("espacokao");

    const documents = await collection.find().toArray();

    res.json(documents);
});

app.post("/dados", async (req, res) => {
    const collection = client.db("personal").collection("espacokao");

    try {
        const result = await collection.insertOne(req.body);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

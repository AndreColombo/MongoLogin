const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Conecte-se ao banco de dados MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cadastro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000,
});

// Defina um modelo para os dados
const Cadastro = mongoose.model("Cadastro", {
  nomeCompleto: String,
  email: String,
  celular: String,
  uf: String,
  cidade: String,
  bairro: String,
  endereco: String,
  numero: String,
  complemento: String,
});

// Rota para exibir o formulário
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Rota para processar o envio do formulário
app.post("/cadastrar", (req, res) => {
  const {
    nomeCompleto,
    email,
    celular,
    uf,
    cidade,
    bairro,
    endereco,
    numero,
    complemento,
  } = req.body;

  // Crie um novo documento no banco de dados
  const novoCadastro = new Cadastro({ nomeCompleto, email });

  // Salve o documento
  novoCadastro.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao cadastrar.");
    } else {
      res.redirect("/sucesso.html"); // Página de sucesso após o cadastro
    }
  });
});

app.listen(5500, () => {
  console.log("Servidor rodando na porta 3000");
});
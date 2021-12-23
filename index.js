const express = require('express');
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

require("dotenv-safe").config({
    allowEmptyValues: true
});

const createUser = require('./src/controllers/UserCreate');
const userLogin = require('./src/controllers/UserLogin');

const PORT = 3000;
const HOST = '0.0.0.0';

const date = new Date();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Criando arquivo de log
const log = fs.createWriteStream(
    path.join(__dirname, "./logs", `Log_Processamento_${date.getFullYear() + date.getMonth() + date.getDay()}.log`), {flags: "a"}
);

// Configurações do morgan-body para gerar log's do processsamento
morganBody(app, {
    noColors: true,
    stream: log,
});

app.use("/", createUser);
app.use("/", userLogin);

app.listen(PORT, HOST, () => {
    console.log(`Application is running ${PORT}...`)
});
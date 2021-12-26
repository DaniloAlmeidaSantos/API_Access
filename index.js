const express = require('express');
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

require("dotenv-safe").config({
    allowEmptyValues: true
});

const createUser = require('./src/controllers/UserCreate');
const userLogin = require('./src/controllers/UserLogin');
const updateUser = require('./src/controllers/UserPut');
const principal = require('./src/controllers/Principal');

const authUser = require('./src/middlewares/authUser');

const date = new Date();

const app = express();

app.use(session({
    secret: process.env.SECRET_SESSION,
    cookie: {
        maxAge: process.env.AGE_SESSION
    }
}));

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
app.use("/", authUser, updateUser);
app.use("/", authUser, principal);

app.listen(process.env.EXPRESS_PORT, process.env.EXPRESS_HOST, () => {
    console.log(`Application is running ${process.env.EXPRESS_PORT}...`)
});
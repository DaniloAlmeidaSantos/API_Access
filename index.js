const express = require("express");
const morganBody = require("morgan-body");
const fs = require("fs");
const path = require("path");
const session = require("express-session");

require("dotenv-safe").config({
    allowEmptyValues: true
});

const createUser = require("./src/controllers/users/UserCreate");
const userLogin = require("./src/controllers/users/UserLogin");
const updateUser = require("./src/controllers/users/UserPut");
const principal = require("./src/controllers/users/Principal");

// const createTeam = require("./src/controllers/teams/CreateTeam");
// const alterTeam = require("./src/controllers/teams/AlterTeam");

const championshipCreate = require("./src/controllers/championship/ChampionshipCreate");
const championshipAlter = require("./src/controllers/championship/championshipUpdate");
const championshipDelete = require("./src/controllers/championship/championshipDelete");

const teamCreate = require("./src/controllers/teams/teamCreate");
const teamAlter = require("./src/controllers/teams/teamAlter");
const teamDelete = require("./src/controllers/teams/teamDelete");

const authUser = require("./src/middlewares/authUser");

const date = new Date();

const app = express();

app.use(session({
    secret: process.env.SECRET_SESSION,
    cookie: {
        secure: false,
        path: "/",
        httpOnly: true,
        maxAge: Number(process.env.AGE_SESSION)
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Criando arquivo de log
const log = fs.createWriteStream(
    path.join(__dirname, "./logs", `Log_Processamento_${date.getFullYear() + date.getMonth() + date.getDay()}.log`), {flags: "a"}
);

// Configurações do morgan-body para gerar log"s do processsamento
morganBody(app, {
    noColors: true,
    stream: log,
});

app.use("/", createUser);
app.use("/", userLogin);
app.use("/", updateUser);

app.use("/", authUser, principal);

app.use("/", championshipCreate);
app.use("/", championshipAlter);
app.use("/", championshipDelete);

app.use("/", authUser, teamCreate);
app.use("/", authUser, teamAlter);
app.use("/", authUser, teamDelete);

app.listen(process.env.EXPRESS_PORT, process.env.EXPRESS_HOST, () => {
    console.log(`Application is running ${process.env.EXPRESS_PORT}...`);
});
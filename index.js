const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

// Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão concluida com sucesso");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

// Habilitando o uso do EJS no Express
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/",(req, res) => {
    res.render("index");
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send( titulo + " " + descricao);
});

app.listen(8080,()=>{console.log("servidor iniciado");});
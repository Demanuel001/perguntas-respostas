const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC'] 
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    })
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    console.log(titulo + 1)
    console.log(descricao + 2)
    if( titulo != "" && descricao != "" ){
        Pergunta.create({
            titulo: titulo,
            descricao: descricao
        }).then(() => {
            res.redirect("/");
        });
    }else{
        res.redirect("/");
    }
});

app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined ){
            res.render("pergunta",{
                pergunta: pergunta
            });
        }else{
            res.redirect("/");
        }
    })
})

app.listen(8080,()=>{console.log("servidor iniciado");});
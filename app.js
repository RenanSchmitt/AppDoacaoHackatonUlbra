const express = require("express");
const app = express();
const helpers = require("./modules/helpers");
const passwdHasher = require("./modules/passwdHasher");
const db = require("./modules/dbInterface");
const bodyParser = require("body-parser");
const session = require("express-session");

//db.NovoPedido("Teste", "sei lá", "vish", 1).then(() => console.log("salvo"));

app.use(session({
    secret: passwdHasher.GenSalt(128),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} ${req.socket.remoteAddress} ${req.method} ${req.url} User: ${req.session.username}`);
    next();
});

app.get("/", (req, res) => {
    if (!req.session.username)
        res.redirect("/login");
    else {
        switch (Number(req.session.doador)) {
            case 1:
                res.sendFile(`${__dirname}/public/doador/index.html`);
                break;
            case 2:
                res.sendFile(`${__dirname}/public/beneficiado/index.html`);
                break;
            default:
                res.status(500).send(`Classe '${req.session.doador}' inválida`);
        }
    }
});

app.use(express.static("public"));

app.get("/usuario/:id", (req, res) => {
    db.GetUser(Number(req.params.id)).then(user => res.send(user)).catch(err => res.status(500).send(err));
});

app.get("/login", (req, res) => {
    if (req.session.username)
        res.redirect("/");
    else
        res.sendFile(`${__dirname}/public/login.html`);
});

app.post("/login", (req, res) => {
    console.log(req.body);
    db.QueryUnique(`select password, id, username, doador from users where lower(email)=lower(${db.MySQL.mysql.escape(req.body.email)})`).then(result => {
        if (passwdHasher.Check(req.body.password, result.password)) {
            console.log("autenticado");
            req.session.userid = result.id;
            req.session.username = result.username;
            req.session.doador = result.doador;
            res.redirect("/");
        } else {
            console.log("Senha incorreta");
        }
        console.log(result);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get("/cadastrar", (req, res) => {
    res.sendfile(`${__dirname}/public/cadastrar.html`);
});

app.post("/cadastrar", (req, res) => {
    req.body.id = undefined;
    db.NovoUsuario(req.body).then(success => {
        req.session.userid = success.insertId;
        req.session.username = req.body.username;
        req.session.doador = req.body.doador;
        res.redirect("/");
    }).catch(err => {
        if (err.code && err.code == "ER_DUP_ENTRY")
            res.status(400).send("Um usuário com esse e-mail já está cadastrado");
        else
            res.status(500).send(err);
        console.error(err);
    });
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.post("/novo_produto", (req, res) => {
    req.body.id = undefined;
    db.NovoProduto(req.body).then(() => {
        res.redirect("/");
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});

app.post("/novo_pedido", (req, res) => {
    req.body.id = undefined;
    db.NovoPedido(req.body).then(() => {
        res.redirect("/");
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});

app.listen(3000, () => {
    console.log("Escutando na 3000");
});
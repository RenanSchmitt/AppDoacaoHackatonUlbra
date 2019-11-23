const mysql = require("./mysql");
const helpers = require("./passwdHasher");

function MakeQuery(query) {
    return new Promise((resolve, reject) => {
        mysql.connection.then(conn => {
            conn.query(query, (err, rows) => {
                if (err) {
                    console.error("Erro executando a query:\n", query, "\n", err);
                    reject(err);
                    res.sendStatus(500);
                } else
                    resolve(rows);
            });
        }).catch(err => {
            console.error("Erro abrindo conexão com o banco:\n", err);
            res.sendStatus(500);
        });
    });
}

function GetProduto(id) {
    return new Promise((resolve, reject) => {
        GetUnique("produto", id).then(resolve).catch(reject);
    });
}

/**
 * 
 * @param {String} table 
 * @param {Object} values 
 */
function Insert(table, values) {
    return new Promise((resolve, reject) => {
        MakeQuery(`insert into ${table}(${Object.keys(values).join(",")}) values(${Object.keys(values).map(key => mysql.mysql.escape(values[key])).join(",")})`).then(res => {
            resolve();
        }).catch(reject);
    });
}

/**
 * 
 * @param {String} nome 
 * @param {String} descricao
 * @param {String} img 
 * @param {String} owner 
 */
function NovoProduto(nome, descricao, img, owner) {
    return new Promise((resolve, reject) => {
        Insert("produto", {
            nome: nome,
            descricao: descricao,
            img: img,
            owner: owner
        }).then(resolve).catch(reject);
    });
}

/**
 * 
 * @param {String} nome 
 * @param {String} motivo 
 * @param {String} descricao 
 * @param {String} requester 
 */
function NovoPedido(nome, motivo, descricao, requester) {
    return new Promise((resolve, reject) => {
        Insert("pedido", {
            nome: nome,
            motivo: motivo,
            descricao: descricao,
            requester: requester
        }).then(resolve).catch(reject);
    });
}

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {String} email 
 * @param {String} doador 
 */
function NovoUsuario(username, password, email, doador) {
    return new Promise((resolve, reject) => {
        Insert("users", {
            username: username,
            password: helpers.Hash(password),
            email: email,
            doador: doador
        }).then(resolve).catch(reject);
    });
}

/**
 * 
 * @param {String} query 
 */
function QueryUnique(query) {
    return new Promise((resolve, reject) => {
        MakeQuery(query).then(result => {
            if (result.length == 0)
                reject("Nenhum resultado encontrado");
            else
                resolve(result[0]);
        }).catch(reject);
    });
}

/**
 * 
 * @param {String} table 
 * @param {Number} id 
 */
function GetUnique(table, id) {
    return new Promise((resolve, reject) => {
        QueryUnique(`select * from ${table} where id = ${mysql.mysql.escape(id)}`).then(resolve).catch(reject);
    });
}

/**
 * 
 * @param {Number} id 
 */
function GetUser(id) {
    return new Promise((resolve, reject) => {
        GetUnique("user", id).then(resolve).catch(reject);
    });
}

module.exports = {
    GetUser: GetUser,
    NovoProduto: NovoProduto,
    NovoPedido: NovoPedido,
    NovoUsuario: NovoUsuario,
    GetProduto: GetProduto,
    QueryUnique: QueryUnique,
    MySQL: mysql
}
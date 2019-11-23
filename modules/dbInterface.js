const mysql = require("./mysql");
const helpers = require("./passwdHasher");

function MakeQuery(query) {
    return new Promise((resolve, reject) => {
        mysql.connection.then(conn => {
            conn.query(query, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        }).catch(reject);
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
            resolve(res);
        }).catch(reject);
    });
}

/**
 * 
 * @param {Object} data
 */
function NovoProduto(data) {
    return new Promise((resolve, reject) => {
        Insert("produto", data).then(resolve).catch(reject);
    });
}

/**
 * 
 * @param {Object} data
 */
function NovoPedido(data) {
    return new Promise((resolve, reject) => {
        Insert("pedido", data).then(resolve).catch(reject);
    });
}

/**
 * 
 * @param {Object} data 
 */
function NovoUsuario(data) {
    return new Promise((resolve, reject) => {
        data.password = helpers.Hash(data.password);
        Insert("users", data).then(resolve).catch(reject);
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
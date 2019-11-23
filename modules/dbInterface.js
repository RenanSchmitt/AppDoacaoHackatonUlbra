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

function GetTags() {
    return new Promise((resolve, reject) => {
        MakeQuery("select * from tag").then(resolve).catch(reject);
    });
}

/**
 * 
 * @param {Object} values 
 */
function NewTag(values) {
    return new Promise((resolve, reject) => {
        Insert("tag", values).then(resolve).catch(reject);
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
        console.log("Procurando o usuário ", id);
        GetUnique("users", id).then(resolve).catch(reject);
    });
}

/**
 * 
 * @param {Object} values 
 */
function LinkTag(values) {
    return new Promise((resolve, reject) => {
        Insert(values.doador == 1 ? "tagproduto" : "tagpedido", { idtag: values.idtag, iditem: values.iditem }).then(resolve).catch(reject);
    });
}


function GetItems(userid) {
    return new Promise((resolve, reject) => {
        GetUser(userid).then(user => {
            MakeQuery(`select * from ${user.doador == 1 ? "produto" : "pedido"} where user = ${userid}`).then(itens => {
                console.log(itens);
                var tags = [];
                itens.forEach(item => {
                    tags.push(MakeQuery(`select t.nome, t.id from tag t inner join ${user.doador == 1 ? "tagproduto" : "tagpedido"} p on t.id = p.idtag where p.iditem=${item.id}`));
                });
                Promise.all(tags).then(alltags => {
                    for (var i = 0; i < alltags.length; i++)
                        itens[i].tags = alltags[i];
                    resolve({
                        items: itens.map(row => {
                            row.id = undefined;
                            row.user = undefined;
                            return row;
                        }),
                        user: {
                            name: user.username,
                            doador: user.doador,
                            email: user.email,
                            endereco: user.endereco
                        }
                    });
                });
            }).catch(reject);
        }).catch(reject);
    });
}

module.exports = {
    MakeQuery: MakeQuery,
    GetUser: GetUser,
    NovoProduto: NovoProduto,
    NovoPedido: NovoPedido,
    NovoUsuario: NovoUsuario,
    GetProduto: GetProduto,
    QueryUnique: QueryUnique,
    MySQL: mysql,
    GetTags: GetTags,
    NewTag: NewTag,
    GetItems: GetItems,
    LinkTag: LinkTag
}
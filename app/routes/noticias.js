module.exports = function(app) {
    
    const con = require('../../config/db')
    
    app.get('/noticias', function(req, res){
        con.query(`SELECT * FROM noticias`, (err, noticias) => {

            if (err) {
                reject(err);
                return;
            }
            res.send(noticias)
        })

        // res.render("noticias/noticias");
    })
}
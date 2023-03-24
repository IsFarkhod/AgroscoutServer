const mysql = require("mysql2")

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'agroscoutdb'
})

exports.addItem = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err

        connection.query('SELECT * FROM busket', (err, rows) => {
            connection.release()
            if (!err) {
                res.render('busket', { rows })
            } else {
                console.log(err)
            }
        })
    })
}


exports.itemDelete = (req, res) => {

    db.getConnection((err, connection) => {
        if (err) throw err

        connection.query("DELETE FROM busket WHERE id = ?", [req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                res.redirect('busket')
            } else {
                console.log(err)
            }
        })
    })
}
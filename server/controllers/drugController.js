const mysql = require("mysql2")


const db = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'agroscoutdb'
})

exports.allViewDrug = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err
        // console.log('Connected as Id' + connection.threadId)

        connection.query('SELECT * FROM drug', (err, results) => {
            connection.release()

            if (!err) {
                res.render('drug', { results })
            } else {
                console.log(err)
            }

            //console.log("The data from drone table: \n", rows)
        })
    })
}

exports.drugAdmin = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT * FROM drug', (err, rows) => {
            connection.release()

            if (!err) {
                res.render('adminDrug', { rows })
            } else {
                console.log(err)
            }
        })
    })
}
exports.findDrug = (req, res) => {
    db.getConnection((err, connection) => {
        let searchItem = req.body.searchDrug;
        connection.query('SELECT * FROM drug WHERE title LIKE ?', ['%' + searchItem + '%'], (err, rows) => {
            connection.release()

            if (!err) {
                res.render('adminDrug', { rows })
            } else {
                console.log(err)
            }
        })
    })
}
exports.formDrug = (req, res) => {
    res.render("add-drug")
}

exports.addDrug = (req, res) => {
    const { titleDrug, subtitleDrug, descriptionDrug, imgDrug } = req.body
    db.getConnection((err, connection) => {
        if (err) throw err
        connection.query('INSERT INTO drug (description, img, title, subtitle) VALUES  (?, ?, ?, ?)',
            [descriptionDrug, imgDrug, titleDrug, subtitleDrug],
            (err, rows) => {
                connection.release()
                if (!err) {
                    res.render('add-drug', { alert: "Препарат успешно добавлен" })
                } else {
                    console.log(err)
                }
            })
    })
}


exports.editDrug = (req, res) => {
    db.getConnection((err, connection) => {
        connection.query('SELECT * FROM drug WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                res.render('editDrug', { rows })
            } else {
                console.log(err)
            }
        })
    })
}

//UPDATE drone
exports.updateDrug = (req, res) => {
    const { titleDrug, descriptionDrug, imgDrug, subtitleDrug } = req.body
    db.getConnection((err, connection) => {
        if (err) throw err
        connection.query('UPDATE drug SET description = ?, img = ?, title = ?, subtitle = ? WHERE id = ?', [descriptionDrug, imgDrug, titleDrug, subtitleDrug, req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                db.getConnection((err, connection) => {
                    connection.query('SELECT * FROM drug WHERE id = ?', [req.params.id], (err, rows) => {
                        connection.release()
                        if (!err) {
                            res.render('editDrug', { alert: `${subtitleDrug} был обновлён` })
                        } else {
                            console.log(err)
                        }
                    })
                })

            } else {
                console.log(err)
            }
        })
    })
}

exports.deleteDrug = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err
        connection.query("DELETE FROM drug WHERE id = ?", [req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                res.redirect('/add-drug')
            } else {
                console.log(err)
            }
        })
    })
}
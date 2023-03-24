const mysql = require('mysql2')

const db = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'agroscoutdb'
})

exports.allview = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err
        // console.log('Connected as Id' + connection.threadId)

        connection.query('SELECT * FROM drone', (err, rows) => {
            connection.release()

            if (!err) {
                res.render('catalog', { rows })
            } else {
                console.log(err)
            }

            //console.log("The data from drone table: \n", rows)
        })
    })
}

exports.addItemToBusket = (req, res) => {
    const { imgBusket, titleBusket, priceBusket, quantity } = req.body

    db.getConnection((err, connection) => {
        if (err) throw err
        connection.query("INSERT INTO busket (title, price, busketInstock, imgBusketDrone) VALUES (?, ?, ?, ?)", [titleBusket, priceBusket, quantity, imgBusket], (err, rows) => {
            connection.release()
            if (!err) {
                res.redirect('busket')
            } else {
                console.log(err)
            }
        })
    })

}

exports.view = (req, res) => {

    db.getConnection((err, connection) => {
        if (err) throw err
        console.log('Connected as Id' + connection.threadId)

        connection.query('SELECT * FROM drone', (err, rows) => {

            if (!err) {
                res.render('admin', { rows })
            } else {
                console.log(err)
            }

            console.log("The data from drone table: \n", rows)
        })
    })
}

exports.find = (req, res) => {
    db.getConnection((err, connection) => {
        let searchItem = req.body.search;
        connection.query('SELECT * FROM drone WHERE titleDrone LIKE ?', ['%' + searchItem + '%'], (err, rows) => {
            connection.release()

            if (!err) {
                res.render('admin', { rows })
            } else {
                console.log(err)
            }
        })
    })
}

exports.form = (req, res) => {
    res.render('add-user')
}

exports.create = (req, res) => {
    const { titleDrone, brandDrone, modelDrone, instockDrone, priceDrone, imgDrone } = req.body
    db.getConnection((err, connection) => {
        if (err) throw err
        connection.query('INSERT INTO drone (titleDrone, brand, model, instock, price, imgDrone) VALUES  (?, ?, ?, ?, ?, ?)',
            [titleDrone, brandDrone, modelDrone, instockDrone, priceDrone, imgDrone],
            (err, rows) => {
                connection.release()
                if (!err) {
                    res.render('add-user', { alert: "Дрон успешно добавлен" })
                } else {
                    console.log(err)
                }
            })
    })
}

exports.edit = (req, res) => {
    db.getConnection((err, connection) => {
        connection.query('SELECT * FROM drone WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                res.render('edit', { rows })
            } else {
                console.log(err)
            }
        })
    })
}

//UPDATE drone
exports.update = (req, res) => {
    const { titleDrone, brandDrone, modelDrone, instockDrone, priceDrone, imgDrone } = req.body
    db.getConnection((err, connection) => {
        if (err) throw err
        connection.query('UPDATE drone SET titleDrone = ?, brand = ?, model = ?, instock = ?, price = ?, imgDrone = ? WHERE id = ?', [titleDrone, brandDrone, modelDrone, instockDrone, priceDrone, imgDrone, req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                db.getConnection((err, connection) => {
                    connection.query('SELECT * FROM drone WHERE id = ?', [req.params.id], (err, rows) => {
                        connection.release()
                        if (!err) {
                            res.render('edit', { alert: `${titleDrone} был обновлён` })
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

exports.deleteDrone = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err
        connection.query("DELETE FROM drone WHERE id = ?", [req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                res.redirect('/admin')
            } else {
                console.log(err)
            }
        })
    })
}

exports.home = (req, res) => {
    res.render("index")
}

const mysql = require("mysql2")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { application } = require("express")

const db = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'agroscoutdb'
})



exports.page = (req, res) => {
    res.render("login", { session: req.session })
}

exports.correctSignUp = (req, res) => {
    const { email, firstName, lastName, passUser, passConfirm } = req.body
    db.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT email FROM user WHERE email = ?', [email], async (err, results) => {
            connection.release()
            if (results.length > 0) {
                res.render("login", { alert: "Это почта уже используется" })
            } else if (passUser !== passConfirm) {
                res.render("login", { alert: "Пароль не совпадает" })
            }
            let salt = await bcrypt.genSaltSync(6)
            let hashedPassword = await bcrypt.hashSync(passUser, salt)

            connection.query('INSERT INTO user SET email = ?, firstName = ?, lastName = ?, passUser = ?', [email, firstName, lastName, hashedPassword], (err, results) => {
                connection.release()
                if (!err) {
                    res.redirect("home")
                } else {
                    console.log(err)
                }
            })
        })
    })
}

exports.logIn = async (req, res) => {

    db.query("SELECT * FROM user WHERE firstName = ?", [req.body.loginName], (err, results) => {
        if (err) throw err
        const isPasswordCorrect = bcrypt.compareSync(req.body.loginPassword, results[0].passUser)
        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong username or password")
        }
        const token = jwt.sign({ id: results[0].id }, "jwtkey")

        const { passUser, ...other } = results[0]
        res.cookie("access_token", token, {
            httpOnly: true
        })
        if (!err) {
            res.render("admin")
        } else {
            console.log(err)
        }
    })
}
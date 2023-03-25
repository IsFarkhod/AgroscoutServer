const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')
const cookieParser = require("cookie-parser")
const routesDrone = require('../routes/drone')
const routesUser = require('../routes/user')
const routesBusket = require('../routes/busket')
const routesDrug = require("../routes/drug")
//const dotenv = require('dotenv').config()

const app = express()

app.use(express.static(__dirname + '/public'))


app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    layoutsDir: 'views/layouts',
    defaultLayout: 'main'
}))
app.set('view engine', 'hbs')

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use('/', routesDrone)
app.use('/', routesUser)
app.use('/', routesBusket)
app.use("/drug", routesDrug)

const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

app.get("/drones", (req, res) => {
    const sqlReq = "SELECT * FROM drone"
    db.query(sqlReq, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("", (req, res) => {
    res.render("login.hbs")
})


app.listen(8080, () => {
    console.log("connected to server")
})
import mysql from "mysql2"

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'agroscoutdb'
})

const drone = [
    ["Агродрон AGR A22", "AGR"],
    ["Дрон- Картограф STS M8", "STS"]
]

const sqlReq = `INSERT INTO drone(brand, title) VALUES(?)`

db.query("SELECT * FROM drone",
    function (err, results, fields) {
        //console.log(err);
        console.log(results); // собственно данные
        //console.log(fields); // мета-данные полей
    });

db.query(sqlReq, [drone], function (err, results) {
    if (err) console.log(err)
    else console.log(results)
})

/*---- GET ALL DRONES -----*/
//app.get("/drones", (req, res) => {
//    const q = "SELECT * FROM drone"
//    console.log(db.)
//})
//
//app.post("/id:", (req, res) => {
//
//})
//
//app.listen(8800, () => {
//    console.log("Connected to server!")
//})
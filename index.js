const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'practice',
    password: 'Atharva@2004'
});

app.get("/", (req, res) => {
    res.send("Request working");
});

app.get("/student", (req, res) => {
    q = 'SELECT * FROM student';
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let stds = result;
            res.render('student.ejs', { stds });
        })
    } catch (err) {
        console.log(err);
    }

});

app.get("/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/student", (req, res) => {
    let { id, name, email, contact, birthdate, grade, remark } = req.body;
    let q = `INSERT INTO student (id, name, email, contact, birthdate, grade, remark) VALUES (?,?,?,?,?,?,?)`;
    newstd = [id, name, email, contact, birthdate, grade, remark];

    try {
        connection.query(q, newstd, (err, result) => {
            if (err) throw err;
            res.redirect("/student");
        })
    } catch (err) {
        console.log(err);
    }

})


app.listen(port, () => {
    console.log("App running on port 8080");
});

// try {
//     connection.query(q, [data], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     })
// } catch (err) {
//     console.log(err);
// }
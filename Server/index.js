//Dependencies
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')

const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Databases
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'capstone123',
    database: 'capstonetest',
});

const db2 = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'capstone123',
    database: 'capstoneloginsystem',
})


//Routes to Login
app.post("/register", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }
        db2.query("INSERT INTO accounts (username, password) VALUES (?, ?)", [username, hash],
            (err, result) => {
                console.log(err);
            });
    })




});


app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db2.query("SELECT * FROM accounts WHERE username = ?",
        username,
        (err, result) => {

            if (err) {
                console.log(err);
                res.send({ err: err })
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        res.send(result)
                    } else {
                        res.send({ message: "Wrong username/password " })
                    }
                })
            } else {
                res.send({ message: "User doesn't exist" })
            }


        });
})

//Routes to Forms
app.post("/create", (req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const gender = req.body.gender;
    const email = req.body.email;
    const contact = req.body.contact;
    const address = req.body.address;

    const sqlInsert = "INSERT INTO applicants (name, gender, email, contact, address) VALUES (?,?,?,?,?)"
    db.query(sqlInsert, [name, gender, email, contact, address],
        (err, result) => { });
});

app.get("/applicant", (req, res) => {
    db.query("SELECT * FROM applicants", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    });
});

app.put('/update', (req, res) => {
    const applicantsId = req.body.applicantsId;
    const name = req.body.name;
    db.query("UPDATE applicants SET name = ? WHERE applicantsId = ?", [name, applicantsId],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.delete('/delete/:applicantsId', (req, res) => {
    const applicantsId = req.params.applicantsId
    db.query("DELETE FROM applicants WHERE applicantsId = ?", applicantsId, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})


//Endpoint & Logging
app.listen(3001, () => {
    console.log('Server running on port 3001');
});





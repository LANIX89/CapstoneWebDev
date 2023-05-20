const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'capstone123',
    database: 'capstonetest',
});

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

app.listen(3001, () => {
    console.log('Server running on port 3001');
});





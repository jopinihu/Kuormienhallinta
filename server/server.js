const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

// Set database paramets

const db = mysql.createPool({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "password",
  database: "keskimaki",
});

const port = 3008;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Get data in database
app.get("/api/get/", (req, res) => {
  const sqlGet = "SELECT * FROM loads";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

// Add data to database
app.post("/api/insert/", (req, res) => {
  const { sender, recipient, product, vehicle, number, mass } = req.body;
  const sqlInsert =
    "INSERT INTO loads (sender, recipient, product, vehicle, number, mass) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [sender, recipient, product, vehicle, number, mass],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

// Delete row in table
app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlDelete = "DELETE FROM loads WHERE id = ?";
  db.query(sqlDelete, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM loads where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
// Update database.

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { sender, recipient, product, vehicle, number, mass } = req.body;
  const sqlUpdate =
    "UPDATE loads SET sender = ?, recipient = ?, product = ?, vehicle = ?, number = ?, mass = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [sender, recipient, product, vehicle, number, mass, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Server running on port", port);
});

// npm init
//  npm run dev käynnistää console.login
// npm install cors body-parser express nodemon mysql

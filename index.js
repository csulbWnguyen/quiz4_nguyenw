const express = require("express");
const app = express();
const path = require("path");
const {Pool} = require("pg");
require(`dotenv`).config();

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized:false
  }
});

app.listen(3000,()=>{ {
    console.log("Server started (http://localhost:3000/) !");
}});

app.set("view engine", "ejs");
app.set("views", path.join( __dirname + "/views"));
app.use(express.static(path.join(__dirname,"public")));
app.get("/", (req, res) => { {
    //res.send("Hello world...");
    res.render("index");
}});
app.get("/about", (req, res) => {
    res.render("about");
  });
app.get("/data", (req, res) => {
    const test = {
      title: "Test",
      items: ["one", "two", "three"]
    };
    res.render("data", { model: test });
  });

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM Books ORDER BY Title"
  pool.query(sql, [], (err, result) => {
    if (err) {
      return console.error(err.message);
      }
      res.render("books", { model: result.rows });
    });
});

/// Connecting to PostgreSQL database 

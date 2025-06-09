require('dotenv').config();

const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello, World! bhai gaurav");
});

app.get('/run', (req,res) => {
  res.send("i am fine and what u doing")
});

app.get ("/login", (req,res) => {
  res.send("login page")
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


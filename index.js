require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const path = require("./index.html")
const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI, {
      useNewUrlParser: true,      
      useUnifiedTopology: true,  
    });
    console.log("MongoDB Connected Successfully!");

  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  };
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server because of MongoDB connection error.");
  });

app.get("/", (req, res) => {
  res.send("Hello, World! bhai gaurav");
});

app.get('/run', (req, res) => {
  res.send("i am fine and what u doing");
});

app.get("/login", (req, res) => {
  res.send("login page");
});
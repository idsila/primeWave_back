require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

const DB = require("./connectDB.js");
const dataBase = DB.connect('prime_wave_bot');
const orderBase = DB.connect('orders_prime_wave_bot');

const URL_BOT = process.env.URL_BOT;


app.use(cors({ methods: ["GET", "POST"] }));
app.use(express.json());




app.listen(3001, (err) => {
  err ? err : console.log("STARTED SERVER"); 
});

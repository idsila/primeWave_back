require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

const dataBase = require("./dataBase.js")
const orderBase = require("./orderBase.js")
const URL_BOT = process.env.URL_BOT;


app.use(cors({ methods: ["GET", "POST"] }));
app.use(express.json());


app.post("/pay", async (req, res) => {
  const update = req.body;
  console.log(req.body);
  if (update.update_type === "invoice_paid") {
    console.log("💸 Оплата прошла!");
    const invoice = update.payload;
    const currentAmount = (update.payload.amount*1);
    orderBase.findOne({ invoice_id: invoice.invoice_id }).then((res_2) => {
      if (res_2){
        axios.post(`${URL_BOT}/send-user`, { id: res_2.id,
          msg:`<b>🎉 Ваш чек #${invoice.invoice_id}</b>
<blockquote><b>💸 Вам начисленно:</b> ${currentAmount}₽</blockquote>
    `}, {  headers: { 'Content-Type':'application/json' } });
        dataBase.updateOne({ id: res_2.id }, { $inc: { balance: currentAmount } });
      }
    })
    
    
  }
  
  res.send({ message: "Hello World" });
});




app.listen(3001, (err) => {
  err ? err : console.log("STARTED SERVER"); 
});

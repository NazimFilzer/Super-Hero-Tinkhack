//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const _ = require("lodash");
const mongoose = require("mongoose");
const Contact = require("./models/contact");
const { response } = require("express");
require('dotenv').config()


mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

const app = express();

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/home", function (req, res) {

  res.render("home");

});


app.get("/powers", function (req, res) {
  res.render("powers");
});

app.get("/merch", function (req, res) {
  res.render("merch");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.post("/contact", async function (req, res) {
  person = req.body.person;
  phone = req.body.phone;
  area = req.body.area;
  problem = req.body.problem;


  const data = await Contact.create({ person, phone,area,problem });
  console.log(data);

  res.redirect("/home");

});



app.get("/responce",async(req,res)=>{
  
    Contact.find({},(err,response)=>{
      res.send(response);
      console.log(response)
    })
    // let responces = await Contact.find();
    // console.log(responces)
//     res.json({
//       person:data.person,
//       phone:data.phone,
//       area:data.area,
//       problem:data.problem
// })
  
})



app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});

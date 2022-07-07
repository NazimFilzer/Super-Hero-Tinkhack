//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const Contact = require("./models/contact")

mongoose.connect("mongodb://localhost:27017/contactDB").then(
  console.log("DB Connected")
)


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let posts = [];


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

  res.redirect("/");

});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});

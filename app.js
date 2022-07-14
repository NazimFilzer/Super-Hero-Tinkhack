require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const _ = require("lodash");
const mongoose = require("mongoose");
const Contact = require("./models/contact");
const Auth = require("./models/auth");
const { response } = require("express");
const geolocation = require('geolocation');
const cors = require('cors');


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

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", function (req, res) {

  res.render("home", { style: "homestyle.css" });

});

app.get("/powers", function (req, res) {
  res.render("powers", { style: "style.css" });
});

app.get("/merch", function (req, res) {
  res.render("merch", { style: "style.css" });
});

app.get("/contact", function (req, res) {
  res.render("contact", { style: "contact.css" });
});

app.post("/contact", async function (req, res) {

  try {
    const { person, phone, area, problem } = req.body

    const data = await Contact.create({ person, phone, area, problem });
    console.log(data);
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
  }

});

app.get("/login", (req, res) => {
  res.render("login", { style: "login.css" })

})

app.post("/login", async (req, res) => {
  console.log(req.body);

  try {
    const user = await Auth.findOne({ username: req.body.username });
    if (user) {
      if (user.password == req.body.password) {
        res.redirect("/response")

      } else {
        res.send("Password is Incorrect, Please Goback and retry")
      }
    } else {
      res.send("User not found,Please Go back and retry")
    }
  } catch (err) {
    console.log(err);
  }
})

app.get("/response", async (req, res) => {
  Contact.find({}, (err, response) => {
    res.render("response", { response, style: "response.css" });
  })

})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
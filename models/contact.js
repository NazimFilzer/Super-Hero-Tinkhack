const mongoose=require("mongoose");

const contactSchema= new mongoose.Schema({
    person: String,
    phone: Number,
    area: String,
    problem: String

})

const Contact= mongoose.model("Contact",contactSchema)

module.exports = Contact;
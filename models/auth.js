const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
})



const Auth = mongoose.model("Auth", authSchema)

module.exports = Auth;
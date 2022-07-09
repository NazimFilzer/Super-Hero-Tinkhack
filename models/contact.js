const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder")

const contactSchema = new mongoose.Schema({
    person: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    area: {
        type: String,
    },

    problem: {
        type: String,
        required: true
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

//

contactSchema.pre("save", async function (next) {
    const loc = await geocoder.geocode(this.area);
    // console.log(loc);
    this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };
    console.log("The location is Stored");
    next();
})

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact;
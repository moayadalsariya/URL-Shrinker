const mongo = require("mongoose");
const shortId = require("shortid");
const moment = require("moment");

const shortUrlShcema = new mongo.Schema({
    full: {
        type: String,
        require: true
    },
    short: {
        type: String,
        require: true,
        default: shortId.generate()
    },
    clicks: {
        type: Number,
        require: true,
        default: 0

    },
    created: {
        type: Date,
        require: true,
        default: Date.now()
    }
})

module.exports = mongo.model("ShortUrl", shortUrlShcema);
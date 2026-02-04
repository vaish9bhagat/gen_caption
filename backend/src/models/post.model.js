const mongoose = require("mongoose");

const postschema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"

    }],
    location: {
        type: String,

    }
})

const postmodel = mongoose.model("posts", postschema);
module.exports = postmodel;
const { model, Schema } = require("mongoose");

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    conference: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    wins: {
        type: Number,
        required: true,
        min: 0
    },
    losses: {
        type: Number,
        required: true,
        min: 0
    },
    logo: {
        type: String,
        required: false,
        default: ""
    }
});

teamSchema.set("toJSON", {
    transform: (document, teamToJSON) => {
        teamToJSON.id = teamToJSON._id.toString();
        delete teamToJSON._id;
        delete teamToJSON.__v;
    }
});

module.exports = model("Team", teamSchema);
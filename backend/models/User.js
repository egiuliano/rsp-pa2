const {model, Schema} = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passHash: {
        type: String,
        required: true
    }
});

userSchema.set("toJSON", {
    transform: (document, userToJSON) => {
        userToJSON.id = userToJSON._id.toString();
        delete userToJSON._id;
        delete userToJSON.passHash;
        delete userToJSON.__v;
    }
});

module.exports = model("User", userSchema);
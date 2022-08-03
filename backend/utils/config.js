require("dotenv").config();

const DB_URI = process.env.DB_URI;

const PORT = process.env.PORT;

const SECRET = process.env.SECRET;

module.exports = {
    DB_URI,
    PORT,
    SECRET
};
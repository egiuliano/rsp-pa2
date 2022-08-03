const { connect } = require('mongoose');
const { DB_URI } = require("../utils/config");

const conectarBD = async () => {
    connect(DB_URI);
};

conectarBD()
.then(result => console.log("MongoDB connected"))
.catch(err => console.log(err));
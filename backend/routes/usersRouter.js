const usersRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
// const { verifyToken } = require("../utils/middleware");

//POST login
usersRouter.post("/login", async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const validPass = user === null ? false : await bcrypt.compare(password, user.passHash);
        if (!(user && validPass)) {
            return next({ name:"ValidationError", message:"Email or password incorrect" });
        }
        const userToken = {
            username: user.username,
            id: user._id
        }
        const token = await jwt.sign(userToken, SECRET, { expiresIn: '120s' });
        res.status(200).json({
            token,
            username
        });
    } catch(error) {
        next(error);
    }
});

//POST signup
usersRouter.post("/signup", async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const passHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username, passHash
        });
        const userCreated = await newUser.save();
        res.status(201).json(userCreated);
    }catch(error){
        next(error);
    }
});

//GET all users
// teamsRouter.use(verifyToken);
// usersRouter.get("/", (req, res, next) => {
//     User.find({})
//     .then(users => res.json(users))
//     .catch(err => next(err));
// });


module.exports = { usersRouter };
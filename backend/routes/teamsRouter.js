const teamsRouter = require("express").Router();
const Team = require("../models/Team");
const { verifyToken } = require("../utils/middleware");

teamsRouter.use(verifyToken);

//GET all teams
teamsRouter.get("/", (req, res, next) => {
    Team.find({})
    .then(teams => res.json(teams))
    .catch(err => next(err));
});

//GET team by id
teamsRouter.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Team.findById(id)
    .then(team => team?res.json(team):res.status(404).end)
    .catch(err => next(err));
});

//Create team
teamsRouter.post("/", (req, res, next) => {
    const { name, city, conference, color, wins, losses, logo } = req.body;
    const newTeam = new Team({
        name, city, conference, color, wins, losses, logo
    });
    newTeam.save()
    .then(team => res.json(team))
    .catch(err => next(err));
});

//Delete team by id
teamsRouter.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Team.findByIdAndRemove(id)
    .then(result => result?res.status(204).end():res.status(404).end());
});

//Update team by id
teamsRouter.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const { name, city, conference, color, wins, losses, logo } = req.body;
    const teamDetail = { name, city, conference, color, wins, losses, logo };
    Team.findByIdAndUpdate(id, teamDetail, {new: true})
    .then(team => team?res.json(team):res.status(400).end())
    .catch(err => next(err));
});

module.exports = { teamsRouter };
const express = require("express");
const router = express.Router();

const competitionController = require("../controllers/competitionController");

router.get("/", competitionController.getCompetitions);

router.post("/create", competitionController.createCompetition);

router.post("/join/:id", competitionController.joinCompetition);

router.post("/start/:id", competitionController.startCompetition);

router.post("/save-answer", competitionController.saveAnswer);

router.post("/submit/:id", competitionController.submitCompetition);

router.get("/leaderboard/:id", competitionController.getLeaderboard);

module.exports = router;
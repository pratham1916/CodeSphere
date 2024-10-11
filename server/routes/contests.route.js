const express = require("express");
const { ContestsModel } = require("../models/contests.modal");
const { auth } = require("../middleware/auth.middleware");
const { access } = require("../middleware/access.middleware");
const contestsRouter = express.Router();

// Add Contest
contestsRouter.post("/add", auth, access(["admin"]), async(req, res) => {
    try {
        const contest = new ContestsModel(req.body);
        await contest.save();
        res.status(200).send({ msg: "New Contest Added." });
    } catch (err) {
        res.status(400).send({ msg: "Bad Request." });
    }
});

contestsRouter.get("/:contestId", async(req, res) => {
    const { contestId } = req.params;
    try {
        const contest = await ContestsModel.findOne({
            _id: contestId,
        });
        res.status(200).send({ contest });
    } catch (err) {
        res.status(400).send({ msg: "Bad Request." });
    }
});

contestsRouter.get("/", async(req, res) => {
    try {
        const contests = await ContestsModel.find();
        res.status(200).send({ contests });
    } catch (err) {
        res.status(400).send({ msg: "Bad Request." });
    }
});

// Update Contest
contestsRouter.patch("/:contestId", auth, access(["admin"]), async(req, res) => {
    const { contestId } = req.params;
    try {
        const contest = await ContestsModel.findOne({ _id: contestId });
        if (contest.userID === req.body.userID) {
            await ContestsModel.findByIdAndUpdate({ _id: contestId }, req.body);
            res.status(200).send({ msg: `The contest with ID:${contestId} has been updated.` });
        } else {
            res.status(400).send({ msg: "You are not authorised." });
        }
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

// Delete Contest
contestsRouter.delete("/:contestId", auth, access(["admin"]), async(req, res) => {
    const { contestId } = req.params;
    try {
        const contest = await ContestsModel.findOne({ _id: contestId });
        if (contest.userID === req.body.userID) {
            await ContestsModel.findByIdAndDelete({ _id: contestId });
            res.status(200).send({ msg: `The contest with ID:${contestId} has been deleted.` });
        } else {
            res.status(400).send({ msg: "You are not authorised." });
        }
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

module.exports = {
    contestsRouter,
};
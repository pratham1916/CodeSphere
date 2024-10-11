const express = require("express");

const { submissionModel } = require("../models/submission.model")
const { auth } = require("../middleware/auth.middleware");
const { access } = require("../middleware/access.middleware");
const submissionRouter = express.Router();


// Add Question
submissionRouter.post("/add", auth, access(["admin"]), async(req, res) => {
    try {
        const note = new submissionModel(req.body);
        await note.save();
        res.status(200).send({ msg: "New solution Added." });
    } catch (err) {
        // console.log("Error:", err);
        res.status(400).send({ msg: "Bad Request." });
    }
});

module.exports = {
    submissionRouter
}
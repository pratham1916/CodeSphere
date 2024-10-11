const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    testCases: [
      {
        inp: { type: String },
        oup: { type: String },
      },
    ],
    points: { type: Number, default: 0 },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
    topics: [{ type: String }],
    constraints: [{ type: String }],
  },
  {
    versionKey: false,
  }
);

const QuestionModel = mongoose.model("questions", questionSchema);

module.exports = {
  QuestionModel,
};




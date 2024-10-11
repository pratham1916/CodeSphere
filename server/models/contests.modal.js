const mongoose = require("mongoose");

const contestSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    questions: {
      type: [
        {
          qstId: String,
          qstTitle: String,
          difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
        },
      ],
    },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  },
  {
    versionKey: false,
  }
);

const ContestsModel = mongoose.model("contests", contestSchema);

module.exports = {
  ContestsModel,
};


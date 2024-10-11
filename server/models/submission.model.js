const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema(
  {
    questionID: { type: String },
    code: { type: String },
    userID: { type: String },
    title: { type: String },
    results: [{ testcase: String, expe: String, out: String, pass: Boolean }],
  },

  {
    versionKey: false,
  }
);

const submissionModel = mongoose.model("submissions", submissionSchema);

module.exports = {
  submissionModel,
};


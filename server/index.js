const express = require('express');
const { connection } = require('./config/db');
const cors = require("cors");
const { contestsRouter } = require('./routes/contests.route');
const { userRouter } = require('./routes/user.route');
const { questionRouter } = require('./routes/question.route');
const { compileRouter } = require('./routes/compiler.route');
const { QuestionModel } = require('./models/question.model');
const { auth } = require('./middleware/auth.middleware');
const { submissionRouter } = require('./routes/submission.route');

require('dotenv').config();
const port = process.env.port;




const app = express();

app.use(express.json());
app.use(cors());
app.use("/contests", contestsRouter);
app.use("/users", userRouter);
app.use("/questions", questionRouter);
app.use("/compile", compileRouter);
app.use("/submission", submissionRouter)

// Define a route
app.get('/', (req, res) => {
    res.send('This is home routes');
});

app.get("/questions", auth, async(req, res) => {
    const questions = await QuestionModel.find();
    res.status(200).send({ questions });
});

// Start the server
app.listen(port, async() => {
    try {
        await connection
        console.log('Connected to Database');
        console.log(`Server is listening at http://localhost:${port}`);
    } catch (error) {
        console.log(error);
    }
});
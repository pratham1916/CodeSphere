const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const app = express();
const fs = require("fs");
app.use(bodyParser.json());
const path = require("path");
const readline = require("readline");
const { QuestionModel } = require("../models/question.model");

const compileRouter = express.Router();

compileRouter.post("/solve", async(req, res) => {
    let { language, code, customInput } = req.body;
    const testCaseOP = [];
    switch (language) {
        case "java":
            {
                const errors = [];
                try {
                    fs.writeFile("main.java", code, (err) => {
                        if (err) {
                            errors.push({ err });
                            res.status(500).json({ error: "Error writing Java file" });
                            return;
                        } else {
                            try {
                                exec("javac main.java", (err, stdout, stderr) => {
                                    if (err) {
                                        res
                                            .status(500)
                                            .json({ error: "Compilation error", err, stderr, stdout });
                                        return;
                                    } else {
                                        customInput = customInput.replaceAll("\n", " ");
                                        try {
                                            exec(
                                                `echo $ { customInput } | java main`,
                                                (err, stdout, stderr) => {
                                                    if (err) {
                                                        errors.push({ err });
                                                        res.status(500).json({
                                                            error: "Execution error",
                                                            stderr,
                                                            stdout,
                                                        });
                                                        return;
                                                    } else {
                                                        if (customInput) {
                                                            testCaseOP.push({
                                                                language: "Java",
                                                                output: stdout,
                                                            });
                                                        } else {
                                                            testCaseOP.push({
                                                                language: "Java",
                                                                output: "",
                                                            });
                                                        }
                                                        res.send({
                                                            language: "Java",
                                                            output: testCaseOP,
                                                        });
                                                        return;
                                                    }
                                                }
                                            );
                                        } catch (error) {
                                            errors.push({ error });
                                        }
                                    }
                                });
                            } catch (error) {
                                errors.push({ error });
                            }
                        }
                    });
                } catch (error) {
                    errors.push({ error });
                }
                return;
            }
        case "python":
            {
                fs.writeFile("python.py", code, (err) => {
                    if (err) {
                        res.status(500).json({ error: "Error writing Python file" });
                        return;
                    }
                    const inputs = customInput.split(" ");
                    const processssss = exec(`python python.py`, (err, stdout, stderr) => {
                        if (err) {
                            res.status(500).json({ error: "Execution error", stderr });
                            return;
                        }
                        testCaseOP.push({
                            language: "python",
                            output: stdout,
                        });
                        res.send({
                            language: "python",
                            output: testCaseOP,
                        });
                        return;
                    });
                    inputs.forEach((input) => {
                        processssss.stdin.write(input + "\n");
                    });
                    processssss.stdin.end();
                });
                return;
            }
        case "javascript":
            {
                try {
                    const code = req.body.code;
                    const inputs = customInput;

                    let logOutput = "";
                    const originalLog = console.log;
                    const result = await eval(code, inputs);
                    testCaseOP.push({
                        input: inputs,
                        log: logOutput,
                    });
                    res.status(200).json(testCaseOP);
                } catch (err) {
                    res.status(500).json({ error: "Execution error", stderr: err.message });
                }
            }
    }
});

compileRouter.post("/submit", async(req, res) => {
    let { language, code, customInput, questionId } = req.body;
    const question = await QuestionModel.findOne({
        _id: questionId,
    });
    const errors = [];
    const testCaseOP = [];
    switch (language) {
        case "java":
            {
                try {
                    fs.writeFile("main.java", code, (err) => {
                        if (err) {
                            errors.push({ err });
                            res.status(500).json({ error: "Error writing Java file" });
                            return;
                        } else {
                            try {
                                exec("javac main.java", (err, stdout, stderr) => {
                                    if (err) {
                                        res
                                            .status(500)
                                            .json({ error: "Compilation error", err, stderr, stdout });
                                        return;
                                    } else {
                                        for (let i = 0; i < question.testCases.length; i++) {
                                            customInput = question.testCases[i].inp;
                                            customInput = customInput.replaceAll("\n", " ");
                                            try {
                                                exec(
                                                    `echo $ { customInput } | java main`,
                                                    (err, stdout, stderr) => {
                                                        if (err) {
                                                            errors.push({ err });
                                                            res.status(500).json({
                                                                error: "Execution error",
                                                                stderr,
                                                                stdout,
                                                            });
                                                            return;
                                                        } else {
                                                            testCaseOP.push({
                                                                language: "Java",
                                                                output: stdout,
                                                                inp: question.testCases[i].inp,
                                                            });
                                                            if (
                                                                testCaseOP.length == question.testCases.length
                                                            ) {
                                                                res.send({
                                                                    language: "Java",
                                                                    output: testCaseOP,
                                                                });
                                                            } else if (errors.length > 1) {
                                                                res.send(errors);
                                                            }
                                                        }
                                                    }
                                                );
                                            } catch (error) {
                                                errors.push({ error });
                                            }
                                        }
                                    }
                                });
                            } catch (error) {
                                errors.push({ error });
                            }
                        }
                    });
                } catch (error) {
                    errors.push({ error });
                }
                return;
            }
        case "python":
            {
                let responseSent = false;
                try {
                    fs.writeFile("python.py", code, (err) => {
                        if (err) {
                            errors.push({ error: "Error writing Python file" });
                            res.status(500).json({ error: "Error writing Python file" });
                            return;
                        } else {
                            try {
                                for (var i = 0; i < question.testCases.length; i++) {
                                    const inputs = question.testCases[i].inp.split(" ");
                                    const processssss = exec(
                                        `python python.py`,
                                        (err, stdout, stderr) => {
                                            if (err) {
                                                errors.push({ error: "Execution error", stderr });
                                            }
                                            testCaseOP.push({ language: "Python", output: stdout });
                                            if (testCaseOP.length == question.testCases.length) {
                                                res.send({ language: "Python", output: testCaseOP });
                                                responseSent = true;
                                                return;
                                            } else if (
                                                errors.length == question.testCases.length &&
                                                !responseSent
                                            ) {
                                                res.send(errors);
                                            }
                                        }
                                    );
                                    inputs.forEach((input) => {
                                        processssss.stdin.write(input + "\n");
                                    });
                                    processssss.stdin.end();
                                }
                            } catch (error) {
                                errors.push({ error });
                            }
                        }
                    });
                } catch (error) {
                    errors.push({ error });
                }
                return;
            }
        case "javascript":
            {
                try {
                    const result = await eval(code);
                    res.send({ language: "JavaScript", output: result });
                } catch (err) {
                    //console.error(err);
                    res.status(500).json({ error: "Execution error", stderr: err.message });
                }
                return;
            }
        default:
            {
                res.send({ msg: "Please select language" });
                return;
            }
    }
});

compileRouter.post("/submit222222222", async(req, res) => {
    let { language, code, customInput, questionId } = req.body;
    const question = await QuestionModel.findOne({
        _id: questionId,
    });
    const errors = [];
    const testCaseOP = [];
    let resultOutput = [];
    switch (language) {
        case "java":
            {
                try {
                    fs.writeFile("main.java", code, (err) => {
                        if (err) {
                            errors.push({ err });
                            res.status(500).json({ error: "Error writing Java file" });
                            return;
                        } else {
                            try {
                                exec("javac main.java", (err, stdout, stderr) => {
                                    if (err) {
                                        res
                                            .status(500)
                                            .json({ error: "Compilation error", err, stderr, stdout });
                                        return;
                                    } else {
                                        for (let i = 0; i < question.testCases.length; i++) {
                                            customInput = question.testCases[i].inp;
                                            customInput = customInput.replaceAll("\n", " ");
                                            try {
                                                exec(
                                                    `echo $ { customInput } | java main`,
                                                    (err, stdout, stderr) => {
                                                        if (err) {
                                                            errors.push({ err });
                                                            res.status(500).json({
                                                                error: "Execution error",
                                                                stderr,
                                                                stdout,
                                                            });
                                                            return;
                                                        } else {
                                                            testCaseOP.push({
                                                                language: "Java",
                                                                output: stdout,
                                                                inp: question.testCases[i].inp,
                                                            });

                                                            resultOutput.push({
                                                                inp: question.testCases[i].inp,
                                                                expe: question.testCases[i].oup,
                                                                stdout,
                                                            });
                                                            if (
                                                                testCaseOP.length == question.testCases.length
                                                            ) {
                                                                res.send({

                                                                    output: resultOutput,
                                                                });
                                                            } else if (errors.length > 1) {
                                                                res.send(errors);
                                                            }
                                                        }
                                                    }
                                                );
                                            } catch (error) {
                                                errors.push({ error });
                                            }
                                        }
                                    }
                                });
                            } catch (error) {
                                errors.push({ error });
                            }
                        }
                    });
                } catch (error) {
                    errors.push({ error });
                }
                return;
            }
        case "python":
            {
                let responseSent = false;
                try {
                    fs.writeFile("python.py", code, (err) => {
                        if (err) {
                            errors.push({ error: "Error writing Python file" });
                            res.status(500).json({ error: "Error writing Python file" });
                            return;
                        } else {
                            try {
                                for (var i = 0; i < question.testCases.length; i++) {
                                    const inputs = question.testCases[i].inp.split(" ");
                                    const processssss = exec(
                                        `python python.py`,
                                        (err, stdout, stderr) => {
                                            if (err) {
                                                errors.push({ error: "Execution error", stderr });
                                            }
                                            testCaseOP.push({ language: "Python", output: stdout });
                                            if (testCaseOP.length == question.testCases.length) {
                                                res.send({ language: "Python", output: testCaseOP });
                                                responseSent = true;
                                                return;
                                            } else if (
                                                errors.length == question.testCases.length &&
                                                !responseSent
                                            ) {
                                                res.send(errors);
                                            }
                                        }
                                    );
                                    inputs.forEach((input) => {
                                        processssss.stdin.write(input + "\n");
                                    });
                                    processssss.stdin.end();
                                }
                            } catch (error) {
                                errors.push({ error });
                            }
                        }
                    });
                } catch (error) {
                    errors.push({ error });
                }
                return;
            }
        case "javascript":
            {
                try {
                    const result = await eval(code);
                    res.send({ language: "JavaScript", output: result });
                } catch (err) {
                    res.status(500).json({ error: "Execution error", stderr: err.message });
                }
                return;
            }
        default:
            {
                res.send({ msg: "Please select language" });
                return;
            }
    }
});

module.exports = { compileRouter  };
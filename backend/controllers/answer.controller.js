import Question from "../models/question.model.js";

// GET /questions/:id/answers
export const getAnswers = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    const answers = question.answer.map((ans) => ({
      id: ans._id,
      content: ans.answerBody,
      author: ans.userAnswered,
      votes: ans.votes || 0,
      timeAgo: new Date(ans.answeredOn).toISOString(),
    }));

    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /questions/:id/answers
export const postAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user = req.user; // comes from isAuth middleware

    if (!content)
      return res.status(400).json({ message: "Answer content is required" });

    const question = await Question.findById(id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    const newAnswer = {
      answerBody: content,
      userAnswered: user.username,
      userId: user.id,
      answeredOn: new Date(),
      votes: 0,
    };

    question.answer.push(newAnswer);
    question.noOfAnswers = question.answer.length;

    await question.save();

    res.status(201).json({
      id: question.answer[question.answer.length - 1]._id,
      content,
      author: user.username,
      timeAgo: "just now",
      votes: 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /answers/:answerId/vote
export const voteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { direction } = req.body;
    const user = req.user;

    const question = await Question.findOne({ "answer._id": answerId });
    if (!question) return res.status(404).json({ message: "Answer not found" });

    const answer = question.answer.id(answerId);
    if (!answer.votes) answer.votes = 0;

    if (direction === "up") {
      answer.votes += 1;
    } else if (direction === "down") {
      answer.votes -= 1;
    } else {
      return res.status(400).json({ message: "Invalid vote direction" });
    }

    await question.save();
    res.status(200).json({ message: "Vote recorded", votes: answer.votes });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

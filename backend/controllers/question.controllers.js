import mongoose from "mongoose";
import Question from "../models/question.model.js";

// 🟢 Ask a question
export const AskQuestion = async (req, res) => {
  const { questionTitle, description, questionTags } = req.body;

  const newQuestion = new Question({
    questionTitle,
    description,
    questionTags,
    userId: req.user.id, // ObjectId
    userPosted: req.user.name, // Username
  });

  try {
    await newQuestion.save();
    res.status(200).json("Posted a question successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new question");
  }
};

// 📥 Get all question
export const getAllQuestion = async (req, res) => {
  try {
    const questionList = await Question.find().sort({ askedOn: -1 });
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 🔍 Get a single question by ID
export const getQuestionById = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Invalid question ID" });
  }

  try {
    const question = await Question.findById(_id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while fetching question" });
  }
};

// ❌ Delete a question
export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  try {
    await Question.findByIdAndRemove(_id);
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 👍👎 Vote on a question
export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;
  const userId = req.user.id; // ✅ use req.user.id

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  try {
    const question = await Question.findById(_id);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }

    await question.save(); // ✅ better than findByIdAndUpdate
    res.status(200).json({ message: "Voted successfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while voting." });
  }
};

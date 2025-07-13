import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
  questionTitle: { type: String, required: "Question must have a title" },
  description: { type: String, required: "Question must have a description" },
  questionTags: { type: [String] },
  noOfAnswers: { type: Number, default: 0 },
  upVote: { type: [String], default: [] },
  downVote: { type: [String], default: [] },

  // ✅ Correct user reference
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userPosted: { type: String, required: "Username is required" },

  askedOn: { type: Date, default: Date.now },
  answer: [
    {
      answerBody: String,
      userAnswered: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      answeredOn: { type: Date, default: Date.now },
    },
  ],
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;

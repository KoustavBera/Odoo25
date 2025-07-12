import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  AskQuestion,
  deleteQuestion,
  getAllQuestion,
  getQuestionById,
  voteQuestion,
} from "../controllers/question.controllers.js";
import {
  getAnswers,
  postAnswer,
  voteAnswer,
} from "../controllers/answer.controller.js";
const questionRouter = express.Router();

questionRouter.post("/ask", isAuth, AskQuestion);
questionRouter.get("/", getAllQuestion);
questionRouter.delete("/:id", isAuth, deleteQuestion);
questionRouter.get("/:id", getQuestionById);
questionRouter.patch("/vote/:id", isAuth, voteQuestion);
questionRouter.get("/:id/answers", getAnswers);
questionRouter.post("/:id/answer", isAuth, postAnswer);
questionRouter.post("/answers/:answerId/vote", isAuth, voteAnswer);
export default questionRouter;

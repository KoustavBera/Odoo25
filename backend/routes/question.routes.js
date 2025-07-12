import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  AskQuestion,
  deleteQuestion,
  getAllQuestion,
  voteQuestion,
} from "../controllers/question.controllers.js";

const questionRouter = express.Router();

questionRouter.post("/ask", isAuth, AskQuestion);
questionRouter.get("/", getAllQuestion);
questionRouter.delete("/:id", isAuth, deleteQuestion);
questionRouter.patch("/vote/:id", isAuth, voteQuestion);

export default questionRouter;

import express from "express";
import {
  getUser,
  login,
  logout,
  signUp,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", isAuth, getUser);
export default authRouter;

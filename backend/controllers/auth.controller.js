import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

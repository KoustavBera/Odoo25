import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

// Cookie options for secure HTTP-only cookie
// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 4 * 24 * 60 * 60 * 1000,
};

// Helper to create token
const createToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "4d" }
  );
};

// ------------------ SIGNUP ------------------
export const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role, // Optional: sanitize this if needed
    });

    const token = createToken(newUser);

    // Send token as cookie + response
    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({ result: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------ LOGIN ------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Invalid email or password." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = createToken(existingUser);

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({ result: existingUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

// ------------------ LOGOUT (Optional) ------------------
export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged out successfully." });
};

export const getUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "User not authentica" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json({ user: user });
  } catch (err) {
    res.status(403).json({ message: "User not authorized." });
  }
};

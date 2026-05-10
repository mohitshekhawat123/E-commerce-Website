import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register controller
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("👉 Register route hit");
  console.log("Body received:", req.body);

  try {
    const existingUser = await User.findOne({ email });
    console.log("User found?", existingUser ? "Yes" : "No");

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    console.log("✅ New user registered:", newUser.email);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// Login controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("👉 Login route hit");
  console.log("Body received:", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookies for cross-domain usage (Vercel to Render)
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    res.cookie("token", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }); // 15 mins
    res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days

    console.log("✅ Login successful");
    res.status(200).json({ message: "Login successful", user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
};

// Refresh Token controller
export const refreshToken = async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ error: "No refresh token provided." });
  }

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);
    
    // Issue a new access token
    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    res.cookie("token", newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }); // 15 mins
    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired refresh token." });
  }
};

// Logout controller
export const logoutUser = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.clearCookie("token", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res.status(200).json({ message: "Logged out successfully" });
};

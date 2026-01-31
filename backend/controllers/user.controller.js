import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNo, password, role } = req.body;
    if (!fullName || !email || !phoneNo || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      phoneNo,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error registering user", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Please Register", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false });
    }
    if (user.role !== role) {
      return res.status(400).json({
        message: "Role mismatch. Please login with correct role",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
      })
      .json({
        message: "User logged in successfully",
        success: true,
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phoneNo: user.phoneNo,
          role: user.role,
          profile: user.profile,
        },
      });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Error logging in user", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error logging out user", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNo, bio, skills } = req.body;
    if (!fullName || !email || !phoneNo) {
      return res
        .status(400)
        .json({
          message: "Full Name, Email and Phone Number are required",
          success: false,
        });
    }
    const skillsArray = skills
      ? skills.split(",").map((skill) => skill.trim())
      : [];
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    user.fullName = fullName;
    user.email = email;
    user.phoneNo = phoneNo;
    user.profile.bio = bio || user.profile.bio;
    user.profile.skills =
      skillsArray.length > 0 ? skillsArray : user.profile.skills;
    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNo: user.phoneNo,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error updating profile", success: false });
  }
};

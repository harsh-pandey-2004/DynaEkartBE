const user = require("../Models/userModel");
const OTP = require("../Models/otpModel");
const jwt = require("jsonwebtoken");

const CreateUser = async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    const userExist = await user.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const newuser = new user({
      name,
      email,
      phone,
      role,
    });
    await newuser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Adding user - " + error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, phone, otp } = req.body;
    const userData = await user.findOne({ $or: [{ email }, { phone }] });
    if (!userData) {
      return res.status(400).json({ message: "Invalid email or phone number" });
    }
    const otpData = await OTP.findOne({ user: userData._id, OTP: otp });
    if (!otpData) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const token = jwt.sign(
      { id: userData._id, role: userData.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return res
      .status(200)
      .json({ message: "User logged in successfully", data: userData });
  } catch (error) {
    return res.status(500).json({ message: "Error Login - " + error.message });
  }
};

const ListAllUsers = async (req, res) => {
  try {
    const userData = await user.find({ role: "user" });
    if (!userData) {
      return res.status(400).json({ message: "No users found" });
    }
    // const users
    res
      .status(200)
      .json({ message: "Users listed successfully", data: userData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error ListAllUsers - " + error.message });
  }
};

const Profile = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await user.findById(id);
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User data fetched successfully", data: userData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting data - " + error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role } = req.body;
    const userData = await user.findByIdAndUpdate(id, {
      name,
      email,
      phone,
      role,
    });
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User data updated successfully", data: userData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating data - " + error.message });
  }
}

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await user.findByIdAndDelete(id);
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", data: userData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting data - " + error.message });
  }
}

module.exports = { CreateUser, Login, ListAllUsers, Profile, UpdateUser, DeleteUser };

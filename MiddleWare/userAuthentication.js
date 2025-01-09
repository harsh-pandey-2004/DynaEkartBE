const user = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const userAuthentication = async (req, res, next) => {
  const token = req.cookies?.auth_token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await user.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const adminAuthentication = async (req, res, next) => {
  const token = req.cookies?.auth_token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = {
      role: decoded.role === "admin" ? "admin" : "user",
      id: decoded.id,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { userAuthentication, adminAuthentication };

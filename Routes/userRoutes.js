const express = require("express");
const router = express.Router();
const {
  userAuthentication,
  adminAuthentication,
} = require("../MiddleWare/userAuthentication");
const {
  CreateUser,
  Login,
  ListAllUsers,
  getData,
} = require("../Controllers/userController");

router.post("/register", CreateUser);
router.post("/login", Login);
router.get("/profile/:id", adminAuthentication, getData);
router.get("/list", adminAuthentication, ListAllUsers);

module.exports = router;

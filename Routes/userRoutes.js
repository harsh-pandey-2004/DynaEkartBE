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
  Profile,
  UpdateUser,
  DeleteUser,
} = require("../Controllers/userController");

router.post("/register", CreateUser);
router.post("/login", Login);
router.get("/adminprofile/:id", adminAuthentication, Profile);
router.get("/profile/:id", userAuthentication, Profile);
router.get("/list", adminAuthentication, ListAllUsers);
router.patch("/update/:id", userAuthentication, UpdateUser);
router.patch("/adminupdate/:id", adminAuthentication, UpdateUser);
router.delete("/delete/:id", adminAuthentication, DeleteUser);

module.exports = router;

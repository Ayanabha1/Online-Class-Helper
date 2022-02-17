const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../Models/User");
const {
  registerValidation,
  loginValidation,
} = require("../Validation/validations");

router.post("/addNewUser", async (req, res) => {
  // Check for validation wrt Schema
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  // check if the user already exists
  const emailExists = await userModel.findOne({
    user_email: req.body.user_email,
  });
  if (emailExists) {
    return res.status(400).send({ message: "User already exists" });
  }

  //   hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.user_pass, salt);

  // Adding a new user

  const user = new userModel({
    user_name: req.body.user_name,
    user_sec: req.body.user_sec,
    user_email: req.body.user_email,
    user_pass: hashedPass,
  });

  try {
    const savedUser = await user.save();
    // Generating jwt token
    const token = await jwt.sign(
      { _id: user._id, name: user.user_name, sec: user.user_sec },
      process.env.JWT_SECRET
    );
    res
      .header("auth-token", token)
      .send({
        user: savedUser._id,
        token: token,
        message: "Signup successful",
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  // Check for validation wrt Schema
  console.log(req.body);
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  // check if the user already exists
  const user = await userModel.findOne({
    user_email: req.body.user_email,
  });
  if (!user) {
    return res.status(401).send({ message: "Invalid login credentials" });
  }

  // compare passwords
  const validPass = await bcrypt.compare(req.body.user_pass, user.user_pass);
  if (!validPass) {
    return res.status(401).send({ message: "Invalid login credentials" });
  }

  // Generating jwt token
  const token = await jwt.sign(
    { _id: user._id, name: user.user_name, sec: user.user_sec },
    process.env.JWT_SECRET
  );
  res
    .header("auth-token", token)
    .send({ token: token, message: "Login successful" });
});

module.exports = router;

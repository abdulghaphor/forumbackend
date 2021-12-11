const fs = require("fs");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const sendMail = require("../middleware/nodemailer");

exports.userSignup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);

    // sending confirmation email
    const data = await ejs.renderFile(__appdir + "/templates/signup.ejs", {
      name: req.body.full_name,
    });
    await sendMail(
      { address: req.body.email, name: req.body.full_name },
      `Hello ${req.body.full_name}`,
      data
    );

    // generate token to sign-in after sign-up
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + process.env.JWT_EXP,
    };
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRETKEY);

    // sending JSON reply
    res.status(201).json({ token });
  } catch (err) {
    // Error handling through middleware in router
    next(err);
  }
};

exports.userSignin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.email,
    exp: Date.now() + parseInt(process.env.JWT_EXP),
  };
  const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRETKEY);
  res.status(200).json({ token });
};

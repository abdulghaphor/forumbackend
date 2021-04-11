const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const mailer = require("../middleware/nodemailer");

exports.userSignup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    mailer(
      { address: req.body.email, name: req.body.full_name },
      `Hello ${req.body.full_name}`,
      "Welcome to the new warwoor"
    );

    res.status(201).json({ message: "User created successfully." }).end();
  } catch (err) {
    next(err);
  }
};

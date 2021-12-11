const express = require("express");
const passport = require("passport");
const router = express.Router();
const { userSignup, userSignin } = require("../controllers");
router.use(express.json());
router.post("/signup", userSignup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  userSignin
);
module.exports = router;

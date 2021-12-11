const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const { User } = require("../db/models");
exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { email: username } });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err);
  }
});
exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRETKEY,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

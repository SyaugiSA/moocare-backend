const UserModel = require("./model/user.model");

const Initialize = (passport, config) => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findOne({ _id: id }, (err, user) => done(err, user));
  });
};

module.exports = Initialize;

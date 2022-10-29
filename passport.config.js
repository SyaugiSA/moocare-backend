const UserModel = require("./model/user.model");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const Initialize = (passport, config) => {
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: config.google.clientID,
  //       clientSecret: config.google.clientSecret,
  //       callbackURL: config.google.callbackURL,
  //     },
  //     function (accessToken, refreshToken, profile, done) {
  //       profile.authOrigin = "google";
  //       UserModel.findOrCreateAuthUser(profile, (err, user) => done(err, user));
  //     }
  //   )
  // );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findOne({ _id: id }, (err, user) => done(err, user));
  });
};

module.exports = Initialize;

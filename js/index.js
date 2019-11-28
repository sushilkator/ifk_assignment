const StravaStrategy = require('passport-strava').Strategy;
passport.use(new StravaStrategy({
    clientID: STRAVA_CLIENT_ID,
    clientSecret: STRAVA_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/strava/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ stravaId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

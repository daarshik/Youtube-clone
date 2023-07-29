const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const GOOGLE_CLIENT_ID ="978189245559-8phqbrt7uhse35ng05hqb4o4ei5c0tko.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
  });
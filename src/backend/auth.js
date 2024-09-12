require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const router = express.Router();
const User = require('./models/users');

// Configure the Google strategy for use by Passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    // Find the user by Google email
    let user = await User.findOne({ email: profile.emails[0].value });

    if (!user) {
      // If user doesn't exist, create a new user without a password
      user = new User({
        email: profile.emails[0].value,
        username: profile.displayName,
        password: '' // No password for OAuth users
      });
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user._id); // Serialize user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Deserialize by ID
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Define routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.CLIENT_URL}/register?success=true`);
  });

module.exports = router;

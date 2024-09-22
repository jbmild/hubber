require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
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
      });
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.use(new LocalStrategy(async (username, password, cb) => {
  const user = await User.findOne({ username })
  if (!user) {
    return cb(null, false)
  }

  console.log("reviso pass")
  if(!user.comparePassword(password)){
    console.log("no coincide pass")
    return cb(null, false)
  }
  console.log("todo ok")
  return cb(null, user);
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
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.CLIENT_URL}/`);
  });

router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

router.post('/login', passport.authenticate('local', { failureRedirect: `${process.env.CLIENT_URL}/login`, successRedirect: `${process.env.CLIENT_URL}/` }));

module.exports = router;
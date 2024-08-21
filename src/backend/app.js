require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./auth');
const cors = require('cors');
var bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000; // default port is 3000

// Set up express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow requests from this origin
    credentials: true
}));
app.use(bodyParser.json()); 

// Initialize passport and use passport session middleware
app.use(passport.initialize());
app.use(passport.session());

// Use the authentication routes
app.use('/auth', authRoutes);

require('./routes')(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

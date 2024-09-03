require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./auth');
const cors = require('cors');
const { OpenAI } = require('openai');
var bodyParser = require('body-parser');
const { getPaisesDisponibles } = require('./services/dbService');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
mongoose.set('debug', true);

const app = express();
const port = process.env.PORT || 3000; // default port is 3000
 // URL de conexión a tu MongoDB Atlas
const mongoUri = `${process.env.MONGO_URI}`;
console.log(mongoUri);

mongoose.connect(mongoUri)
    .then((result) => {
        console.log('connected to Mongodb');
    }).catch((err) => {
        console.error(err);
    });

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

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
});

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./auth');
const cors = require('cors');
const { OpenAI } = require('openai');
var bodyParser = require('body-parser');
const { chatRoutes } = require('./chatbot');
const { setClient, getPaisesDisponibles } = require('./db');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000; // default port is 3000
 // URL de conexión a tu MongoDB Atlas
const mongoUri = process.env.MONGO_URI;

// create application/json parser
var jsonParser = bodyParser.json()

mongoose.connect(process.env.MONGO_URL)
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

app.use('/chatbot', chatRoutes);

app.get('/paises',async (req, res) => {
    const paises = await getPaisesDisponibles();
    return res.status(200).json(paises);
});

app.listen(port, async () => {
    console.log(`Conectando al mongo de Facu`);
    setClient(new MongoClient(mongoUri));
    console.log("Conectado con exito.");
    console.log(`Server running on port ${port}`);
});

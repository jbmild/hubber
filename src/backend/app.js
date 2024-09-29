require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./auth');
const cors = require('cors');
const { OpenAI } = require('openai');
var bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
mongoose.set('debug', true);
const {exec} = require('child_process');

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

exec('pm2 start -f cronIngestor.mjs', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el comando: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });


app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
});


const shutdown = () => {
    console.log('Deteniendo servidor y procesos de pm2...');
  
    // Detener el proceso con pm2
    exec('pm2 stop cronIngestor.mjs', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al detener pm2: ${error.message}`);
        process.exit(1);
      } else {
        console.log('Proceso de pm2 detenido.');
        process.exit(0);
      }
    });
  };
  
  // Manejar señales del sistema para detener pm2 al salir
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { OpenAI } = require('openai');
const { createIndex, query } = require('./botgpt-demo');
var bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000; // default port is 3000
let index;
 
// create application/json parser
var jsonParser = bodyParser.json()

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

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hello World'
    });
});

app.post('/chatbot', jsonParser, async (req, res) => {
    console.log(req.body);

    const pregunta = `${req.body.message}`;

    let botMessage = "\n>HUBBER:";

    try {
        const respuesta = await query(index, pregunta);

        botMessage = botMessage.concat(respuesta.toString());

        console.log(botMessage);
      } catch (error) {
        botMessage = botMessage.concat(">Error al procesar la consulta:", error);
        console.error(botMessage);
      }

    res.json({ message : botMessage });
});

app.listen(port, async () => {
    index =  await createIndex();

    console.log(`Server running on port ${port}`);
});

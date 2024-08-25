//Se debe aplicar por cmd antes: npm install mongodb openai llamaindex
//llamaindex tarda un poco
// IMPORTANTE: Si lo quieren testear, en el campo data creen una lista de diccionario con datos random o cambien los valaores del database y la collection por la db pruebaFede y la collection paises_normativas o
//-----------------------------------------------------------------------
const { OpenAI } = require('openai');
const { VectorStoreIndex, Document } = require('llamaindex');
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json()
const { getDocumentosRegulaciones } = require('./db');


let index;


// Crea índice
async function createIndexPorPais(pais) {
  const mappedData = await getDocumentosRegulaciones({pais: pais});
  const documentos= mappedData.map(item => new Document({ text: JSON.stringify(item) }));
  const index = await VectorStoreIndex.fromDocuments(documentos);
  return index;
}

// Función de consulta
async function query(index, pregunta) {
  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query({
    query: pregunta
  });
  return response;
}

router.post('/pais', jsonParser, async (req, res) => {
  index = await createIndexPorPais(req.body.pais);

  res.json({ message: `Quieres exportar a ${req.body.pais}, en que podemos guiarle?`})
});

router.post('/message', jsonParser, async (req, res) => {
  const pregunta = `${req.body.message}`;

  let botMessage = "";

  //para no gastar mensajes en pruebas
  return res.status(200).json({message: pregunta});

  try {
      const respuesta = await query(index, pregunta);

      botMessage = botMessage.concat(respuesta.toString());
      res.status(200).json({ message : botMessage });
    } catch (error) {
      botMessage = botMessage.concat(">Error al procesar la consulta:", error);
      console.error(botMessage);
      return  res.status(500).json({ message : botMessage });
    }
});

exports.chatRoutes = router;
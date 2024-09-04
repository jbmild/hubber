//Se debe aplicar por cmd antes: npm install mongodb openai llamaindex
//llamaindex tarda un poco
// IMPORTANTE: Si lo quieren testear, en el campo data creen una lista de diccionario con datos random o cambien los valaores del database y la collection por la db pruebaFede y la collection paises_normativas o
//-----------------------------------------------------------------------
const { OpenAI } = require('openai');
const { VectorStoreIndex, Document } = require('llamaindex');
const express = require('express');

const Normativa = require('../models/normativas');

let index;

// Crea índice
async function crearIndexPorPais(pais) {
  const mappedData = await Normativa.find({ pais:pais}, { _id: 0 }).exec();
  
  const documentos = mappedData.map(item => new Document({ text: JSON.stringify(item) }));
    
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

exports.handleSetPais = async (req, res) => {
    index = await crearIndexPorPais(req.body.pais);
        
    res.json({ message: `Quieres exportar a ${req.body.pais}, en que podemos guiarle?`})
}

exports.handlePostMessage = async (req, res) => {
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
}

exports.handleTraerPaises = async (req, res) => {
  const paises = await Normativa.aggregate([
    {
      $group: {
          _id: "$pais"
      }
    },
    {
      $project: {
          _id: 0,
          pais: "$_id"
      }
    }
  ])

  res.status(200).json(paises);
}
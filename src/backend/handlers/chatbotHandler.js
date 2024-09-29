//Se debe aplicar por cmd antes: npm install mongodb openai llamaindex
//llamaindex tarda un poco
// IMPORTANTE: Si lo quieren testear, en el campo data creen una lista de diccionario con datos random o cambien los valaores del database y la collection por la db pruebaFede y la collection paises_normativas o
//-----------------------------------------------------------------------
const { OpenAI } = require('openai');
const { VectorStoreIndex, Document } = require('llamaindex');
const { traerNormativasPorPais } = require('./normativasHandler');
const express = require('express');

const INDEX_EXPIRATION_TIME = 12 * 60 * 60 * 1000; // 30 minutos de expiración

const Normativa = require('../models/normativas');
let indexes = {};

function limpiarIndicesExpirados() {
    const currentTime = Date.now();
    for (const key in indexes) {
        if (currentTime - indexes[key].timestamp > INDEX_EXPIRATION_TIME) {
            delete indexes[key];
        }
    }
}

// Crea índice
const crearIndexPorPais = async (pais) => {
    limpiarIndicesExpirados();

    if(indexes[pais]){
        indexes[pais].timestamp = Date.now();
        return true;
    }        

    try{
        const mappedData = await traerNormativasPorPais(pais);
    
        const documentos = mappedData.map(item => new Document({ text: JSON.stringify(item) }));
            
        const index = await VectorStoreIndex.fromDocuments(documentos);

        indexes[pais] = { index: index, timestamp: Date.now() };

        return true;
    }catch(e){
        return false;
    }
}

// Función de consulta
const query =  async (key, pregunta, context) => {
    try{
        limpiarIndicesExpirados();

        const index = indexes[key].index;
    
        if(!index){
            throw Error('Se acabo el tiempo de la session, vuelve a iniciar el chat para seguir con la conversación');
        }
    
        const queryEngine = index.asQueryEngine();
        const response = await queryEngine.query({
            query: `${context}\n${pregunta}`
        });
        return response.toString();
    }catch(e){
        console.log(e);
    }
}


exports.handleSetPais = async (req, res) => {
    console.log('set pais', req.body)
    if(await crearIndexPorPais(req.body.pais))
        res.json({ message: `Quieres exportar a ${req.body.pais}, en que podemos guiarle?`})
    else
        res.status(400).send({
            message: 'Ocurrio un error!'
        });
}

exports.handlePostMessage = async (req, res) => {
    const pregunta = `${req.body.message}`.replace();
    
    req.session.chatContext = req.session.chatContext.concat({user: 'Usuario', message: `${pregunta}`});

    let botMessage = "";
    
    //para no gastar mensajes en pruebas
    //return res.status(200).json({message: pregunta});
    
    try {
        const ctx = req.session.chatContext.map(p => (`${p.user}: ${p.message}`)).join('\n');

        const respuesta = await query(req.body.chatKey, pregunta, ctx);
    
        botMessage = botMessage.concat(respuesta);
        
        req.session.chatContext = req.session.chatContext.concat({user: 'Bot', message: `${botMessage}`});

        // Limitar el tamaño del contexto
        if (req.session.chatContext.length > 20) { // Mantener los últimos 20 mensajes
            req.session.chatContext = req.session.chatContext.slice(-20);
        }

        res.status(200).json({ message : botMessage });
    } catch (error) {
        botMessage = botMessage.concat(">Error al procesar la consulta:", error);
        req.session.chatContext = '';
        return  res.status(500).json({ message : botMessage });
    }
}

exports.handleClearMessageHistory = async (req, res) => {
    req.session.chatContext = [];
    res.status(200);
}
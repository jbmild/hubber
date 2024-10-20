//Se debe aplicar por cmd antes: npm install mongodb openai llamaindex
//llamaindex tarda un poco
// IMPORTANTE: Si lo quieren testear, en el campo data creen una lista de diccionario con datos random o cambien los valaores del database y la collection por la db pruebaFede y la collection paises_normativas o
//-----------------------------------------------------------------------
const { OpenAI } = require('openai');
const { VectorStoreIndex, Document } = require('llamaindex');
const { traerNormativasPorPais } = require('./normativasHandler');
const { traerGuiasDeExportacion } = require('./guiaExportacionHandler');
const express = require('express');

const INDEX_EXPIRATION_TIME =  12 * 60 * 60 * 1000; // 12 hopas de expiración

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


const crearIndex = async (key, mappedData) => {
    limpiarIndicesExpirados();

    if(indexes[key]){
        indexes[key].timestamp = Date.now();
        return indexes[key];
    }        

    const documentos = mappedData.map(item => (new Document({ text: JSON.stringify(item) })));
        
    const index = await VectorStoreIndex.fromDocuments(documentos);

    indexes[key] = { index: index, timestamp: Date.now() };

    return indexes[key];
}

const crearIndexPorPais = async (pais) => {
    try{
        const mappedData = await traerNormativasPorPais(pais);
    
        return await crearIndex(pais, mappedData);
    }catch(e){
        return null;
    }
}

const crearIndexComoExportar = async () => {
    try{
        let mappedData = await traerGuiasDeExportacion();
        mappedData = mappedData.concat(await traerNormativasPorPais('Argentina'));
    
        return await crearIndex('comoExportar', mappedData);
    }catch(e){
        return null;
    }
}

// Función de consulta
const query =  async (key, pregunta, context) => {
    try{
        limpiarIndicesExpirados();

        let index = indexes[key]?.index;
    
        if(!index){
            if(key === 'comoExportar'){
                index = (await crearIndexComoExportar()).index;
            }else{
                index = (await crearIndexPorPais(key)).index; 
            }
        }
    
        const queryEngine = index.asQueryEngine();
        const response = await queryEngine.query({
            query: `${context}\n${pregunta}`
        });
        return response.toString();
    }catch(e){
        console.log(e);
        res.status(500).send({
            message: 'Ocurrio un error!'
        });
    }
}


exports.handleSetPais = async (req, res) => {
    if(await crearIndexPorPais(req.body.pais))
        res.json({ message: `Quieres exportar a ${req.body.pais}, en que podemos guiarle?`})
    else
        res.status(500).send({
            message: 'Ocurrio un error!'
        });
}

exports.handleSetComoExportar = async(req, res) => {
    if(await crearIndexComoExportar())
        res.json({ message: `Necesitas ayuda para empezar a exportar, en que podemos guiarle?`})
    else
        res.status(500).send({
            message: 'Ocurrio un error!'
        });
}

exports.handlePostMessage = async (req, res) => {
    const pregunta = `${req.body.message}`;
    
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
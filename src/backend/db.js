require('dotenv').config();
const { Document } = require('llamaindex');

let client;
const db = 'chatbot';

// Función para obtener datos de MongoDB Atlas
async function getAll(collectionName, filter = {}, options = {}) {
    try {
      await client.connect();
      const database = client.db(db);
      const collection = database.collection(collectionName);
          
      return await collection.find(filter, options).toArray();
    } finally {
      await client.close();
    }
  }

  async function getDistinct(collectionName, fieldName, query = {}, options = {}){
    try {
        await client.connect();
        const database = client.db(db);
        const collection = database.collection(collectionName);
            
        return await collection.distinct(fieldName, query, options);
      }
      finally {
        await client.close();
      }
  }

  async function  getOne(collectionName, filter = {}, options = {}) {
    try {
        await client.connect();
        const database = client.db(db);
        const collection = database.collection(collectionName);
            
        return await collection.findOne(filter, options).toArray();
      } finally {
        await client.close();
      }
  }
  
  // Crea documentos
  async function getDocumentosRegulaciones(filter) {
    const options = {
        projection: { _id: 0}
    }
    const data = await getAll('barrerasAlfajores', filter, options);
    const mappedData = data.map(item => ({ pais: item.pais, codigoBarrera: item.codigoBarrera, titulo: item.titulo,descripcion:item.descripcion,normativaOrigen:item.normativaOrigen }));
    return mappedData;
  }
  
  async function getPaisesDisponibles(){
    const options = {
        projection: { _id: 0, pais: 1}
    }
    const query = {};
    const data = await getDistinct('barrerasAlfajores', 'pais', query, options);
    return data;
  }

  function setClient(_client){
    client = _client;
  }

  exports.client = client;

  exports.getDocumentosRegulaciones = getDocumentosRegulaciones;
  exports.getPaisesDisponibles = getPaisesDisponibles;
  exports.setClient = setClient;
//Se debe aplicar por cmd antes: npm install mongodb openai llamaindex
//llamaindex tarda un poco
// IMPORTANTE: Si lo quieren testear, en el campo data creen una lista de diccionario con datos random o cambien los valaores del database y la collection por la db pruebaFede y la collection paises_normativas o
//-----------------------------------------------------------------------
const { OpenAI } = require('openai');
const { VectorStoreIndex, Document } = require('llamaindex');
const readline = require('readline');
const { MongoClient } = require('mongodb');

// URL de conexión a tu MongoDB Atlas
const uri = "mongodb+srv://Admin:ComercioExt@comercioexterior.pndpmeb.mongodb.net/?retryWrites=true&w=majority";

// Función para obtener datos de MongoDB Atlas
async function getDataFromMongoDB() {
  console.log("Conectando al mongo de Facu (database: Comercio_Exterior)");
  const client = new MongoClient(uri);
  console.log("Conectado con exito.");
  try {
    await client.connect();
    const database = client.db('chatbot'); // Asumiendo que este es el nombre de tu base de datos
    const collection = database.collection('barrerasAlfajores'); //nombre de la coleccion de la base de datos
		
    // Obtengo todos los documentos de la colección.
    //Aca surge el problema donde es necesario reducir la coleccion previamente con esas opciones de usuario porque sino queda cargando mucho rato.
    //Tambien podriamos cargar la coleccion cada X dias asi no se ejecuta siempre, todo este codigo se podria fragmentar?
    const data = await collection.find({}).toArray(); 
    //filtro para los campos mas importantes
    const filteredData = data.map(item => ({ pais: item.pais, codigoBarrera: item.codigoBarrera, titulo: item.titulo,descripcion:item.descripcion,normativaOrigen:item.normativaOrigen }));
    //console.log(filteredData);
    return filteredData ;
  } finally {
    await client.close();
  }
}

// Crea documentos
async function createDocuments() {
  const data = await getDataFromMongoDB();
  const documentos= data.map(item => new Document({ text: JSON.stringify(item) }));
  //console.log("Documentos creados:", documentos);
  return documentos;
}

// Crea índice
async function createIndex() {
  const documents = await createDocuments();
  const index = await VectorStoreIndex.fromDocuments(documents);
  console.log(index);
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

exports.createIndex = createIndex;
exports.query = query;
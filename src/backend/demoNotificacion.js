const notificar = require('./ingestrorWTO');


const listaNormativas = [];

    let normativa1 =
        {"pais" : "Barbados", 
        "titulo" : "Requisitos de calidad, seguridad o rendimiento del producto", 
        "descripcion" : "Los productos importados y exportados sujetos a normas obligatorias deben demostrar la conformidad con sus", 
        "agencia" : "Institución de Estándares Nacionales de Barbados", 
        "normativaOrigen" : "Standards Act", 
        "etiquetas" : [ "Alfajor", "Vinos", "Alfajores", "Miel", "Vino" ], 
        "fechaImplementacion" : new Date() } ;

    let normativa2 = 
    { "pais" : "Argentina", 
     "titulo" : "Tarifas de exportación / tarifas cobradas en relación con los servicios prestados", 
     "descripcion" : "Se fija los aranceles a percibir por los análisis químicos, fisicoquímicos y microbiológicos que realiza el INSTITUTO NACIONAL DE VITIVINICULTURA y los aranceles a percibir por la prestación de servicios complementarios que realiza el citado Instituto Nacional, en la exportación de vinos, alcohol etílico, aguardiente natural (Art. 1 y 2; Anexo I y II).", 
     "agencia" : "Ministerio de Agricultura, Ganadería y Pesca", 
     "normativaOrigen" : "Resolución N° 28 de 01/03/2021.", 
     "etiquetas" : [ "Vino", "Vinos" ], 
     "fechaImplementacion" : new Date() 
     };

listaNormativas.push(normativa1, normativa2);
notificar(listaNormativas);
import axios from "axios";
import * as cheerio from 'cheerio';
import { MongoClient } from 'mongodb';
import  fs from 'fs';
import  path from 'path';

const LOG_FILE = path.join('./logs/', 'log.txt');

const escribirLog = async (resultado) => {
    fs.appendFile(LOG_FILE, `${resultado}\n`, (err) => {
        if (err) {
          console.error('Error al escribir en el archivo de log:', err);
        } else {
          console.log('Resultado escrito en el archivo de log.');
        }
      });
}

const translate = async (text, idioma) => {
    let texto = text.replace('. ', '.');
    texto = encodeURIComponent(texto);
  
    const url = `https://api.allorigins.win/get?url=https%3A%2F%2F655.mtis.workers.dev%2Ftranslate%3Ftext%3D${texto}%26source_lang%3Den%26target_lang%3D${idioma}`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site"
        }
      });
  
      const result = response.data;
      const resp = JSON.parse(result.contents);
  
      return resp.response.translated_text;
    } catch (error) {
      console.error(error);
      return text;
    }
  };

function tituloSPS(titulo) {
    const opciones = titulo.text().split(',');
    const titulos = [];

    for (let opcion of opciones) {
        if (/\[X\]/.test(opcion)) {
            titulos.push(opcion);
        }
    }

    let final;
    if (titulos.length > 1) {
        final = titulos.slice(0, -1).join(', ') + ', ' + titulos[titulos.length - 1];
    } else {
        final = titulos[0];
    }

    final = final.replace('[X]', '').trim();
    return final;
}

const parseNormativa = (tds, language, tipoDoc, producto) => {
    const liststds = [];
    
    for(let td of tds){
        const coso = cheerio.load(td).text();
        liststds.push(coso)
    }

    const pais = liststds[1].split(":")[1].trim().split("\n")[0].trim();
    const agencia = liststds[3].split(":")[1].trim().split("\n")[0].trim();
    const normativa = liststds[9].split(":")[1].trim().split("\n")[0].trim();
    let titulo = liststds[13].split(":")[1].trim().split("\n")[0].trim();
    let descripcion = liststds[11].split(":")[1].trim().split("\n")[0].trim();


    if (tipoDoc === 'SPS') {
        titulo = tituloSPS(titulo);
    }

    if (language != 'S') {
        titulo = translate(titulo, "es");
        descripcion = translate(descripcion, "es");
    }

    let etiquetas;
    if (producto === 0) {
        etiquetas = ["Alfajor", "Alfajores"];
    } else if (producto === 1) {
        etiquetas = ["Vino", "Vinos"];
    } else if (producto === 2) {
        etiquetas = ["Miel"];
    }

    const normativaObj = {
        pais: pais,
        titulo: titulo,
        descripcion: descripcion,
        agencia: agencia,
        normativaOrigen: normativa,
        fechaImplementacion: new Date(),
        etiquetas: etiquetas
    };

    return normativaObj;
};

async function obtenerListado(urlListado, headers) {
    try {
        const response = await axios.get(urlListado, { headers: headers });
        const html = await response.data;
        const $ = cheerio.load(html);
        return $;
    } catch (error) {
        console.error('Error al obtener el listado:', error);
    }
}

function getNormativa(url) {
    const idsCatalogos = url.match(/CatalogueIdList[\w=,]+/)[0].split('=')[1].split(',');
    const current = parseInt(url.match(/CurrentCatalogueIdIndex[\w=,]+/)[0].split('=')[1]);
    const spanish = url.match(/SpanishRecord=\w+/)[0].split('=')[1];
    const english = url.match(/EnglishRecord=\w+/)[0].split('=')[1];

    let language;
    if (spanish === 'True') {
        language = 'S';
    } else if (english === 'True') {
        language = 'E';
    } else {
        language = 'F';
    }

    const idCatalogo = parseInt(idsCatalogos[current]);
    return { idCatalogo, language };
}


function formatoFecha(fecha) {
    let dia = ("0" + fecha.getDate()).slice(-2);
    let mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    let año = fecha.getFullYear();
    return `${dia}%2f${mes}%2f${año}`;
}

const notificar = async (listaNormativas) => {

    const url = 'mongodb+srv://Admin:ComercioExt@comercioexterior.pndpmeb.mongodb.net/chatbot?retryWrites=true&w=majority';
    const client = new MongoClient(url);

    try {
        // Conectar al cliente
        await client.connect();
        console.log("Conectado correctamente al servidor");
        const db = client.db('chatbot');
        const barrerasCollection = db.collection('barrerasComerciales');
        const usuariosCollection = db.collection('usuarios');
        const notificacionesCollection = db.collection('notificaciones');

            //Inserto nuevas normativas
        const resultado = await barrerasCollection.insertMany(listaNormativas);

        await escribirLog(`${new Date().toISOString()} Se agregaron las siguientes normativas: ${JSON.stringify(listaNormativas, null, 2)}`);

        // Obtener los _id de los documentos insertados
        const ids = Object.values(resultado.insertedIds);
        const notificaciones = [];
        //Chequeo por cada normativa su pais y productos y si hay algun usuario interesado
        for (let i = 0; i < listaNormativas.length; i++) {
            const usuariosPais = await usuariosCollection.find({ paises_interes: listaNormativas[i].pais }).toArray();
            const usuariosProd = await usuariosCollection.find({ productos_interes: { $in: listaNormativas[i].etiquetas } }).toArray();

            // Inserto en la colección notificaciones la notificación para cada usuario interesado por país
            for (let usuario of usuariosPais) {
                const notificacionPais = {
                    "fecha": new Date(),
                    "estado": "Nueva",
                    "motivo": "Nueva normativa en un país de tu interés",
                    "normativa": ids[i],
                    "email": usuario.email,
                    "interes": listaNormativas[i].pais
                };
                await notificacionesCollection.insertOne(notificacionPais);
                notificaciones.push({ ...notificacionPais });
            }

            // Inserto en la colección notificaciones la notificación para cada usuario interesado por producto
            for (let user of usuariosProd) {
                const notificacionProducto = {
                    "fecha": new Date(),
                    "estado": "Nueva",
                    "motivo": "Nueva normativa en un producto de tu interés",
                    "normativa": ids[i],
                    "email": user.email,
                    "interes": listaNormativas[i].etiquetas.join('/')
                };
                await notificacionesCollection.insertOne(notificacionProducto);
                notificaciones.push({ ...notificacionProducto });
            }
        }
        await escribirLog(`${new Date().toISOString()} Se realizaron las siguientes notificaciones: ${JSON.stringify(notificaciones, null, 2)}`);
    
    }   catch (err) {
        console.error(err);
        await client.close();
        console.log("Conexión cerrada");
    } finally {
        await client.close();
        console.log("Conexión cerrada");
    }
}

export default async function ingestarNormativas(){
    await escribirLog(`${new Date().toISOString()} Empieza la ingesta`)
    const listaPaises = [
            "Antigua+y+Barbuda",
            "Argentina",
            "Barbados",
            "Bolivia",
            "Brasil",
            "Canadá",
            "Chile",
            "Colombia",
            "Costa+Rica",
            "Cuba",
            "Dominica",
            "Ecuador",
            "El+Salvador",
            "Estados+Unidos+de+América",
            "Granada",
            "Guatemala",
            "Guiana",
            "Honduras",
            "Jamaica",
            "Bahamas",
            "México",
            "Nicaragua",
            "Panamá",
            "Paraguay",
            "Perú",
            "Suriname",
            "Trinidad+y+Tobago",
            "Uruguay"
        ];


    const listaNormativas = [];
    for(let i = 0; i<3; i++){
        let posicion;
        switch(i){
            case 0:
                posicion = "1905";
                break;
            case 1:
                posicion = "2204";
                break;
            case 2: 
                posicion = "040900";
                break;
        }
        const headers = {
            "user-agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        };

        const urlBase = "https://docs.wto.org/dol2fe/Pages/FE_Search/FE_S_S006.aspx?";

        const params_1="MetaCollection=WTO&SymbolList=%22G%2fTBT%2fN%2f*%22+OR+%22G%2fSPS%2fN%2f*%22";

        let paises = listaPaises.slice(0, -1).map(pais => `"${pais}"+OR+`).join('');
        paises += `"${listaPaises[listaPaises.length - 1]}"`;
        const params_2 = `&ConcernedCountryList=${paises}1`;

        let fechaHoy = new Date();
        let semanaPasada = new Date();
        semanaPasada.setDate(fechaHoy.getDate() - 7);
        let fechaDesde = formatoFecha(semanaPasada);
        let fechaHasta = formatoFecha(fechaHoy);
        const params_3 = `&IssuingDateFrom=${fechaDesde}&IssuingDateTo=${fechaHasta}`;

        var params_4 = `&Language=SPANISH&HSClassificationList=%22"(${posicion}*)"%22&SearchPage=FE_S_S001&languageUIChanged=true#`;

        var urlListado = urlBase+params_1+params_2+params_3+params_4;

        var cheerioListado = await obtenerListado(urlListado, headers);
        
        const cantidad = parseInt(cheerioListado('#ctl00_MainPlaceHolder_lbl010').text(), 10);

        if (cantidad > 0) {
            await escribirLog(`${new Date().toISOString()} Se encontraron ${cantidad} normativas`);
            const divResultados = cheerioListado('#searchResults');
            const normativas = divResultados.find('a.FECatalogueSymbolPreviewCss');

            const requests = normativas.map(async (index, normativa) => {
                const { idCatalogo, language } = getNormativa(normativa.attribs.onclick);
                const tipoDoc = normativa.children[0].data.split('/')[1];
                const urlDocumento = `https://docs.wto.org/dol2fe/Pages/FE_Search/FE_S_S009-Html.aspx?Id=${idCatalogo}&DocumentPartNumber=1&Language=${language}&Window=L&PreviewContext=DP`;

                try {
                    const response = await axios.get(urlDocumento, { headers: headers });
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const tds = $('table:eq(1)>tbody>tr>td');
                    const normativaParseada = parseNormativa(tds, language, tipoDoc, i);
                    listaNormativas.push(normativaParseada);
                } catch (error) {
                    console.error('Error:', error);
                }
            }).get();

            await Promise.all(requests);
        }
    }


    if(listaNormativas.length > 0){
        notificar(listaNormativas);
    } else {
        await escribirLog(`${new Date().toISOString()} No se encontraron nuevas normativas`);
    }
}

/*
const listaNormativas = [];
const normativa1 = {
    pais: "prueba",
    titulo: "test",
    descripcion: "prueba notificaciones",
    agencia: "n/a",
    normativaOrigen: "n/a",
    fechaImplementacion: new Date(),
    etiquetas: ["prueba", "miel"]
};
const normativa2 = {
    pais: "prueba pais 2",
    titulo: "test",
    descripcion: "prueba notificaciones",
    agencia: "n/a",
    normativaOrigen: "n/a",
    fechaImplementacion: new Date(),
    etiquetas: ["vino", "miel"]
};
listaNormativas.push(normativa1, normativa2);
await notificar(listaNormativas);*/
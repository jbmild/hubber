import axios from "axios";

const backend = `${process.env.REACT_APP_BACKEND_URL}`;
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
  
export async function clasificar(producto) {
  //producto = await translate(producto, "en");
  const response =  await axios.get(`${backend}/clasificador?producto=${producto}`);
  var respuesta = [];
  const predicciones = response.data.predicciones

  for(let i=0; i<predicciones.length; i++){
    const pos = predicciones[i][0];
    const posicion = await axios.get(`${backend}/mercados?query=${pos}`);
    const obj = {"posicion": posicion.data.posiciones[0].posicion, "porcentaje" : predicciones[i][1]}
    respuesta.push(obj)
  }

  return respuesta;
}
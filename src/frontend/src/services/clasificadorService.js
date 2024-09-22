import axios from "axios";

const backend = `${process.env.REACT_APP_BACKEND_URL}/clasificador`;
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
  producto = await translate(producto, "en");
  const response =  await axios.get(`${backend}?producto=${producto}`);
  return response.data;
}
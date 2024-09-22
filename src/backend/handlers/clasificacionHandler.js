const cheerio = require('cheerio');
const qs = require('qs');
const axios = require('axios');


exports.handleTraerClasificacion = async (req, res) => {
    const producto = req.query.producto;
    const headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        'csrftoken': 'qXuG7sodqBxPhBO8Clg1fmWPyc64Jxc9FRYjDaWTfJlDsyVK4GxAh2MgcNfJSDdG'
      };

    const url = 'http://49.50.165.5:19090/page/mainFormEn';
        try {
            const primerResponse = await axios.get(url, { headers });
            const $ = cheerio.load(primerResponse.data);
            const token = $('form#main-form input[name="csrfmiddlewaretoken"]').val();
                        
            const segundaurl = `http://49.50.165.5:19090/page/graph2DEn?csrfmiddlewaretoken=${token}&popVal=0&topn=3&prnm=${encodeURIComponent(producto)}`;
            const segundoResponse = await axios.get(segundaurl, { headers });
            const cookies = segundoResponse.headers['set-cookie'];
            const textoResponse = segundoResponse.data;
            
            const tokenDosMatch = textoResponse.match(/var\ssttCsrfToken\s=\s*'(\w+)'/);
            const tokenDos = tokenDosMatch ? tokenDosMatch[1] : '';
            
            const otraurl = "http://49.50.165.5:19090/api/hsgraph";
            const payload = qs.stringify({
                'csrfmiddlewaretoken': tokenDos,
                'request_key': 'd3test',
                'topn': '3',
                'text': producto,
                'type': '2D',
                'lang': 'en'
            });
            const posicionesResponse = await axios.post(otraurl, payload, {
                headers,
                headers: {
                ...headers,
                'Cookie': cookies.join('; ')
                }
            });
            
            const predicciones = posicionesResponse.data.message.result.predict;
            res.status(200).json({predicciones});
        } catch (error) {
            res.status(500).json({ error: 'Error fetching data' });
        }

    }
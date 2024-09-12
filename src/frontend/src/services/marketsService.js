import axios from "axios";

const url = `${process.env.REACT_APP_BACKEND_URL}/mercados`;
const urlIMA = "https://wabi-south-central-us-api.analysis.windows.net/public/reports/querydata?synchronous=true";
const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9,en;q=0.8",
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "x-powerbi-resourcekey": "8ec0d5ac-b5d7-4ad5-897c-076d33f42c48",
    "Referer": "https://app.powerbi.com/"
    };

export async function getPosiciones(newQuery, newOffset) { //Va a buscar al Mongo las posiciones arancelarias
    const response =  await axios.get(`${url}?query=${newQuery}&limit=10&offset=${newOffset}`);
    return response.data;
}

export async function detalle_ima(posicionArancelaria) { //Devuelve el detalle del IMA
    const paises = await ima_paises(posicionArancelaria);
    const body = `{\"version\":\"1.0.0\",\"queries\":[{\"Query\":{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"i\",\"Entity\":\"ima_unpivot\",\"Type\":0},{\"Name\":\"p\",\"Entity\":\"productos\",\"Type\":0}],\"Select\":[{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Valor\"}},\"Function\":0},\"Name\":\"Sum(ima_unpivot.Valor)\"},{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Dimension\"},\"Name\":\"ima_unpivot.dimension\"},{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Pais + imaGral\"},\"Name\":\"ima_unpivot.Pais + imaGral\"}],\"Where\":[{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p\"}},\"Property\":\"Codigo + desc\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"\'${posicionArancelaria}\'\"}}]]}}},{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Sorting\"}}],\"Values\":[${paises}]}}}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Dimension\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[1]}]},\"Secondary\":{\"Groupings\":[{\"Projections\":[0,2]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Window\":{\"Count\":100}},\"Secondary\":{\"Top\":{\"Count\":100}}},\"Aggregates\":[{\"Select\":0,\"Aggregations\":[{\"Min\":{}},{\"Max\":{}}]}],\"Version\":1},\"ExecutionMetricsKind\":1}}]},\"QueryId\":\"\",\"ApplicationContext\":{\"DatasetId\":\"8d196c10-223d-40f5-b770-7291cf7a5cdd\",\"Sources\":[{\"ReportId\":\"f826b8bc-6fef-40cd-9231-2c5d0438b7bc\",\"VisualId\":\"41a378da9309dc880c0b\"}]}}],\"cancelQueries\":[],\"modelId\":8198277}`;
    try {
        const response = await axios.post(urlIMA, body, { headers });
        const data = response.data;
        return parseDetalles(data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    };
};

function parseDetalles(data){
    const valor = data["results"][0]["result"]["data"]['dsr']['DS'][0];
    const paisesIMA = valor["SH"][0]["DM1"]; 
    const puntajesIMA = valor["PH"][0]['DM0']; 
    const paises = [];
    const puntajesCategorias = [];

    paisesIMA.forEach(pais => {
        paises.push(pais['G1']);
    });

    puntajesIMA.forEach(categoria => {
        const puntajes = Array(10).fill("N/A");
        const valores = categoria["X"];
        const i = 0

        for (let j = 0; j < valores.length; j++){
            const valor = valores[j]["M0"];
            const indice = valores[j]["I"];
            if(indice){i = indice;};
            if(valor){puntajes[i] = valor} else {puntajes[i] = 0;};
            i++;
        };

        const obj = {"titulo" : categoria["G0"], "puntajes" : puntajes };
        puntajesCategorias.push(obj);
    });
    const jsonParseado = {"paises" : paises, "puntajesPorCategoria" : puntajesCategorias};
    return jsonParseado
};


async function ima_paises(posicionArancelaria){
    const body = `{\"version\":\"1.0.0\",\"queries\":[{\"Query\":{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"i\",\"Entity\":\"ima_unpivot\",\"Type\":0},{\"Name\":\"subquery\",\"Expression\":{\"Subquery\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"i1\",\"Entity\":\"ima_unpivot\",\"Type\":0},{\"Name\":\"p1\",\"Entity\":\"productos\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i1\"}},\"Property\":\"Sorting\"},\"Name\":\"field\"}],\"Where\":[{\"Condition\":{\"Comparison\":{\"ComparisonKind\":0,\"Left\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i1\"}},\"Property\":\"Sorting\"}},\"Right\":{\"AnyValue\":{\"DefaultValueOverridesAncestors\":true}}}}},{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p1\"}},\"Property\":\"Codigo + desc\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"\'${posicionArancelaria}\'\"}}]]}}}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i1\"}},\"Property\":\"Sorting\"}},\"Function\":0}}}],\"Top\":10}}},\"Type\":2},{\"Name\":\"p\",\"Entity\":\"productos\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Sorting\"},\"Name\":\"ima_unpivot.Sorting\"}],\"Where\":[{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Sorting\"}}],\"Table\":{\"SourceRef\":{\"Source\":\"subquery\"}}}}},{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p\"}},\"Property\":\"Codigo + desc\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"\'${posicionArancelaria}\'\"}}]]}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Window\":{}}},\"IncludeEmptyGroups\":true,\"Version\":1},\"ExecutionMetricsKind\":1}}]},\"QueryId\":\"\",\"ApplicationContext\":{\"DatasetId\":\"8d196c10-223d-40f5-b770-7291cf7a5cdd\",\"Sources\":[{\"ReportId\":\"f826b8bc-6fef-40cd-9231-2c5d0438b7bc\",\"VisualId\":\"f4237206aa5e241a2c0e\"}]}}],\"cancelQueries\":[],\"modelId\":8198277}`;
    
    try {
        const response = await axios.post(urlIMA, body, { headers });
        const data = response.data;
        return parsePaises(data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
        };
};

function parsePaises(data){
    const lista = [];
    lista = data["results"][0]["result"]["data"]["dsr"]["DS"][0]["PH"][0]['DM1'];

    //for elem in lista:
    //Formato: `[{\"Literal\":{\"Value\":\"${elem["G1"]}D\"}}]`
    const concat = lista.map(elem => `[{\"Literal\":{\"Value\":\"${elem["G1"]}D\"}}]`).join(',');
    return concat;
};


export async function tabla_ima(pos) {//Valores Generales de IMA
    const posicionArancelaria = pos.replace(/"/g, '\\"');
    const body = `{\"version\":\"1.0.0\",\"queries\":[{\"Query\":{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"i\",\"Entity\":\"ima_unpivot\",\"Type\":0},{\"Name\":\"p\",\"Entity\":\"Paises\",\"Type\":0},{\"Name\":\"subquery\",\"Expression\":{\"Subquery\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"i1\",\"Entity\":\"ima_unpivot\",\"Type\":0},{\"Name\":\"p2\",\"Entity\":\"Paises\",\"Type\":0},{\"Name\":\"p11\",\"Entity\":\"productos\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i1\"}},\"Property\":\"Pais\"},\"Name\":\"field\"}],\"Where\":[{\"Condition\":{\"Comparison\":{\"ComparisonKind\":0,\"Left\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i1\"}},\"Property\":\"Pais\"}},\"Right\":{\"AnyValue\":{\"DefaultValueOverridesAncestors\":true}}}}},{\"Condition\":{\"Comparison\":{\"ComparisonKind\":0,\"Left\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p2\"}},\"Property\":\"flags_iso.URL\"}},\"Right\":{\"AnyValue\":{\"DefaultValueOverridesAncestors\":true}}}}},{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p11\"}},\"Property\":\"Codigo + desc\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"\'${posicionArancelaria}\'\"}}]]}}}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i1\"}},\"Property\":\"Sorting\"}},\"Function\":0}}}],\"Top\":10}}},\"Type\":2},{\"Name\":\"p1\",\"Entity\":\"productos\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Pais\"},\"Name\":\"ima_unpivot.Pais\"},{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"ima_total\"}},\"Function\":1},\"Name\":\"Sum(ima_unpivot.ima_total)\"},{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p\"}},\"Property\":\"flags_iso.URL\"},\"Name\":\"Paises.flags_iso.URL\",\"NativeReferenceName\":\" \"}],\"Where\":[{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Pais\"}}],\"Table\":{\"SourceRef\":{\"Source\":\"subquery\"}}}}},{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p1\"}},\"Property\":\"Codigo + desc\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"\'${posicionArancelaria}\'\"}}]]}}}],\"OrderBy\":[{\"Direction\":2,\"Expression\":{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"ima_total\"}},\"Function\":1}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,1,2]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Window\":{\"Count\":500}}},\"Version\":1},\"ExecutionMetricsKind\":1}}]},\"QueryId\":\"\",\"ApplicationContext\":{\"DatasetId\":\"8d196c10-223d-40f5-b770-7291cf7a5cdd\",\"Sources\":[{\"ReportId\":\"f826b8bc-6fef-40cd-9231-2c5d0438b7bc\",\"VisualId\":\"602bdc0682fd364320a4\"}]}}],\"cancelQueries\":[],\"modelId\":8198277}`;

    console.log(body);
    try {
        const response = await axios.post(urlIMA, body, { headers });
        const data = response.data;
        return parseIMA(data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    };

    //Response para pruebas
    //const response = {"jobIds":["a203db06-6ba4-4fb0-b812-8fb34b3f0121"],"results":[{"jobId":"a203db06-6ba4-4fb0-b812-8fb34b3f0121","result":{"data":{"timestamp":"2024-09-11T01:14:02.799Z","rootActivityId":"7e3f27d8-25b0-4f0f-aff7-952dc2adbb94","descriptor":{"Select":[{"Kind":1,"Depth":0,"Value":"G1","GroupKeys":[{"Source":{"Entity":"ima_unpivot","Property":"Pais"},"Calc":"G1","IsSameAsSelect":true}],"Name":"ima_unpivot.Pais"},{"Kind":2,"Value":"M1","Format":"0.0","Name":"Sum(ima_unpivot.ima_total)"},{"Kind":1,"Depth":0,"Value":"G2","GroupKeys":[{"Source":{"Entity":"Paises","Property":"flags_iso.URL"},"Calc":"G2","IsSameAsSelect":true}],"Name":"Paises.flags_iso.URL"}],"Expressions":{"Primary":{"Groupings":[{"Keys":[{"Source":{"Entity":"ima_unpivot","Property":"Pais"},"Select":0},{"Source":{"Entity":"Paises","Property":"flags_iso.URL"},"Select":2}],"Member":"DM1"}]}},"Version":2},"metrics":{"Version":"1.0.0","Events":[{"Id":"44158aeb-648f-4598-bfed-1ffa0069f8b5","Name":"Execute Semantic Query","Component":"DSE","Start":"2024-09-11T01:14:02.7997441Z","End":"2024-09-11T01:14:02.8621898Z"},{"Id":"775dbf54-e1d1-4473-802e-efbccbb9579f","ParentId":"44158aeb-648f-4598-bfed-1ffa0069f8b5","Name":"Execute DAX Query","Component":"DSE","Start":"2024-09-11T01:14:02.7997441Z","End":"2024-09-11T01:14:02.8621898Z","Metrics":{"RowCount":10}},{"Id":"42691E79-2B6C-45A7-9A3B-65A9D96AA041","ParentId":"775dbf54-e1d1-4473-802e-efbccbb9579f","Name":"Execute Query","Component":"AS","Start":"2024-09-11T01:14:02.85Z","End":"2024-09-11T01:14:02.867Z"},{"Id":"544CD51F-098A-4847-BDE1-E09632603CF9","ParentId":"42691E79-2B6C-45A7-9A3B-65A9D96AA041","Name":"Serialize Rowset","Component":"AS","Start":"2024-09-11T01:14:02.867Z","End":"2024-09-11T01:14:02.867Z"}]},"fromCache":false,"dsr":{"Version":2,"MinorVersion":1,"DS":[{"N":"DS0","PH":[{"DM1":[{"S":[{"N":"G1","T":1,"DN":"D0"},{"N":"G2","T":1,"DN":"D1"},{"N":"M1","T":3}],"C":[0,0,4]},{"C":[1,1,"3.7280000000000006"]},{"C":[2,2,"3.600000000000001"]},{"C":[3,3,"3.6000000000000005"]},{"C":[4,4],"R":4},{"C":[5,5,"3.5680000000000005"]},{"C":[6,6,"3.5560000000000005"]},{"C":[7,7],"R":4},{"C":[8,8,"3.3200000000000003"]},{"C":[9,9,"3.2319999999999998"]}]}],"IC":true,"HAD":true,"ValueDicts":{"D0":["Tailandia","Eslovaquia","Luxemburgo","Hong Kong, China","Maldivas","Rumania","Camerún","Canadá","España","Portugal"],"D1":["https://www.worldometers.info//img/flags/small/tn_th-flag.gif","https://www.worldometers.info//img/flags/small/tn_lo-flag.gif","https://www.worldometers.info//img/flags/small/tn_lu-flag.gif","https://www.worldometers.info/img/flags/small/tn_hk-flag.gif","https://www.worldometers.info//img/flags/small/tn_mv-flag.gif","https://www.worldometers.info//img/flags/small/tn_ro-flag.gif","https://www.worldometers.info//img/flags/small/tn_cm-flag.gif","https://www.worldometers.info//img/flags/small/tn_ca-flag.gif","https://www.worldometers.info//img/flags/small/tn_sp-flag.gif","https://www.worldometers.info//img/flags/small/tn_po-flag.gif"]}}]}}}}]};
    //return parseIMA(response);
};

function parseIMA(data){
    const valor = data["results"][0]["result"]["data"]['dsr']['DS'][0];
    const paises = valor["ValueDicts"]['D0'];
    const banderas = valor["ValueDicts"]['D1'];
    const puntajes = valor["PH"][0]['DM1'];
    const response = [];

    for (let i = 0; i < paises.length; i++) {

        let pais = paises[puntajes[i]['C'][0]]; 
        let bandera = banderas[puntajes[i]['C'][1]]; 
        let puntaje = 0.0;
        let skip = null;

        if(puntajes[i]["Ø"]){
            skip = puntajes[i]["Ø"];
            if(skip == 1){pais = 'N/A'}; //sin nombre (creo que nunca pasa)
            if(skip == 2){bandera = 'images/logo_.jpg'}; //sin bandera
        }

        if(puntajes[i]['R'] && puntajes[i]['C'].length <3){
            puntaje = response[i-1].puntaje;
        } else {
            if(!skip){
                puntaje = puntajes[i]['C'][2];
            } else {
                puntaje = puntajes[i]['C'][1];
            }
        }

        response.push({
            pais: pais,
            puntaje: puntaje,
            bandera: bandera
          });
    };
    
   /* for (let i = 0; i < paises.length; i++) {
        const pais = paises[i];
        const puntaje = valores[i];
        const bandera = banderas[i];
        response.push({
            pais: pais,
            puntaje: puntaje,
            bandera: bandera
          });
    };
*/
    return response;
}

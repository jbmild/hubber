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

export async function getPosiciones() { //Va a buscar al Mongo las posiciones arancelarias
    const response =  await axios.get(`${url}`);
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


export async function tabla_ima(posicionArancelaria) {//Valores Generales de IMA
    const body = `{\"version\":\"1.0.0\",\"queries\":[{\"Query\":{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"i\",\"Entity\":\"ima_unpivot\",\"Type\":0},{\"Name\":\"p\",\"Entity\":\"Paises\",\"Type\":0},{\"Name\":\"subquery\",\"Expression\":{\"Subquery\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"i1\",\"Entity\":\"ima_unpivot\",\"Type\":0},{\"Name\":\"p2\",\"Entity\":\"Paises\",\"Type\":0},{\"Name\":\"p11\",\"Entity\":\"productos\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i1\"}},\"Property\":\"Pais\"},\"Name\":\"field\"}],\"Where\":[{\"Condition\":{\"Comparison\":{\"ComparisonKind\":0,\"Left\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i1\"}},\"Property\":\"Pais\"}},\"Right\":{\"AnyValue\":{\"DefaultValueOverridesAncestors\":true}}}}},{\"Condition\":{\"Comparison\":{\"ComparisonKind\":0,\"Left\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p2\"}},\"Property\":\"flags_iso.URL\"}},\"Right\":{\"AnyValue\":{\"DefaultValueOverridesAncestors\":true}}}}},{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p11\"}},\"Property\":\"Codigo + desc\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"\'${posicionArancelaria}\'\"}}]]}}}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i1\"}},\"Property\":\"Sorting\"}},\"Function\":0}}}],\"Top\":10}}},\"Type\":2},{\"Name\":\"p1\",\"Entity\":\"productos\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Pais\"},\"Name\":\"ima_unpivot.Pais\"},{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"ima_total\"}},\"Function\":1},\"Name\":\"Sum(ima_unpivot.ima_total)\"},{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p\"}},\"Property\":\"flags_iso.URL\"},\"Name\":\"Paises.flags_iso.URL\",\"NativeReferenceName\":\" \"}],\"Where\":[{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"Pais\"}}],\"Table\":{\"SourceRef\":{\"Source\":\"subquery\"}}}}},{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p1\"}},\"Property\":\"Codigo + desc\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"\'${posicionArancelaria}\'\"}}]]}}}],\"OrderBy\":[{\"Direction\":2,\"Expression\":{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"i\"}},\"Property\":\"ima_total\"}},\"Function\":1}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,1,2]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Window\":{\"Count\":500}}},\"Version\":1},\"ExecutionMetricsKind\":1}}]},\"QueryId\":\"\",\"ApplicationContext\":{\"DatasetId\":\"8d196c10-223d-40f5-b770-7291cf7a5cdd\",\"Sources\":[{\"ReportId\":\"f826b8bc-6fef-40cd-9231-2c5d0438b7bc\",\"VisualId\":\"602bdc0682fd364320a4\"}]}}],\"cancelQueries\":[],\"modelId\":8198277}`;

    try {
        const response = await axios.post(urlIMA, body, { headers });
        const data = response.data;
        return parseIMA(data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    };

    //const response = {"jobIds":["3e0c0f0c-4e36-4e03-9633-1ca81c67083a"],"results":[{"jobId":"3e0c0f0c-4e36-4e03-9633-1ca81c67083a","result":{"data":{"timestamp":"2024-09-04T17:47:31.134Z","rootActivityId":"cdafb840-64ce-4da4-9db3-14c26c7baa88","descriptor":{"Select":[{"Kind":1,"Depth":0,"Value":"G1","GroupKeys":[{"Source":{"Entity":"ima_unpivot","Property":"Pais"},"Calc":"G1","IsSameAsSelect":"True"}],"Name":"ima_unpivot.Pais"},{"Kind":2,"Value":"M1","Format":"0.0","Name":"Sum(ima_unpivot.ima_total)"},{"Kind":1,"Depth":0,"Value":"G2","GroupKeys":[{"Source":{"Entity":"Paises","Property":"flags_iso.URL"},"Calc":"G2","IsSameAsSelect":"True"}],"Name":"Paises.flags_iso.URL"}],"Expressions":{"Primary":{"Groupings":[{"Keys":[{"Source":{"Entity":"ima_unpivot","Property":"Pais"},"Select":0},{"Source":{"Entity":"Paises","Property":"flags_iso.URL"},"Select":2}],"Member":"DM1"}]}},"Version":2},"metrics":{"Version":"1.0.0","Events":[{"Id":"b00fa0af-f351-4198-b37c-e303fda3df2c","Name":"Execute Semantic Query","Component":"DSE","Start":"2024-09-04T17:47:31.1344926Z","End":"2024-09-04T17:47:31.1808944Z"},{"Id":"84ee4d02-5c97-4eff-a18e-3aa4f5d1a9a9","ParentId":"b00fa0af-f351-4198-b37c-e303fda3df2c","Name":"Execute DAX Query","Component":"DSE","Start":"2024-09-04T17:47:31.1344926Z","End":"2024-09-04T17:47:31.1808944Z","Metrics":{"RowCount":10}},{"Id":"9BE852F3-EC53-44F9-B4B0-9BC9EF96AF47","ParentId":"84ee4d02-5c97-4eff-a18e-3aa4f5d1a9a9","Name":"Execute Query","Component":"AS","Start":"2024-09-04T17:47:31.16Z","End":"2024-09-04T17:47:31.18Z"},{"Id":"D9C28E61-276A-480A-B0C8-F2B95D82C268","ParentId":"9BE852F3-EC53-44F9-B4B0-9BC9EF96AF47","Name":"Serialize Rowset","Component":"AS","Start":"2024-09-04T17:47:31.18Z","End":"2024-09-04T17:47:31.18Z"}]},"fromCache":"False","dsr":{"Version":2,"MinorVersion":1,"DS":[{"N":"DS0","PH":[{"DM1":[{"S":[{"N":"G1","T":1,"DN":"D0"},{"N":"G2","T":1,"DN":"D1"},{"N":"M1","T":3}],"C":[0,0,5.336]},{"C":[1,1,5.264]},{"C":[2,2,"5.112000000000001"]},{"C":[3,3,5.064]},{"C":[4,4,"4.9839999999999991"]},{"C":[5,5,"4.9319999999999995"]},{"C":[6,6,4.904]},{"C":[7,7,4.744]},{"C":[8,8,4.7]},{"C":[9,9,"4.6419999999999995"]}]}],"IC":"True","HAD":"True","ValueDicts":{"D0":["Chile","Brasil","China","Alemania","Canadá","Ucrania","Namibia","Israel","Bahamas","Italia"],"D1":["https://www.worldometers.info//img/flags/small/tn_ci-flag.gif","https://www.worldometers.info//img/flags/small/tn_br-flag.gif","https://www.worldometers.info//img/flags/small/tn_ch-flag.gif","https://www.worldometers.info//img/flags/small/tn_gm-flag.gif","https://www.worldometers.info//img/flags/small/tn_ca-flag.gif","https://www.worldometers.info//img/flags/small/tn_up-flag.gif","https://www.worldometers.info//img/flags/small/tn_wa-flag.gif","https://www.worldometers.info//img/flags/small/tn_is-flag.gif","https://www.worldometers.info//img/flags/small/tn_bf-flag.gif","https://www.worldometers.info//img/flags/small/tn_it-flag.gif"]}}]}}}}]};
    //return parseIMA(response);
};

function parseIMA(data){
    const valor = data["results"][0]["result"]["data"]['dsr']['DS'][0];
    const paises = valor["ValueDicts"]['D0'];
    const banderas = valor["ValueDicts"]['D1'];
    const puntajes = valor["PH"][0]['DM1'];
    const valores = [];
    const response = [];

    puntajes.forEach(puntaje => {
        valores.push(puntaje['C'][2]);
    });
    
    for (let i = 0; i < paises.length; i++) {
        const pais = paises[i];
        const puntaje = valores[i];
        const bandera = banderas[i];
        response.push({
            pais: pais,
            puntaje: puntaje,
            bandera: bandera
          });
    };

    return response;
}

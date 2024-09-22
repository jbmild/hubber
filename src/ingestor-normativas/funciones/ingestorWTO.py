import requests
import datetime
from bs4 import BeautifulSoup
from .mongo_functions import connectMongoDB, insertar_lista
from .wtoparser import get_normativa, parse_normativa

def get_normativas(producto):
    listaPaises = [
        "Antigua y Barbuda",
        "Argentina",
        "Barbados",
        "Bolivia",
        "Brasil",
        "Canadá",
        "Chile",
        "Colombia",
        "Costa Rica",
        "Cuba",
        "Dominica",
        "Ecuador",
        "El Salvador",
        "Estados Unidos de América",
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
        "Trinidad y Tobago",
        "Uruguay"
    ]

    
    if producto == 1:
        posicion = "1905*"

    if producto == 2:
        posicion = "2204*"
        
    if producto == 3:
        posicion = "040900"

    headers = {
            "user-agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }

    urlBase = "https://docs.wto.org/dol2fe/Pages/FE_Search/FE_S_S006.aspx?"

    #Parametros de busqueda
    params_1="MetaCollection=WTO&SymbolList=%22G%2fTBT%2fN%2f*%22+OR+%22G%2fSPS%2fN%2f*%22"

    #Listado de paises de america. Formato #"nombre"+OR+"nombre"
    paises = ''.join(('"'+str(pais)+'"'+"+OR+") for pais in listaPaises[0:-1])
    paises = paises + '"'+listaPaises[len(listaPaises)-1]+'"'
    params_2 = "&ConcernedCountryList="+paises

    #Fechas de busqueda. Date = DD %2f MM %2f AAAA
    fechaHoy = datetime.datetime.today()
    semanaPasada = fechaHoy - datetime.timedelta(days=7)

    fechaDesde = semanaPasada.strftime("%d")+"%2f"+semanaPasada.strftime("%m")+"%2f"+semanaPasada.strftime("%Y")
    fechaHasta = fechaHoy.strftime("%d")+"%2f"+fechaHoy.strftime("%m")+"%2f"+fechaHoy.strftime("%Y")

    params_3 = "&IssuingDateFrom="+fechaDesde+"&IssuingDateTo="+fechaHasta

    params_4 = "&Language=SPANISH&HSClassificationList=%22("+posicion+")%22&SearchPage=FE_S_S001&languageUIChanged=true#"

    urlListado = urlBase+params_1+params_2+params_3+params_4

    responseListado = requests.get(urlListado, headers=headers)

    soupListado = BeautifulSoup(responseListado.text, features="lxml")

    #Cantidad de normativas de la ultima semana
    cantidad = int(soupListado.find("span", id="ctl00_MainPlaceHolder_lbl010").text)

    if cantidad > 0:
        listaNormativas = []
        divResultados = soupListado.find("div", id="searchResults")
        normativas = divResultados.findAll("a", class_="FECatalogueSymbolPreviewCss")
        
        for normativa in normativas:
            #Parametros necesarios para la url del documento
            idCatalogo, language = get_normativa(normativa.get("onclick"))
            tipoDoc = (normativa.text.split('/')[1])

            urlDocumento = 'https://docs.wto.org/dol2fe/Pages/FE_Search/FE_S_S009-Html.aspx?Id='+idCatalogo+'&DocumentPartNumber=1&Language='+language+'&Window=L&PreviewContext=DP'

            #Request
            responseDoc = requests.get(urlDocumento, headers=headers)
            docNormativa = BeautifulSoup(responseDoc.text, features='lxml')
            #Tabla con contenido
            tabla = docNormativa.findAll("table")[1]

            normativaParseada = parse_normativa(tabla, language, tipoDoc, producto)
            listaNormativas.append(normativaParseada)
        

        cliente = connectMongoDB()
        insertar_lista(listaNormativas, cliente, "chatbot", "barrerasComerciales")
        cliente.close()

        
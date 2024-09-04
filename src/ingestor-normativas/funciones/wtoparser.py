import re
from traductor import translate

def get_normativa(url):
    idsCatalogos = re.search(r'CatalogueIdList[\w=,]+', url).group().split('=')[1].split(',')
    current = int(re.search(r'CurrentCatalogueIdIndex[\w=,]+', url).group().split('=')[1])
    spanish = re.search(r'SpanishRecord=\w+', url).group().split("=")[1]
    english = re.search(r'EnglishRecord=\w+', url).group().split("=")[1]
    
    if(spanish == 'True'):
        language = "S"
    elif(english == 'True'):
        language = "E"
    else:
        language = "F"

    idCatalogo = idsCatalogos[current]
    return idCatalogo, language

def tituloSPS(titulo):
    opciones = titulo.split(',')
    titulos = []
    for opcion in opciones:
        if re.match(r'\[X\]', opcion):
            titulos.append(opcion)
    if len(titulos) > 1:
        final = ''.join((tit+', ') for tit in titulos[0:-1])
        final = final + titulos[len(titulos)-1]
    else: 
        final = titulos[0]
    
    final = final.replace('[X]', '').strip()
    return final

def parse_normativa(tabla, language, tipoDoc):
    tds = []
    rows = tabla.find_all("tr", recursive = False)
    
    for row in rows:
        act_tds = (row.find_all("td", recursive = False))
        for td in act_tds:
            tds.append(td)

    pais = tds[1].text.split(":")[1].strip().split("\n")[0].strip()
    agencia = tds[3].text.split(":")[1].strip().split("\n")[0].strip()
    normativa = tds[9].text.split(":")[1].strip().split("\n")[0].strip()
    titulo = tds[13].text.split(":")[1].strip().split("\n")[0].strip()
    descripcion = tds[11].text.split(":")[1].strip().split("\n")[0].strip()

    if tipoDoc == 'SPS':
        titulo = tituloSPS(titulo)

    if language != 'S':
        titulo = translate(titulo, "es")
        descripcion = translate(descripcion, "es")

    normativa = {
        "pais" : pais,
        "titulo" : titulo,
        "descripcion" : descripcion,
        "agencia" : agencia,
        "normativaOrigen" : normativa
    }
    return normativa
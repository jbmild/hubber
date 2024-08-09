import requests
from urllib.parse import quote
import json

def translate(text, idioma):

  texto = text.replace('. ', '.')
  texto = quote(texto)
  # Define la URL de la API
  url = "https://api.allorigins.win/get?url=https%3A%2F%2F655.mtis.workers.dev%2Ftranslate%3Ftext%3D"+texto+"%26source_lang%3Den%26target_lang%3D"+idioma

  response = requests.get(url, headers={"Content-Type": "application/json"})

  try:
    result = response.json()
  except:
    return text
  
  resp = json.loads(result['contents'])

  return (resp['response']["translated_text"])
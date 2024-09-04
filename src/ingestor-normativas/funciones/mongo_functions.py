from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


def connectMongoDB():
    uri = 'mongodb+srv://Admin:ComercioExt@comercioexterior.pndpmeb.mongodb.net/?retryWrites=true&w=majority&appName=ComercioExterior'

    client = MongoClient(uri, server_api=ServerApi('1'))

    try:
        client.admin.command('ping')
        return client
    except Exception as e:
        return e

def insertar_lista(lista, client, db, collection):
    mydb = client[db]
    mycol = mydb[collection]
    mycol.insert_many(lista)
    
import axios from "axios";

const url = `${process.env.REACT_APP_BACKEND_URL}/arbol`

export async function getSecciones() {
    const response =  await axios.get(`${url}/secciones`);
    return response.data;
}

export async function getHijos(padre) {
    const response =  await axios.get(`${url}/hijos?padre=${padre}`);
    return response.data;
}
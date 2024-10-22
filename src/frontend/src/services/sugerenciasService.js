import axios from "axios";

const url = `${process.env.REACT_APP_BACKEND_URL}`;

export async function getSugerencias(){
    const response = await axios.get(`${url}/sugerencias`, { withCredentials: true });
    return response.data;
}

export async function getSugerencia(pais, producto){
    const response = await axios.get(`${url}/sugerencia?pais=${pais}&producto=${producto}`, { withCredentials: true });
    return response.data;
}
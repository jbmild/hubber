import axios from "axios";
const url = `${process.env.REACT_APP_BACKEND_URL}/paises`

export async function getPaises() {
    const response =  await axios.get(`${url}`);
    return response.data;
}
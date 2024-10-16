import axios from "axios";

const url = `${process.env.REACT_APP_BACKEND_URL}/productos`

export async function getProductos(search, page) {
    const queryParams = new URLSearchParams({
        search,
        page
    });

    const response = await axios.get(`${url}?${queryParams.toString()}`)
    return response.data;
}
import axios from "axios";

const url = `${process.env.REACT_APP_BACKEND_URL}/normativas`

export async function getNormativas(page, limit, filters) {
    const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
    });

    const response =  await axios.get(`${url}?${queryParams.toString()}`, { withCredentials: true });
    console.log(response);
    return response.data;
}

export async function getNormativa(idNormativa) {
    const response =  await axios.get(`${url}/${idNormativa}`);
    console.log(response);
    return response.data;
}

import axios from "axios";
const url = `${process.env.REACT_APP_BACKEND_URL}/chatbot`

export async function sendMessage(message) {
    const response =  await axios.post(`${url}/message`, { message : message });
    return response.data.message;
}

export async function setPais(pais) {
    const response = await axios.post(`${url}/pais`, { pais : pais })
    return response.data.message;
}
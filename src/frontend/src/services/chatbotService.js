import axios from "axios";
const url = `${process.env.REACT_APP_BACKEND_URL}/chatbot`

export async function sendMessage(message, selectedOption) {
    const response =  await axios.post(`${url}/message`, { message : message, chatKey: selectedOption }, { withCredentials: true });
    return response.data.message;
}

export async function setPais(pais) {
    const response = await axios.post(`${url}/pais`, { pais : pais }, { withCredentials: true })
    return response.data.message;
}
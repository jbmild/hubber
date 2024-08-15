import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL;

export async function sendMessage(message) {
    const response =  await axios.post(`${url}/chatbot`, { message : message });
    return response.data.message;
}
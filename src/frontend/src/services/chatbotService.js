import axios from "axios";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sendMessage(message) {
    await sleep(5000);

    return `el mensaje enviado es ${message}`;
}
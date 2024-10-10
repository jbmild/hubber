import axios from "axios";


export async function getNotificaciones(){
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/notificaciones-usuario`, { withCredentials: true });
    return response.data;
}

export async function tieneNuevasNotificaciones(){
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/notificaciones-usuario`, { withCredentials: true });
    const tieneNuevasNotificaciones = response.data.some(notif => notif.estado === "Nueva");
    return tieneNuevasNotificaciones;
}

export async function cambiarEstado(idNotificacion, estado) {
    const response =  await axios.put(`${process.env.REACT_APP_BACKEND_URL}/notificaciones/${idNotificacion}`, {estado : estado});
    console.log(response);
    return response.data;
}

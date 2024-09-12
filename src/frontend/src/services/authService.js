import axios from 'axios';

export async function authOauth() {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
}

export async function createUser(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/create`, data);
}

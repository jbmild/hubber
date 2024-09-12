import axios from 'axios';

export async function authOauth(provider) {
    const clientId = provider === 'google' ? '324276260857-smhaobomhaahqqaa1j20t88t8haqnnmk.apps.googleusercontent.com' : 'YOUR_IOS_CLIENT_ID'; // estos van en archivo de cfg
    const redirectUri = `http://localhost:3000/auth/callback`; // redireccionar al back para que verifique con oauth y setee la cookie del token/codigo
    const responseType = 'code';
    const scope = 'profile email';

    //const authUrl = `https://accounts.${provider}.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
}

export async function createUser(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/create`, data);
}

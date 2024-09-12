import axios from 'axios';
//import Config from '../appConfig.json';
import Cookies from 'js-cookie';

export async function isAuthenticated() {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/profile`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            const user = await response.json();
            return !!user.email; // If the user data is valid, return true (authenticated)
        }
    } catch (error) {
        console.error('Error checking authentication status:', error);
    }
    console.log("devuelve false?");
    return false; // If no session or the session is invalid, return false
}

export function authStandard(data, callback) {
    /*
    const response = await axios.post('http://localhost:5000/auth/login', { username, password }).then(
        (response) => {
            if(response.status === 200){
                sessionStorage.setItem('jwt', response.data.response.token);
                return {
                    status :response.status
                }            
            }else{
                return {
                    status : response.status,
                    message: response.statusText
                }
            }
        }
    );
    */

    //Para probar despues cambiar para que use la respuesta y datos desde el back
    Cookies.set('auth', data.username);
    callback.call();
}

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

export async function logOut() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
            withCredentials: true
        });

        if (response.status === 200) {
            // Clear any client-side auth data


            return true; // Logout successful
        } else {
            console.error('Logout failed:', response.statusText);
            return false; // Logout failed
        }
    } catch (error) {
        console.error('Error during logout:', error);
        return false; // Logout failed
    }
}
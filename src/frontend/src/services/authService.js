import axios from 'axios';
//import Config from '../appConfig.json';
import Cookies from 'js-cookie';

const url = '';

export function isAuthenticated () {
    return Cookies.get('auth') ? true : false;
}

export function authStandard (data, callback) {
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

export function authOauth (provider) {
    const clientId = provider === 'google' ? 'YOUR_GOOGLE_CLIENT_ID' : 'YOUR_IOS_CLIENT_ID'; // estos van en archivo de cfg
    const redirectUri = `http://localhost:5000/auth/callback`; // redireccionar al back para que verifique con oauth y setee la cookie del token/codigo
    const responseType = 'code';
    const scope = 'profile email';

    const authUrl = `https://accounts.${provider}.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = authUrl;
}

export async function createUser (data) {
    return axios.post(`${url}/users`, data);
}

export function logOut () {
    Cookies.remove('auth');
}

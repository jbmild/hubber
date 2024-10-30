import axios from 'axios';

export async function isAuthenticated() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/profile`, {
            withCredentials: true
        });
        if (response && response.status == 200) {
            const user = await response.data;
            return !!user.email; // If the user data is valid, return true (authenticated)
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return false;
        } else {
            console.error('Error checking authentication status:', error);
        }
    }
    console.log("devuelve false?");
    return false; // If no session or the session is invalid, return false
}

export async function getUser() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
            withCredentials: true
        });
        if (response && response.status == 200) {
            const user = await response.data;
            return user; // If the user data is valid, return true (authenticated)
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return false;
        } else {
            console.error('Error checking authentication status:', error);
        }
    }
    console.log("devuelve false?");
    return false; // If no session or the session is invalid, return false
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
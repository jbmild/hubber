import axios from 'axios';

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

export async function getUserName() {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            const user = await response.json();
            return user; // If the user data is valid, return true (authenticated)
        }
    } catch (error) {
        console.error('Error checking authentication status:', error);
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
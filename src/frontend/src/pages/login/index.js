import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert, Box, Link, Divider } from '@mui/material';
import { GoogleIcon } from '../../components/icons';
import { authOauth } from '../../services/authService';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, { username, password })
                if (response) {
                    if (response.data.error) {
                        toast(response.data.message)
                        return;
                    } else {
                        toast("Ingreso correctamente.")
                        navigate("/");
                        return;
                    }

                }
                throw new Error(response.message);
            } catch (err) {
                console.log(err);
                toast.error("Usuario/contraseña incorrectos")
            }
            return;
        }
        alert("pleae provide a valid input");
    };

    const forgotPassword = () => {
    };


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="70vh"
            bgcolor="#f4f4f4"
        >
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center">
                        Login
                    </Typography>
                    <form onSubmit={handleSubmitEvent}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Login
                        </Button>
                    </form>
                    <Box mt={2}>
                        <Button
                            variant="outlined"
                            onClick={() => authOauth()}
                            fullWidth
                            startIcon={<GoogleIcon />}
                        >
                            Login with Google
                        </Button>
                    </Box>
                    <Divider style={{ padding: "10px 0" }} />
                    <Link href="#" style={{ padding: "10px 0 0 0", display: "block" }}>Olvide mi contraseña</Link>
                    <Link href="/register" style={{ padding: "5px 0", display: "block" }}>¿No tenes usuario? Registrate!</Link>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
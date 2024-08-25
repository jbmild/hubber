import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Alert, Box, Link, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { GoogleIcon, AppleIcon } from '../../components/icons';
import { authStandard, authOauth } from '../../services/authService';
import { Block } from '@mui/icons-material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            authStandard({ username, password }, () => { navigate('/') });

            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Something went wrong');
        }
    };

    const handleOAuthLogin = (provider) => {
        authOauth(provider);
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
                    <form onSubmit={handleLogin}>
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
                        {error && <Alert severity="error" style={{ marginTop: '1rem' }}>{error}</Alert>}
                    </form>
                    <Box mt={2}>
                        <Button
                            variant="outlined"
                            onClick={() => handleOAuthLogin('google')}
                            fullWidth
                            startIcon={<GoogleIcon />}
                        >
                            Login with Google
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleOAuthLogin('ios')}
                            fullWidth
                            startIcon={<AppleIcon />}
                            style={{ marginTop: '8px' }}
                        >
                            Login with iOS
                        </Button>
                    </Box>
                    <Divider style={{padding: "10px 0"}}/>
                    <Link href="#" style={{padding: "10px 0 0 0", display: "block"}}>Olvide mi contraseña</Link>
                    <Link href="/register" style={{padding: "5px 0", display: "block"}}>¿No tenes usuario? Registrate!</Link>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
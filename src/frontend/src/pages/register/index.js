import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography, Alert, Box, IconButton } from '@mui/material';
import { GoogleIcon, AppleIcon } from '../../components/icons';
import { createUser, authOauth } from '../../services/authService';
import { toast } from 'react-toastify';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden.")
            return;
        }

        createUser({ username, email, password }).then((response) => {
            toast.success("El usuario fue creado.")
            navigate("/login");
        }).catch((error) => {
            toast.error(error.response?.data?.error || error.message);
        });
    };

    const handleOAuthLogin = (provider) => {
        authOauth(provider);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            bgcolor="#f4f4f4"
        >
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center">
                        Register
                    </Typography>
                    <form onSubmit={handleRegister}>
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
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Register
                        </Button>
                    </form>
                    <Box mt={2}>
                        <Button
                            variant="outlined"
                            onClick={() => handleOAuthLogin('google')}
                            fullWidth
                            startIcon={<GoogleIcon />}
                        >
                            Register with Google
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleOAuthLogin('ios')}
                            fullWidth
                            startIcon={<AppleIcon />}
                            style={{ marginTop: '8px' }}
                        >
                            Register with iOS
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Register;
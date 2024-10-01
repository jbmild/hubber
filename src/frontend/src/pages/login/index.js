import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { GoogleIcon } from '../../components/icons';

const Login = () => {
    const authOauth = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
    }

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
                        Bienvenido a Hubber
                    </Typography>
                    <Box mt={2}>
                        <Button
                            variant="outlined"
                            onClick={() => authOauth()}
                            fullWidth
                            startIcon={<GoogleIcon />}
                        >
                            Ingresar / Registrarme con Google
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
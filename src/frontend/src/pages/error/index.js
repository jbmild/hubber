import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const ErrorPage = ({message}) => {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '50vh', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <Typography variant="h2">
                    Oops!
                </Typography>
                <Typography variant="h5">
                    Parece que algo salió mal.
                </Typography>
            </Box>
            { message &&
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: '2em'}}>
                    <Typography variant="body1">
                        {message}
                    </Typography>
                </Box>
            }
        </Box>
    );
}

export default ErrorPage;
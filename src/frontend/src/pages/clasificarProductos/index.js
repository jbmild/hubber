import ArbolPosiciones from "components/arbolPosiciones";
import React from 'react';
import { 
    Box,
    Grid,
    Paper,
} from '@mui/material';
import ClasificaProducto from "components/clasificadorProductos";


const ProductClassifier = () => {

    return(
        <Box  alignItems="center"
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1em',
            flexDirection: 'column'
          }}>
            <Paper style={{transition: 'all 0.3s ease'}}
            sx={{
                    maxWidth: '80vw',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column'
            }}>
                <Grid container spacing={2} alignItems="center">
                        <ClasificaProducto />
                    <Grid item xs={12} sm={10} md={10}>
                        <ArbolPosiciones />
                    </Grid>
                </Grid>

            </Paper>
        </Box>
    )
}

export default ProductClassifier
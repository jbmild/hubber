import ArbolPosiciones from "components/arbolPosiciones";
import { clasificar } from "services/clasificadorService";
import React, { useState } from 'react';
import { 
    Button,
    Input,
    Box,
    Grid,
    Paper,
} from '@mui/material';
import { Search as SearchIcon
} from '@mui/icons-material';


const ProductClassifier = () => {

    const [inputValue, setInputValue] = useState(''); 


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        const prediccion = await clasificar(inputValue);
        console.log(prediccion);
    };

    return(
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: { xs: '38vh', sm: '32vh', md: '30vh' },
            flexDirection: 'column'
          }}>
            <Paper  sx={{
                    padding: { xs: '4em', sm: '2.5em', md: '2em' },
                    maxWidth: '80vw',
                    width: '100%',
                    height: { xs: '15vh', sm: '13vh', md: '13vh' },
                    display: 'flex',
                    flexDirection: 'column'
            }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={9} md={10}>
                        <Input 
                            fullWidth placeholder='Ingrese nombre del producto' 
                            value={inputValue} 
                            onChange={handleInputChange}>
                        </Input>
                    </Grid>
                    <Grid item xs={12} sm={3} md={2}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleButtonClick}
                            disabled={inputValue.trim() === ''}
                            sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.5em',
                            textTransform: 'none',
                            '& .MuiButton-startIcon': {
                                marginRight: '0.5em'
                            }
                            }}
                            startIcon={<SearchIcon />}
                            >
                            Buscar
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={10} md={10}>
                        <ArbolPosiciones />
                    </Grid>
                </Grid>

            </Paper>
        </Box>
    )
}

export default ProductClassifier
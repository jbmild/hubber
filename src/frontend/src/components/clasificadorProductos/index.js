import { clasificar } from "services/clasificadorService";
import React, { useState } from 'react';
import { 
    Box,
    Button,
    Input,
    Grid,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import { Search as SearchIcon
} from '@mui/icons-material';

function ClasificaProducto({}){

    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState(''); 
    const [predicciones , setPrediccionValue] = useState([])
    const [showTable, setShowTable] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        setLoading(true);
        const response = await clasificar(inputValue);
        setPrediccionValue(response)
        console.log(response);
        setLoading(false);
        setShowTable(true);
    };

return(
    <Grid container spacing={2} alignItems={'center'} margin={'2em'} marginBottom={"0em"}>
        <Grid item xs={12} sm={9} md={10}>
            <Input
                fullWidth placeholder='Ingrese el nombre del producto'
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

                {loading ?
                            <Table>
                                <TableRow key={'spinner'}>
                                    <TableCell colSpan={12} sx={{border: '0px'}}>
                                    <LinearProgress color="primary" />
                                    </TableCell>
                                </TableRow>
                            </Table>
                : 
                showTable && (
                <Table sx={{margin: '1em'}}>
                <TableBody>
                {predicciones.map((prediccion) => 
                    (    
                    <TableRow >
                        <TableCell >
                            {prediccion.posicion}
                        </TableCell>
                    </TableRow>
                    ))}
                    <TableRow>
                    <Box 
                        sx={{
                        marginTop: '2em',
                        height: '1.5em',
                        fontSize: 10,
                        fontWeight: 'light',
                        fontStyle: 'oblique',
                        flexDirection: 'column',
                        }}>
                        <p>
                        Fuente: Organización Mundial de Aduanas - Proyecto BACUDA. <a target="_blank" href='http://49.50.165.5:19090/page/mainFormEn'> IA clasificadora de Productos</a><br/ >
                        Nota: Las posiciones arancelarias proporcionadas por la herramienta son de carácter meramente orientativo. Hubber no se hace responsable por la precisión de la misma. 
                        </p>
                    </Box> 
                </TableRow>
                </TableBody>
                </Table>
            )}

        </Grid>
    )}

export default ClasificaProducto;
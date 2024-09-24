import PosicionRow from "components/arbolPosiciones";
import { clasificar } from "services/clasificadorService";
import { getSecciones } from "services/arbolService";
import React, { useState ,useCallback} from 'react';
import { 
    Button,
    Dialog,
    DialogTitle,
    Input,
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
} from '@mui/material';
import { Search as SearchIcon,
    Close as CloseIcon
} from '@mui/icons-material';


const ProductClassifier = () => {

    const [inputValue, setInputValue] = useState(''); 
    const [openModal, setOpenModal] = useState(false);
    const [secciones, setSecciones] = useState([]);


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        const prediccion = await clasificar(inputValue);
        console.log(prediccion);
    };

    const handleCloseModal = useCallback(() => {
        setOpenModal(false);  
      });

    const handleArbolClick = async () => {
        getSecciones().then(res => {
            setSecciones(res.secciones);
        })
        //console.log(secciones);
        setOpenModal(true);
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
                        <p><Button   
                        
                            sx={{textTransform: 'none',
                                '&:hover': {
                                    textDecoration: 'underline', 
                                    backgroundColor: 'transparent'}}}
                                    onClick={handleArbolClick}>
                            Búsqueda en forma de árbol</Button></p>
                    </Grid>
                </Grid>
                <Dialog 
                
                        open={openModal}           
                        onClose={handleCloseModal}
                        sx={{
                            '& .MuiDialog-paper': {
                            maxWidth: {xs:"100%", sm:"95%" ,md:'85%'},
                            width: { xs: '100vw', sm: '95vw', md: '90vw' }, 
                            height: { xs: '90vh', md: '90vh' }, 
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            },
                }}>
                    <DialogTitle sx={{position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1}}> Búsqueda en forma de árbol
                        <Button onClick={handleCloseModal} sx={{ position: 'absolute', right: 0, top: 0 , paddingBlock: '1em'}}>
                        <CloseIcon />
                        </Button>
                    </DialogTitle>
                    <Table>
                        <TableBody>
                            {(secciones && secciones.length > 0) ? (
                                secciones.map((seccion) => (
                                <PosicionRow key={seccion._id} seccion={seccion} nivel={0} />
                            ))
                            ) : (
                            <p>Cargando secciones...</p>  
                            )}
                        </TableBody>
                    </Table>

                </Dialog>
            </Paper>
        </Box>
    )
}

export default ProductClassifier
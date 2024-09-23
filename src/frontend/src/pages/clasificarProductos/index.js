import { clasificar } from "services/clasificadorService";
import { getHijos, getSecciones } from "services/arbolService";
import React, { useState ,useCallback} from 'react';
import { 
    Button,
    Collapse,
    Dialog,
    DialogTitle,
    Input,
    Box,
    Grid,
    Paper,
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableContainer
} from '@mui/material';
import { Search as SearchIcon,
    Close as CloseIcon,
    Margin,
} from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

function PosicionRow(seccion) {
    const [open, setOpen] = React.useState(false);
    const [hijos, setHijos] = useState([]);
  
    const handleOpenRow = () => {
        if(!open){
            getHijos(seccion.seccion.posicion).then(res => {
                setHijos(res.posiciones);
            })
        } else {
            setHijos([]);
        }
        setOpen(!open);
    };

    return (
        <TableContainer>
        <TableRow >

        <TableCell width="20rem" sx={{border: '0px'}}>

            {(!seccion.seccion.texto_partida) ? (
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={handleOpenRow}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            ) : <></>}
        </TableCell>    

        {
        seccion.seccion.desde ? 
        (    
        <TableCell component="th" scope="row" align="center" sx={{
            border: '0px',
            width: {xs: "15vw", sm: "10vw" ,md: "7vw"}}}>
          <span style={{fontWeight:'bold'}}>SECCIÓN</span> {seccion.seccion.posicion} <br/> ({seccion.seccion.desde} - {seccion.seccion.hasta})
          </TableCell>
        ) : 
        (
            <TableCell align="center" sx={{
                border: '0px',
                width: {xs:"30vw" , sm:"20vw" , md:"10vw"}
                }}>
                <span style={{fontWeight:'bold'}}>{seccion.seccion.posicion}</span>
            </TableCell>
        )
        }
        

        <TableCell sx={{border: '0px'}}>
            {seccion.seccion.descripcion}
        </TableCell>
        {seccion.seccion.texto_partida && (
            <TableCell sx={{border: '0px'}} ><Button>Detalles</Button></TableCell>
        )}
        </TableRow>


        <TableRow sx={{border: '0px'}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} sx={{border: '0px'}}>
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ 
                marginLeft: {xs:1, sm: 2, md:4}, 
                marginTop: 1, 
                marginBottom: 1
                }}>
              <Table size="small">
                <TableBody>    
                {(hijos && hijos.length > 0) ? (
                                hijos.map((hijo) => (
                                <PosicionRow key={hijo._id} seccion={hijo} />
                            ))
                            ) : (
                            <p>Cargando...</p> 
                            )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      </TableContainer>


    )};




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
        console.log(secciones);
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
                            maxWidth: '85%',
                            width: { xs: '90vw', sm: '90vw', md: '90vw' }, 
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
                                <PosicionRow key={seccion._id} seccion={seccion} />
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
import React, { useState} from 'react';
import { getHijos } from "services/arbolService";
import { 
    Button,
    Collapse,
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableContainer,
    Typography
} from '@mui/material';
import { 
    Close as CloseIcon
} from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

function PosicionRow({seccion, nivel}) {
    const [open, setOpen] = useState(false);
    const [openDetalles, setOpenDetalles] = useState(false);
    const [hijos, setHijos] = useState([]);

    const handleOpenRow = () => {
        if(!open){
            getHijos(seccion.posicion).then(res => {
                setHijos(res.posiciones);
            })
        } else {
            setHijos([]);
        }
        setOpen(!open);
    };

    const showPositionDetails = () => {
        setOpenDetalles(true);
    }

    const handleCloseDetalles = () => {
        setOpenDetalles(false);
    }

    return (
        <TableContainer>
        <TableRow >

        <TableCell sx={{border: '0px',
            width: {xs:'2vw', sm:'2vw', md:'2vw'}
        }}>

            {(!seccion.texto_partida) ? (
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={handleOpenRow}
                sx={{padding:'0px'}}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            ) : <></>}
        </TableCell>    

        {
        seccion.desde ? 
        (    
        <TableCell component="th" scope="row" align="center" 
        onClick={handleOpenRow}
        sx=
        {{
            border: '0px',
            width: {xs: "40vw", sm: "20vw" ,md: "9vw"}
        }}>
          <span style={{fontWeight:'bold'}}>SECCIÓN</span> {seccion.posicion} <br/> ({seccion.desde} - {seccion.hasta})
          </TableCell>
        ) : seccion.texto_partida ?
        (
            <TableCell align="left" sx={{
                border: '0px',
                width: {xs:"40vw" , sm:"30vw" , md:'25vw'}
                }}>
                <span style={{fontWeight:'bold'}}>{seccion.posicion}</span>
            </TableCell>
        ) : (
            <TableCell 
            onClick={handleOpenRow}
            align="left" sx={{
                border: '0px',
                width: {xs:"40vw" , sm:"20vw" , md:`${(nivel)*4.5}vw`}
                }}>
                <span style={{fontWeight:'bold'}}>{seccion.posicion}</span>
            </TableCell>
        )
        }
        
        {seccion.texto_partida ? (
            <TableCell sx={{border: '0px',
                        width: {xs:"50vw" , sm:"60vw" , md:"100vw"}
                        }}>
                <Button sx={{
                    '&:hover': {
                        textDecoration: 'underline', 
                        backgroundColor: 'transparent'
                        }
                    }} onClick={showPositionDetails}>
                        {seccion.descripcion}
                    </Button>
            </TableCell>
        ):(      
            <TableCell 
            onClick={handleOpenRow}
            sx={{border: '0px',
                    width: {xs:"50vw" , sm:"60vw" , md:"90vw"}
                    }}>
                    {seccion.descripcion}
            </TableCell>)}
        </TableRow>


        <TableRow>
        <TableCell colSpan={6} sx={{border: '0px', paddingBottom: 1, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ 
                marginLeft: {xs:0, sm: 1, md:6}, 
                marginTop: 0, 
                marginBottom: '1em'
                }}>
              <Table size="small">
                <TableBody>    
                {(hijos && hijos.length > 0) ? (
                                hijos.map((hijo) => (
                                <PosicionRow key={hijo._id} seccion={hijo} nivel={(nivel)+1} />
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

      <Dialog sx={{  
        '& .MuiDialog-paper':{          
            maxWidth: {xs:"90%", sm:"80%" ,md:'70%'},
            width: { xs: '60vw', sm: '50vw', md: '40vw' }, 
            height: { xs: '80vh', sm:'75vh', md: '65vh' }, 
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'},
            }}
        open={openDetalles}
        onClose={handleCloseDetalles}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <DialogTitle sx={{position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, fontSize:'1rem'}}> {seccion.descripcion}
                        <Button onClick={handleCloseDetalles} sx={{ position: 'absolute', right: 0, top: 0 , paddingBlock: '1em'}}>
                        <CloseIcon />
                        </Button>
                    </DialogTitle>
                    <Divider/>
        <DialogContent>
            <Box sx={{paddingLeft:'4em', paddingTop: '0em'}}>
                <span style={{fontWeight:'bold'}}>Arancel Externo Comun: </span>{seccion.arancel_externo_comun} %
                <p><span style={{fontWeight:'bold'}}>Derechos de Exportacion: </span>{seccion.derechos_exportacion}%</p>
                <p><span style={{fontWeight:'bold'}}>Derechos de Importacion Extrazona: </span>{seccion.derechos_importacion_extrazona}%</p>
                <p><span style={{fontWeight:'bold'}}>Derechos de Importacion Intrazona: </span>{seccion.derechos_importacion_intrazona}%</p>
                <p><span style={{fontWeight:'bold'}}>Reintegros Extrazona: </span>{seccion.reintegros_extrazona}%</p>
                <p><span style={{fontWeight:'bold'}}>Reintegros Intrazona: </span>{seccion.reintegros_intrazona}%</p>
            
            </Box>
            <Typography variant='caption' fontSize={'10px'}>Los porcentajes mostrados se aplican al valor FOB (Free On Board) de la mercancía exportada.</Typography>
        </DialogContent>
        </Dialog>
      </TableContainer>


    )};

export default PosicionRow;
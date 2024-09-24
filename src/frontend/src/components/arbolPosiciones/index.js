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
    TableContainer
} from '@mui/material';
import { 
    Close as CloseIcon
} from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

function PosicionRow(row) {
    const [open, setOpen] = useState(false);
    const [openDetalles, setOpenDetalles] = useState(false);
    const [hijos, setHijos] = useState([]);

    const handleOpenRow = () => {
        if(!open){
            getHijos(row.seccion.posicion).then(res => {
                setHijos(res.posiciones);
            })
        } else {
            setHijos([]);
        }
        setOpen(!open);
    };

    const showPositionDetails = () => {
        setOpenDetalles(true);
        console.log(row.seccion);
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

            {(!row.seccion.texto_partida) ? (
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
        row.seccion.desde ? 
        (    
        <TableCell component="th" scope="row" align="center" sx=
        {{
            border: '0px',
            width: {xs: "40vw", sm: "20vw" ,md: "9vw"}
        }}>
          <span style={{fontWeight:'bold'}}>SECCIÓN</span> {row.seccion.posicion} <br/> ({row.seccion.desde} - {row.seccion.hasta})
          </TableCell>
        ) : row.seccion.texto_partida ?
        (
            <TableCell align="left" sx={{
                border: '0px',
                width: {xs:"40vw" , sm:"30vw" , md:'25vw'}
                }}>
                <span style={{fontWeight:'bold'}}>{row.seccion.posicion}</span>
            </TableCell>
        ) : (
            <TableCell align="left" sx={{
                border: '0px',
                width: {xs:"40vw" , sm:"20vw" , md:`${(row.nivel)*4.5}vw`}
                }}>
                <span style={{fontWeight:'bold'}}>{row.seccion.posicion}</span>
            </TableCell>
        )
        }
        
        {row.seccion.texto_partida ? (
            <TableCell sx={{border: '0px',
                        width: {xs:"50vw" , sm:"60vw" , md:"100vw"}
                        }}>
                <Button sx={{
                    '&:hover': {
                        textDecoration: 'underline', 
                        backgroundColor: 'transparent'
                        }
                    }} onClick={showPositionDetails}>
                        {row.seccion.descripcion}
                    </Button>
            </TableCell>
        ):(      
            <TableCell sx={{border: '0px',
                    width: {xs:"50vw" , sm:"60vw" , md:"90vw"}
                    }}>
                    {row.seccion.descripcion}
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
                                <PosicionRow key={hijo._id} seccion={hijo} nivel={(row.nivel)+1} />
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
            height: { xs: '70vh', sm:'70vh', md: '65vh' }, 
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'},
            }}
        open={openDetalles}
        onClose={handleCloseDetalles}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <DialogTitle sx={{position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, fontSize:'1rem'}}> {row.seccion.descripcion}
                        <Button onClick={handleCloseDetalles} sx={{ position: 'absolute', right: 0, top: 0 , paddingBlock: '1em'}}>
                        <CloseIcon />
                        </Button>
                    </DialogTitle>
                    <Divider/>
        <DialogContent>
            <Box sx={{paddingLeft:'5em'}}>
                <p><span style={{fontWeight:'bold'}}>Arancel Externo Comun: </span>{row.seccion.arancel_externo_comun} %</p>
                <p><span style={{fontWeight:'bold'}}>Derechos de Exportacion: </span>{row.seccion.derechos_exportacion}%</p>
                <p><span style={{fontWeight:'bold'}}>Derechos de Importacion Extrazona: </span>{row.seccion.derechos_importacion_extrazona}%</p>
                <p><span style={{fontWeight:'bold'}}>Derechos de Importacion Intrazona: </span>{row.seccion.derechos_importacion_intrazona}%</p>
                <p><span style={{fontWeight:'bold'}}>Reintegros Extrazona: </span>{row.seccion.reintegros_extrazona}%</p>
                <p><span style={{fontWeight:'bold'}}>Reintegros Intrazona: </span>{row.seccion.reintegros_intrazona}%</p>
            
            </Box>
        </DialogContent>
        </Dialog>
      </TableContainer>


    )};

export default PosicionRow;
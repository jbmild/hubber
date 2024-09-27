import React from 'react';
import { 
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Table,
    TableBody,
} from '@mui/material';
import { 
    Close as CloseIcon
} from '@mui/icons-material';
import PosicionRow from '../posicionRow';


function DialogArbol({secciones, openModal, handleCloseModal}) {

    return(
    <Dialog 
                        keepMounted
                        open={openModal}           
                        onClose={handleCloseModal}
                        sx={{
                            '& .MuiDialog-paper': {
                            maxWidth: {xs:"100%", sm:"95%" ,md:'90%'},
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
                    <DialogContent 
                        sx={{ 
                            '&::-webkit-scrollbar': {
                                width: '0.5em',
                            },
                            '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: '0.25em',
                            },
                            '&::-webkit-scrollbar-track': {
                            background: 'rgba(0, 0, 0, 0.1)',
                        }}}>
                        <Table>
                            <TableBody >
                                {(secciones && secciones.length > 0) ? (
                                    secciones.map((seccion) => (
                                   <>
                                   <PosicionRow key={seccion._id} seccion={seccion} nivel={0} />
                                    <Divider />
                                    </>
                                ))
                                ) : (
                                <p>Cargando secciones...</p>
                                )}
                            </TableBody>
                        </Table>
                    </DialogContent>

                </Dialog>
    );
}

export default DialogArbol;
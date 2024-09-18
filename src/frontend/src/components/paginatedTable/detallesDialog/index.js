import React, { useState, useEffect } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,  
    TableRow,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useMediaQuery,
    useTheme,
    Tabs,
    Tab,
    Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import TabPanel, {a11yProps} from 'components/tabs/tabs';

const DialogDetalles = ({ data, openModal, handleCloseModal }) => {

    const [tabSelected, setTabSelected] = useState(0);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleTabChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    /*TransitionComponent={(props) => <Fade in={openModal} {...props} />}*/

    return(
        <Dialog
        
          open={openModal}
          onClose={handleCloseModal}
          sx={{
            '& .MuiDialog-paper': {
              width: { xs: '90vw', md: '50vw' }, // Tamaño del modal en pantallas grandes y móviles
              height: { xs: '90vh', md: 'auto' }, // Altura del modal en pantallas grandes y móviles
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <DialogTitle>
            Normativa
            <Button onClick={handleCloseModal} sx={{ position: 'absolute', right: 0, top: 0 , paddingBlock: '1em'}}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent sx={{
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden'
          }}>
            {data && (
              <Box sx={{ width: '100%'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs variant='scrollable' scrollButtons={'auto'} allowScrollButtonsMobile={true} value={tabSelected} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Información Basica" {...a11yProps(0)} />
                    <Tab label="Descripción" {...a11yProps(1)} />
                    <Tab label="Información de Certificación" {...a11yProps(2)} disabled/>
                  </Tabs>
                </Box>
                <TabPanel className={'tabPanel'} value={tabSelected} index={0}>
                  <Table>
                    <TableBody>
                      { isSmallScreen ? 
                        <>
                          <TableRow>
                            <TableCell sx={{textAlign: 'center', fontWeight: 'bold'}}>
                              Titulo
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              {data.titulo}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{textAlign: 'center', fontWeight: 'bold'}}>
                              Normativa
                            </TableCell>
                          </TableRow>   
                          <TableRow>
                            <TableCell>
                              {data.origen}
                            </TableCell>
                          </TableRow>
                          {data.agencia && 
                            <>
                              <TableRow>
                                <TableCell sx={{textAlign: 'center', fontWeight: 'bold'}}>
                                  Agencia
                                </TableCell>                              
                              </TableRow>   
                              <TableRow>
                                <TableCell>
                                  {data.agencia}
                                </TableCell>
                              </TableRow>
                            </>
                          }
                          <TableRow>
                            <TableCell sx={{textAlign: 'center', fontWeight: 'bold'}}>
                              Fecha de Implementación
                            </TableCell>                            
                          </TableRow> 
                          <TableRow>
                            <TableCell sx={{textAlign: 'center'}}>
                              {data.fechaImplementacion}
                            </TableCell>
                          </TableRow>
                        </>
                        :
                        <>
                          <TableRow>
                            <TableCell sx={{ width: { md: '40%'} }}>
                              Titulo
                            </TableCell>
                            <TableCell sx={{ width: { md: '60%'} }}>
                              {data.titulo}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ width: { md: '40%'} }}>
                            Normativa
                            </TableCell>
                            <TableCell sx={{ width: { md: '60%'} }}>
                              {data.origen}
                            </TableCell>
                          </TableRow>   
                          {data.agencia && 
                            <TableRow>
                              <TableCell sx={{ width: { md: '40%'} }}>
                              Agencia
                              </TableCell>
                              <TableCell sx={{ width: { md: '60%'} }}>
                                {data.agencia}
                              </TableCell>
                            </TableRow>   
                          }
                          <TableRow>
                            <TableCell sx={{ width: { md: '40%'} }}>
                              Fecha de Implementación
                            </TableCell>
                            <TableCell sx={{ width: { md: '60%'} }}>
                              {data.fechaImplementacion}
                            </TableCell>
                          </TableRow>   
                        </>
                      }                                  
                    </TableBody>
                  </Table>
                </TabPanel>
                <TabPanel className={'tabPanel'} value={tabSelected} index={1}>
                  <p>
                    {data.descripcion}
                  </p>
                </TabPanel>
                <TabPanel className={'tabPanel'} value={tabSelected} index={2}>
                  WIP
                </TabPanel>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='success' sx={{width: '50%'}}>
              Normativa Cumplida
            </Button>
            <Button variant='outlined' color='primary' sx={{width: '50%'}}>
              Seguir Normativa
            </Button>
          </DialogActions>
        </Dialog>
    );
}

export default DialogDetalles;
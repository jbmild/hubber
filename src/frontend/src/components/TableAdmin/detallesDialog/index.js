// estoy en components/paginatedTable/detallesDialog/index.js
import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  TableRow,
  CircularProgress 
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import TabPanel, { a11yProps } from 'components/tabs/tabs';

const DialogDetallesAdmin = ({ data, openModal, handleCloseModal, normativas, setNormativas }) => {
  const [tabSelected, setTabSelected] = useState(0);
  const [changes, setChanges] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentStatus, setCurrentStatus] = useState(false);


    const handleTabChange = (event, newValue) => {
    setTabSelected(newValue);
  };

  useEffect(() => {

    const load = async () =>{
      if(data){
        if(data._id === normativas.normativa1._id || data._id === normativas.normativa2._id)
          setCurrentStatus(true);
        else 
          setCurrentStatus(false);
      }
    }
    load();
  },[normativas, openModal])

  const handleAgregar = (normativa) => {
    if(!normativas.normativa1)
      setNormativas(prevNormativas => ({
        ...prevNormativas,
        normativa1: normativa
    }));
    else if(!normativas.normativa2)
      setNormativas(prevNormativas => ({
        ...prevNormativas,
        normativa2: normativa
    }));
  }

  const handleQuitar = (normativa) => {
    if(normativas.normativa1._id === normativa._id)
      setNormativas(prevNormativas => ({
        ...prevNormativas,
        normativa1: '',
    }));
    else if(normativas.normativa2._id === normativa._id)
      setNormativas(prevNormativas => ({
        ...prevNormativas,
        normativa2: '',
    }));
  }

  return (
   <Dialog
  open={openModal}
  onClose={() => handleCloseModal(changes)}
  sx={{
    '& .MuiDialog-paper': {
      width: { xs: '90vw', md: '50vw' },
      maxHeight: '90vh', // Establece una altura máxima
      // overflow: 'hidden', // Elimina esta línea
      display: 'flex',
      flexDirection: 'column',
    },
  }}
    >
      <DialogTitle>
        Normativa
        <Button onClick={() => handleCloseModal(changes)} sx={{ position: 'absolute', right: 0, top: 0, paddingBlock: '1em' }}>
          <CloseIcon />
        </Button>
      </DialogTitle>
    <DialogContent sx={{ height: 'auto', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

        {data ? (
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                variant='scrollable'
                scrollButtons={'auto'}
                allowScrollButtonsMobile={true}
                value={tabSelected}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Información Basica" {...a11yProps(0)} />
                <Tab label="Descripción" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel className={'tabPanel'} value={tabSelected} index={0}>
              <Table>
                <TableBody>
                  {isSmallScreen ? (
                    <>
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                          Titulo
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{data.titulo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                          Normativa
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{data.normativaOrigen}</TableCell>
                      </TableRow>
                      {data.agencia && (
                        <>
                          <TableRow>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                              Agencia
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>{data.agencia}</TableCell>
                          </TableRow>
                        </>
                      )}
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                          Fecha de Implementación
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center' }}>{data.fechaImplementacion}</TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell sx={{ width: { md: '40%' } }}>Titulo</TableCell>
                        <TableCell sx={{ width: { md: '60%' } }}>{data.titulo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: { md: '40%' } }}>Normativa</TableCell>
                        <TableCell sx={{ width: { md: '60%' } }}>{data.normativaOrigen}</TableCell>
                      </TableRow>
                      {data.agencia && (
                        <TableRow>
                          <TableCell sx={{ width: { md: '40%' } }}>Agencia</TableCell>
                          <TableCell sx={{ width: { md: '60%' } }}>{data.agencia}</TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell sx={{ width: { md: '40%' } }}>Fecha de Implementación</TableCell>
                        <TableCell sx={{ width: { md: '60%' } }}>{data.fechaImplementacion}</TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </TabPanel>
            <TabPanel className={'tabPanel'} value={tabSelected} index={1}>
              <p>{data.descripcion}</p>
            </TabPanel>
          </Box>
        ) : (
          <p>Loading data...</p> // Fallback content while loading
        )}
      </DialogContent>
      <DialogActions>
      {
          !currentStatus ? 
            <Button variant="contained" color="warning" onClick={() => handleAgregar(data)}
            disabled={!!(normativas.normativa1 && normativas.normativa2)}
            >
              Agregar a Equivalencia
            </Button>
          :
            <Button variant="contained" color="warning" onClick={() => handleQuitar(data)}>
              Quitar de Equivalencia
            </Button>
        }

      </DialogActions>
    </Dialog>
  );
};

export default DialogDetallesAdmin;


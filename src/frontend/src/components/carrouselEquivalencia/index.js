// estoy en components/paginatedTable/detallesDialog/index.js
import React, { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  TableRow 
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import TabPanel, { a11yProps } from 'components/tabs/tabs';
import OpenAI from 'openai';
import axios from 'axios';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; // Importamos los iconos

const CarrouselEquivalencia = ({ equivalencias, openModal, handleCloseModal, provisorio, normativas, setNormativas }) => {

  const [tabSelected, setTabSelected] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [changes, setChanges] = useState(false);
  const [respuesta, setRespuesta] = useState(''); // State for storing the OpenAI response
  const [isLoading, setIsLoading] = useState(false); // New state for loading message
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice actual
  const [data, setData] = useState([]);



  useEffect(() => {
    setCurrentIndex(0);
    setTabSelected(0);
}, [equivalencias])


    useEffect(() => {
        const loadSugerencia = async () => {

            setIsLoading(true);
            setTabSelected(0);
            setData(equivalencias[currentIndex]);

            setIsLoading(false)
        }
        loadSugerencia();
    },[currentIndex, equivalencias])
    

    // Función para navegar al elemento anterior
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : equivalencias.length - 1));
    };

    // Función para navegar al siguiente elemento
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < equivalencias.length - 1 ? prevIndex + 1 : 0));
    };


  const handleTabChange = (event, newValue) => {
    setTabSelected(newValue);
  };

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
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '1em',
          paddingRight: '0.5em',
          overflowY: 'auto'
        },

      }}
    >
      <DialogTitle>
        Normativa {currentIndex+1}/{equivalencias.length}
        <Button onClick={() => handleCloseModal(changes)} sx={{ position: 'absolute', right: 0, top: 0, paddingBlock: '1em' }}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent sx={{ height: 'auto', display: 'flex', flexDirection: 'column', overflowY: 'auto' ,       
        '&::-webkit-scrollbar': {
            width: '0.25em',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '0.45em',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)',
          } }}>
        {data ? (
          <Box sx={{ width: '100%' }}>
            <Box sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',           
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: 'white', 
              }}>
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
          provisorio &&
            <Button variant="contained" color="warning" onClick={() => handleQuitar(data)}>
              Quitar de Equivalencia
            </Button>
        }

      </DialogActions>
      <Box>
            
            {
                equivalencias ? (
                <>
                <IconButton
                    onClick={handlePrev}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '14px',
                        transform: 'translateY(-50%)',
                        zIndex: 1
                    }}
                >
                    <ArrowBack fontSize="medium" />
                </IconButton>

                {/* Botón para ir al siguiente elemento */}
                <IconButton
                    onClick={handleNext}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '14px',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                    }}
                >
                    <ArrowForward fontSize="medium" />
                </IconButton>
                </>)
                : <></>
            }
    
        </Box>
    </Dialog>
  );
};

export default CarrouselEquivalencia;


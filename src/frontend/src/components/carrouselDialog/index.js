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

const CarrouselDialog = ({ sugerencias, openModal, handleCloseModal }) => {
  const [tabSelected, setTabSelected] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [changes, setChanges] = useState(false);
  const [respuesta, setRespuesta] = useState(''); // State for storing the OpenAI response
  const [isLoading, setIsLoading] = useState(false); // New state for loading message
  const [normativasUsuario, setNormativasUsuario] = useState([]); // New state for loading message
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice actual
  const [data, setData] = useState([]);



  useEffect(() => {
    setCurrentIndex(0);
    setTabSelected(0);
}, [sugerencias])


    useEffect(() => {
        const loadSugerencia = async () => {
            setIsLoading(true);
            setTabSelected(0);
            setData(sugerencias[currentIndex]);
            setIsLoading(false)
        }
        loadSugerencia();
    },[currentIndex, sugerencias])
    

    // Función para navegar al elemento anterior
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : sugerencias.length - 1));
    };

    // Función para navegar al siguiente elemento
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < sugerencias.length - 1 ? prevIndex + 1 : 0));
    };

  // Initialize OpenAI client
  /*
  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: "XD", // Ensure your API key is set in environment variables
  });*/
   const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Usa la variable de entorno aquí
  });

  useEffect(() => {

    const fetchNormativasUsuario = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/normativas-usuario`, { withCredentials: true });
      return response.data;
    }

    fetchNormativasUsuario().then(normativas => {
      if (data && normativas) {
        setNormativasUsuario(normativas);
        //filtrar data._id (si existe) en response.data[x].idNormativa, si existe me traigo el status
        const normativaUsuario = normativas.find(normativa => normativa.idNormativa._id === data._id);
        if(normativaUsuario){
          setCurrentStatus(normativaUsuario.status || null);
          fetchOpenAIResponse();
        } else {
          setCurrentStatus('');
        }
       } // Fetch OpenAI response when data changes
    });
  
  }, [data]);

  const fetchOpenAIResponse = async () => {
    if (!sugerencias) return; // Ensure data is available before proceeding

    // Formulate the question for OpenAI
    const pregunta = `[Normativa:${data.titulo} Descripcion:${data.descripcion} Pais emisor de normativa:${data.pais} Pais origen exportacion: Argentina] Explica de forma facil como cumplir esta normativa. Si es un articulo o una ley, da mas informacion y a donde ir para el tramite. (maximo 500 caracteres).Importante: no escribas en negrita.`;
	
    try {
      setIsLoading(true); // Activate loading state before making the request
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: pregunta }],
      });
      setRespuesta(response.choices[0].message.content); // Set the response to state
      setIsLoading(false); // Deactivate loading state after receiving the response
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      setRespuesta('Error fetching response from OpenAI.');
      setIsLoading(false); // Deactivate loading state in case of error
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabSelected(newValue);
  };

  const handleStatusChange = async (status) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/normativas-usuario/${data._id}/status`, { status }, { withCredentials: true });
      console.log('Status updated:', response.data);
      setChanges(true);
      setCurrentStatus(status);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

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
        Normativa {currentIndex+1}/{sugerencias.length}
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
                <Tab label="Sugerencias" {...a11yProps(2)} />
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
            <TabPanel className={'tabPanel'} value={tabSelected} index={2}>
              {isLoading ? ( // Show loading message while fetching response
                <p>Cargando...</p> 
              ) : (
                <p>{respuesta}</p> // Display the OpenAI response here
              )}
            </TabPanel>
          </Box>
        ) : (
          <p>Loading data...</p> // Fallback content while loading
        )}
      </DialogContent>
      <DialogActions>
        {
          (!currentStatus || currentStatus == 'Pendiente') ?
            <Button variant="contained" color="success" onClick={() => (handleStatusChange('Aprobado'))}>
              Normativa Cumplida
            </Button>
          :
            <Button variant="contained" color="error" onClick={() => (handleStatusChange('Pendiente'))}>
              Normativa No Cumplida
            </Button>
        }
        {
          !currentStatus ? 
            <Button variant="contained" color="warning" onClick={() => (handleStatusChange('Pendiente'))}>
              Seguir
            </Button>
          :
            <Button variant="contained" color="warning" onClick={() => (handleStatusChange(null))}>
              Dejar de Seguir
            </Button>
        }


      </DialogActions>
      <Box>
            
            {
                sugerencias ? (
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

export default CarrouselDialog;


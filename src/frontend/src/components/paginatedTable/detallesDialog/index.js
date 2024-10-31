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
import OpenAI from 'openai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DialogDetalles = ({ data, producto, openModal, handleCloseModal }) => {
  const navigate = useNavigate();
  const [tabSelected, setTabSelected] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [changes, setChanges] = useState(false);
  const [respuesta, setRespuesta] = useState(''); // State for storing the OpenAI response
  const [isLoading, setIsLoading] = useState(false); // New state for loading message
  const [normativasUsuario, setNormativasUsuario] = useState([]); // New state for loading message
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/normativas-usuario`, { withCredentials: true }).catch((error) => {
        if(error?.response?.status == 401){
          navigate('/login');
        }else{
          throw new Error();
        }
      });
      return response?.data;
    }
	
    fetchNormativasUsuario().then(normativas => {
      if (data && normativas) {
        setNormativasUsuario(normativas);
		fetchOpenAIResponse();
        //filtrar data._id (si existe) en response.data[x].idNormativa, si existe me traigo el status
        const normativaUsuario = normativas.find(normativa => normativa.idNormativa._id === data.id);
        if(normativaUsuario){
          setCurrentStatus(normativaUsuario.status || null);
          
        } else {
          setCurrentStatus('');
        }
       } // Fetch OpenAI response when data changes
    });
  
  }, [data]);

  const fetchOpenAIResponse = async () => {
    if (!data) return; // Ensure data is available before proceeding

    // Formulate the question for OpenAI
    const pregunta = `[Normativa:${data.titulo} ,Descripcion:${data.descripcion} ,Pais emisor de normativa:${data.pais} ,Pais origen exportacion: Argentina, Producto:${producto}] Explica facil y detalladamente que sabes sobre la normativa/ley especifica, y a donde ir a realizar el tramite. La explicacion debe ser acorde al producto (cantidad max caracteres:500).Importante: no escribas en negrita y nunca digas que no puedes hacer algo. Actua como un buscador experto`;
	//const pregunta = `.`;
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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/normativas-usuario/${data.id}/status`, { status }, { withCredentials: true });
      console.log('Status updated:', response.data);
      setChanges(true);
      setCurrentStatus(status);
    } catch (error) {
      throw new Error();
    }
  };

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
                        <TableCell>{data.origen}</TableCell>
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
                        <TableCell sx={{ width: { md: '60%' } }}>{data.origen}</TableCell>
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
              {isLoading ? (
				  <Box
					sx={{
					  display: 'flex',
					  flexDirection: 'column',
					  alignItems: 'center',
					  justifyContent: 'center',
					  minHeight: '200px', // Puedes ajustar la altura mínima si es necesario
					}}
				  >
					<CircularProgress />
					<p style={{ marginTop: '1em' }}>Hubber está pensando...</p>
				  </Box>
				) : (
				  <p>{respuesta}</p>
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
    </Dialog>
  );
};

export default DialogDetalles;


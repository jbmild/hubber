//En algun lado (aca o en el component) tengo que importar el servicio
import { detalle_ima_test, tabla_ima_test, detalle_ima, getPosiciones, tabla_ima } from "services/marketsService";
import React, { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    useTheme,
    LinearProgress,
    Autocomplete, TextField, CircularProgress,
  } from '@mui/material';
  import { Search as SearchIcon } from '@mui/icons-material';

const Markets = () => {
  const [query, setQuery] = useState(' ');
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0); // Estado para la cantidad total de resultados
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [ima, setIma] = useState([]);
  const [detalleIma, setDetalleIma] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showTableDetails, setShowTableDetails] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchResults = async (newQuery, newOffset) => {
    setLoading(true);
    const response = await getPosiciones(newQuery, newOffset);
    console.log(response);
    setResults(prev => newOffset === 0 ? response.posiciones : [...prev, ...response.posiciones]);
    setTotalResults(response.totalResults); // Almacena el total de resultados disponibles
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setOffset(0); // reset offset when query changes
    fetchResults(e.target.value, 0);
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && !loading) {
      const newOffset = offset + 10;
      if (results.length < totalResults) {
        setOffset(newOffset);
        fetchResults(query, newOffset);
      }
    }
  };

  const handleSelection = (event, newValue) => {
    setShowTable(false);
    setShowTableDetails(false);
    document.getElementById('container-ima').style.height = '10vh';
    document.getElementById('div-ima').style.height = '30vh';
    if(newValue){
      setSelectedValue(newValue.posicion);
    } else {
      setSelectedValue('');
      setQuery(' ');
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    tabla_ima_test(selectedValue).then(res => {
        setLoading(false);
        setIma(res);
        console.log(res);
    })
    setShowTable(true);
    document.getElementById('div-ima').style.height = '150vh';
    document.getElementById('container-ima').style.height = '120vh';
  };

  const handleOpen = () => {
    setOpen(true);
    fetchResults(query, 0);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const getIMADetails = () => {
    setLoading(true);
    detalle_ima_test(selectedValue).then(res => {
      setLoading(false);
      setDetalleIma(res);
      console.log(res)
    })
    setShowTableDetails(true);
    document.getElementById('div-ima').style.height = '240vh';
    document.getElementById('container-ima').style.height = '215vh';
    };

  return (
    <Box id='div-ima'
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: { xs: '25vh', sm: '25vh', md: '30vh' },
      flexDirection: 'column'
    }}
    >
      <Paper id='container-ima'
        sx={{
          padding: { xs: '3.5em', sm: '2.5em', md: '2em' },
          maxWidth: '80vw',
          width: '100%',
          height: '10vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={10} md={10}>
          <Autocomplete
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            onChange={handleSelection}
            onInputChange={handleInputChange}
            getOptionLabel={(option) => option.posicion}
            options={results}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            loading={loading}

            ListboxProps={{
              onScroll: handleScroll,
              style: { maxHeight: '40vh', overflow: 'auto' },
            }}

            renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar producto"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={15} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
            )}
            noOptionsText="No existen resultados"
          />
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={!selectedValue}
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
      </Grid>
      {showTable && (<TableContainer
          sx={{
            flex: 1,
            overflowY: 'auto',
            maxHeight: 'calc(215vh - 4.5em)',
            marginTop: '1.5em',
            '&::-webkit-scrollbar': {
              width: '0.5em',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '0.25em',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <Table>
            {
              loading ? <></> : 
              <TableHead>
                <TableRow>
                    <TableCell sx={{ width: { xs: '20%', sm: '20%', md: '25%' } }}>Pais</TableCell>
                    <TableCell sx={{ width:  { xs: '20%', sm: '20%', md: '20%' } }}>Indice de Mercado Atractivo</TableCell>
                  {!isSmallScreen && (
                    <>
                    <TableCell sx={{ width: { xs: '20%', sm: '20%', md: '25%' } }}>Pais</TableCell>
                    <TableCell sx={{ width:  { xs: '20%', sm: '20%', md: '20%' } }}>Normativas</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
            }
            <TableBody>
            {
              loading ? 
                <TableRow key={'spinner'}>
                  <TableCell colSpan={12}>
                    <LinearProgress color="primary" />
                  </TableCell>
                </TableRow>  
              :              
                <>
                {ima.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell> <img src={row.bandera} alt=" " style={{"width":"25px"}}/> {row.pais}</TableCell>
                    <TableCell align='center'>
                      <span style={{ 
                          color: row.puntaje >= 7 ? 'green' : row.puntaje >= 4 ? 'orange' : row.puntaje >= 1 ?'red' : 'black' 
                      }}>
                        {Number(row.puntaje).toFixed(2)} 
                      </span>
                      <span style={{}}> / 10</span>
                    </TableCell>
                  </TableRow>
                ))}
                </>
              }   
            </TableBody>
          </Table>
          <Button
            variant="contained"
            fullWidth
            onClick={getIMADetails}
            sx={{
              display: 'flex',
              fontSize: 12,
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.2em',
              textTransform: 'none',
              '& .MuiButton-startIcon': {
                marginRight: '0.5em'
              }
            }}
            >
              Mostrar Detalles IMA
            </Button>
            {showTableDetails && (<TableContainer style={{ overflowX: 'auto', paddingTop:'1em'}}>
              <Table style={{borderCollapse: 'collapse', width:'100%'}}>
              {
                loading ?
                  <TableRow key={'spinner'}>
                    <TableCell colSpan={12}>
                      <LinearProgress color="primary" />
                    </TableCell>
                  </TableRow>
                : <>
                  <TableHead>
                    <TableRow key='paises'>
                      <TableCell style={{fontWeight:'bold',
                            position: 'sticky',
                            left: 0,/* Fija la primera columna */
                            backgroundColor: 'white', /* Asegura que el fondo sea visible al hacer scroll */
                            zIndex: 1, /* Asegura que la columna esté por encima del contenido */
                            whiteSpace: 'nowrap'
                            }}></TableCell>
                      {detalleIma.paises.map((pais) => (
                      <TableCell style={{whiteSpace: 'nowrap'}}>{pais}</TableCell>
                    ))}
                    </TableRow>
                  </TableHead>
                    <TableBody>
                      {detalleIma.puntajesPorCategoria.map((categoria) => (
                          <TableRow key={categoria.titulo}>
                            <TableCell style={{fontWeight:'bold',
                            position: 'sticky',
                            left: 0,/* Fija la primera columna */
                            backgroundColor: 'white', /* Asegura que el fondo sea visible al hacer scroll */
                            zIndex: 1, /* Asegura que la columna esté por encima del contenido */
                            whiteSpace: 'nowrap'
                            }}
                            >
                              {categoria.titulo}
                            </TableCell>
                             {categoria.puntajes.map((valor) => (
                            <TableCell
                              style={{
                                color: valor >= 9 ? 'lightgreen' :valor >= 7 ? 'green' : valor >= 5 ? 'orange' : 'red',
                                fontWeight: valor >= 9 ? 'bold' : 'light',
                                textAlign: 'center',
                                whiteSpace: 'nowrap'
                            }}
                            >
                              {Number(valor).toFixed(2)}</TableCell>
                             ))}
                          </TableRow>
                        ))}
                    </TableBody>
                  </>
                }
                </Table>
            </TableContainer>)}
        </TableContainer>)}
      </Paper>
      <Box sx={{
          height: '1.5em',
          fontSize: 10,
          fontWeight: 'light',
          fontStyle: 'oblique',
          flexDirection: 'column',
        }}>
          <p>Fuente: Agencia Argentina de Inversiones y Comercio Internacional. Calculadora de Índice de Mercados Atractivos: <a target="_blank" href='https://exportargentina.org.ar/mercados'> https://exportargentina.org.ar/mercados</a>. Método de cálculo: 
           <a target="_blank" href='https://www.inversionycomercio.ar/pdf/Informe_IMA_2023.pdf'> https://www.inversionycomercio.ar/pdf/Informe_IMA_2023.pdf </a></p>
        </Box>
    </Box>  
    
  );
};

 
export default Markets;
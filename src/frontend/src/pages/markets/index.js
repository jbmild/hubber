//En algun lado (aca o en el component) tengo que importar el servicio
import { detalle_ima_test, tabla_ima_test, detalle_ima, getPosiciones, tabla_ima } from "services/marketsService";
import React, { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Paper,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme,
    LinearProgress,
    Autocomplete, TextField, CircularProgress,
    IconButton,
  } from '@mui/material';
  import { Search as SearchIcon } from '@mui/icons-material';
  import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Markets = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState(' ');
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingDetalles, setLoadingDetalles] = useState(false);
  const [totalResults, setTotalResults] = useState(0); // Estado para la cantidad total de resultados
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [ima, setIma] = useState([]);
  const [detalleIma, setDetalleIma] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showTableDetails, setShowTableDetails] = useState(false);
  const [popoverContent, setPopoverContent] = useState('');

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
    if(newValue){
      setSelectedValue(newValue.posicion);
    } else {
      setSelectedValue('');
      setQuery(' ');
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    tabla_ima(selectedValue).then(res => {
        setLoading(false);
        setIma(res);
        console.log(res);
    })
    setShowTable(true);
  };

  const handleOpen = () => {
    setOpen(true);
    fetchResults(query, 0);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const getIMADetails = () => {
    setLoadingDetalles(true);
    detalle_ima(selectedValue).then(res => {
      setLoadingDetalles(false);
      setDetalleIma(res);
      console.log(res)
    })
    setShowTableDetails(true);
    };


  const contenido = (titulo) => {
    var texto;
    switch (titulo){
      case "Aumento en la participación argentina":
        texto = `Se considera la dinámica que vienen teniendo las exportaciones
                argentinas en el mercado analizado de acuerdo con el incremento
                en la participación sobre el total (promedio últimos 3 años vs. el
                promedio de los 4 años anteriores a ese período).`
        break; 

      case "Brecha de precio":
         texto = `La brecha de precio es el cociente entre el precio unitario que el
                mercado en cuestión paga por sus importaciones del producto a
                nuestros competidores y el precio que paga por sus importaciones
                desde Argentina. `
          break;

      case "Comercio potencial":
        texto = `Bajo una simulación con supuestos
                extremos, se cuantifica lo máximo (el
                techo) que podrían expandirse las
                exportaciones argentinas de un producto
                a cada destino. Este techo puede
                determinarse por la demanda total de ese
                país (sus importaciones totales) o por las
                exportaciones totales de Argentina.
                Prevalecerá el más bajo. A ese valor
                corresponde deducir el comercio
                existente entre ambos países. `
        break; 

      case "Condición de mercado actual":
        texto = `Esta dimensión mide en qué grado las
                importaciones de años recientes se
                acercan al máximo o al mínimo de los
                últimos 20 años. Un mercado importador
                en su máximo del período indicado implica
                un mayor atractivo, resultando en un
                puntaje de 10. Por el contrario, mientras
                más cerca se encuentre de su mínimo, el
                puntaje se acercará al 0. `
        break; 
 

      case "Dinámica en el margen":
        texto = `Esta dimensión evalúa la dinámica de las importaciones del producto
                  para cada destino, comparando su variación porcentual en el último año
                  disponible con un promedio de los tres años previos (se toma un
                  promedio para suavizar subas o bajas coyunturales). Un mercado más
                  dinámico presenta mayor atractivo y por lo tanto un mayor puntaje. `
        break; 

      case "Dispersión de proveedores":
        texto = `Se ordenan los mercados según qué tan concentradas (por país
                proveedor) se encuentran sus importaciones del producto de
                interés. `
        break; 

      case "Participación argentina":
        texto = `Esta dimensión evalúa el peso relativo de
                las exportaciones argentinas del producto
                seleccionado en el total de las
                importaciones del mismo producto por el
                mercado en cuestión. Para cada destino,
                se calcula la participación porcentual de
                Argentina en las importaciones totales del
                producto de dicho destino. A mayor
                participación corresponde un mayor
                puntaje.
                Se toma un promedio de los últimos 3
                años disponibles para atenuar las
                fluctuaciones coyunturales. `
        break; 
      case "Tamaño de mercado":
        texto = `Esta variable mide la participación de
                  mercado que tiene el país en
                  las importaciones mundiales del producto
                  de interés. A mayor participación dentro
                  del mercado mundial, mayor será el
                  atractivo que se le asignará. `
        break; 

      case "Ventaja arancelaria":
        texto = `Para un determinado producto, la ventaja
                arancelaria se calcula por destino como el
                cociente entre el arancel que enfrentan
                nuestros competidores en ese mercado y
                el arancel que enfrenta Argentina.
                Para obtener un puntaje, se ordenan las
                ventajas arancelarias de mayor a menor
                y se les asigna un valor según su decil.`
        break;

      case "Ventaja geográfica":
        texto = `Se compara la distancia promedio de un
                mercado respecto a sus proveedores
                contra la distancia de Argentina
                con ese mercado.  `
        break; 

    }

    return texto;
  }

    const handleClick = (event, titulo) => {
      setAnchorEl(event.currentTarget);
      console.log(titulo);
      setPopoverContent(contenido(titulo));
    };
  
    const handleClosePopover = () => {
      setAnchorEl(null);
      setPopoverContent('');
    };
  
    const openPopover = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: { xs: '25vh', sm: '25vh', md: '30vh' },
      flexDirection: 'column',
      padding: '1em'
    }}
    >
      <Paper 
        sx={{
          padding: { xs: '3.5em', sm: '2.5em', md: '2em' },
          maxWidth: '80vw',
          width: '100%',
          minHeight: '10vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease'
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
                    <TableCell sx={{padding:"0.8em"}}> <img src={row.bandera} alt=" " style={{"width":"25px"}}/> {row.pais}</TableCell>
                    <TableCell align='left' sx={{padding:"0.8em"}}>
                      <span style={{ 
                          color: row.puntaje >= 6 ? 'green' : row.puntaje >= 4 ? 'orange' : row.puntaje >= 1 ?'red' : 'black' 
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
            {showTableDetails && (
            <TableContainer style={{ overflowX: 'auto', paddingTop:'1em'}}>
              <Table style={{borderCollapse: 'collapse', width:'100%'}}>
              {
                loadingDetalles ?
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
                            left: 0,
                            backgroundColor: 'white', 
                            zIndex: 1, 
                            whiteSpace: 'nowrap'
                            }}></TableCell>
                      {detalleIma.paises.map((pais) => (
                      <TableCell style={{whiteSpace: 'nowrap'}}>{pais}</TableCell>
                    ))}
                    </TableRow>
                  </TableHead>
                    <TableBody>
                      {detalleIma.puntajesPorCategoria.map((categoria) => (
                          <TableRow key={categoria.titulo} >
                            <TableCell sx={{padding:"0.3em"}} style={{fontWeight:'bold',
                            position: 'sticky',
                            left: 0,
                            backgroundColor: 'white',
                            zIndex: 1, 
                            whiteSpace: 'nowrap'
                            }}
                            >
                              
                              <IconButton color="info" aria-describedby={id} variant="contained" onClick={(e) => handleClick(e, categoria.titulo)} >
                                <InfoOutlinedIcon/>
                              </IconButton>
                              {categoria.titulo} 
                              <Popover
                                id={id}
                                open={openPopover}
                                anchorEl={anchorEl}
                                onClose={handleClosePopover}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                                }}
                                sx={{maxWidth:"35vw"}}
                              >
                              <Typography sx={{ p: 2 }}>{popoverContent}</Typography>
                            </Popover>
                            </TableCell >
                             {categoria.puntajes.map((valor) => (
                            <TableCell sx={{padding:"0.3em"}}
                              style={{
                                color: valor >= 9 ? 'lightgreen' :valor >= 6 ? 'green' : valor >= 4 ? 'orange' : 'red',
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
          <p>Fuente: Agencia Argentina de Inversiones y Comercio Internacional. Calculadora de Índice de Mercados Atractivos: <a target="_blank" href='https://exportargentina.org.ar/mercados'> https://exportargentina.org.ar/mercados</a>. 
          <br/>Todos los valores mostrados representan un puntaje que oscila entre 0 y 10. Para más detalles sobre cómo se calcula cada dimensión, consulte el siguiente enlace: 
           <a target="_blank" href='https://www.inversionycomercio.ar/pdf/Informe_IMA_2023.pdf'> https://www.inversionycomercio.ar/pdf/Informe_IMA_2023.pdf </a></p>
        </Box>
    </Box>  
    
  );
};

 
export default Markets;
//En algun lado (aca o en el component) tengo que importar el servicio
import { getPosiciones, tabla_ima } from "services/marketsService";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchResults = async (newQuery, newOffset) => {
    setLoading(true);
    const response = await getPosiciones(newQuery, newOffset);
    console.log(response);
    setResults(prev => newOffset === 0 ? response.posiciones : [...prev, ...response.posiciones]);
    setTotalResults(response.totalResults); // Almacena el total de resultados disponibles
    setLoading(false);
    console.log(results);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setOffset(0); // reset offset when query changes
    fetchResults(e.target.value, 0);
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && !loading) {
      const newOffset = offset + 10;
      // Verificar si ya hemos cargado todos los resultados
      if (results.length < totalResults) {
        setOffset(newOffset);
        fetchResults(query, newOffset);
      }
    }
  };

  const handleSelection = (event, newValue) => {
    setShowTable(false);
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
    
    tabla_ima(selectedValue).then(res => {
        setLoading(false);
        setData(res);
        console.log(res);
    })
    setShowTable(true);
    document.getElementById('container-ima').style.height = '112vh';
    document.getElementById('div-ima').style.height = '130vh';
  };

  const handleOpen = () => {
    setOpen(true);
    fetchResults(query, 0);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div id='div-ima'
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '30vh',
    }}
    >
      <Paper id='container-ima'
        sx={{
          padding: { xs: '1em', sm: '1.5em', md: '2em' },
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
            onInputChange={handleInputChange} // Cambia cuando el input cambia
            getOptionLabel={(option) => option.posicion} // Lo que se muestra en la lista
            options={results}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            loading={loading}
            // Sobrescribimos el comportamiento del listbox para detectar el scroll
            ListboxProps={{
              onScroll: handleScroll,
              style: { maxHeight: '300px', overflow: 'auto' },
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
                    {loading ? <CircularProgress color="inherit" size={10} /> : null}
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
            maxHeight: 'calc(130vh - 12.5em)', // Ajuste basado en em para altura
            marginTop: '2em',
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
                  <TableCell sx={{ width: { xs: '100%', sm: '20%' } }}>Pais</TableCell>
                  {!isSmallScreen && (
                    <>
                    <TableCell sx={{ width: '65%' }}>Indice de Mercado Atractivo</TableCell>
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
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ width: { xs: '100%', sm: '50%' } }}> <img src={row.bandera} alt=" " style={{"width":"25px"}}/> {row.pais}</TableCell>
                    {!isSmallScreen && (
                      <>
                        <TableCell>{Number(row.puntaje).toFixed(2)}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
                </>
              }   
            </TableBody>
          </Table>
        </TableContainer>)}
      </Paper>
    </div>  
  );
};

 /* return (
    <div onScroll={handleScroll} style={{ height: '300px', overflowY: 'scroll' }}>
      <input type="text" value={query} onChange={handleInputChange} />
      <ul>
        {results.map((result) => (
          <li key={result._id}>{result.posicion}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};*/
/*
  return (
    <div>
      <h2>Seleccione el producto</h2>
      <select onChange={handleSelection} value={selectedValue}>
        <option value="">Seleccione</option>
        {options.map((option) => (
          <option key={option._id} value={option.posicion}>
            {option.posicion}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit} disabled={!selectedValue}>Buscar</button>

      <TableContainer
          sx={{
            flex: 1,
            overflowY: 'auto',
            maxHeight: 'calc(80vh - 12.5em)', // Ajuste basado en em para altura
            marginTop: '2em',
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
                  <TableCell sx={{ width: { xs: '100%', sm: '20%' } }}>Pais</TableCell>
                  {!isSmallScreen && (
                    <>
                    <TableCell sx={{ width: '65%' }}>Indice de Mercado Atractivo</TableCell>
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
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ width: { xs: '100%', sm: '50%' } }}> <img src={row.bandera} alt="bandera" style={{"width":"30px"}}/> {row.pais}</TableCell>
                    {!isSmallScreen && (
                      <>
                        <TableCell>{Number(row.puntaje).toFixed(2)}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
                </>
              }   
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
};
*/
export default Markets;
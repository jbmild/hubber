import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Grid,
  Autocomplete,
  useMediaQuery,
  useTheme,
  InputAdornment,
  Box
} from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { getPaises } from 'services/paisesService'; // Importa la función getPaises
import './style.css'; // Importa el archivo de estilos CSS
import { getNormativas } from 'services/normativasService';
import TabPanel, {a11yProps} from 'components/tabs/tabs';
import TableRowsLoader from './loader';
import DialogDetalles from './detallesDialog';

//esto deberia venir de la base, pero ahora no existe esa info
const today = new Date();

const PaginatedTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [paises, setPaises] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const fetchedPaises = await getPaises();
        setPaises(fetchedPaises.map(p => p.pais));
      } catch (error) {
        console.error('Error fetching paises:', error);
      }
    };

    fetchPaises();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCountryChange = (event, value) => {
    setPaisSeleccionado(value || '');
  };

  const handleSearchClick = () => {
    if(!paisSeleccionado){
      return;
    }

    searchInfo(page, rowsPerPage, {
      producto: search,
      pais: paisSeleccionado
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    if(!paisSeleccionado){
      return;
    }

    searchInfo(newPage, rowsPerPage, {
      producto: search,
      pais: paisSeleccionado
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowPerPage);
    setPage(0);

    if(!paisSeleccionado){
      return;
    }

    searchInfo(0, newRowPerPage, {
      producto: search,
      pais: paisSeleccionado
    });
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const searchInfo = (pageTo, limit, filters) =>{   

    setLoading(true);

    if(!filters.producto || filters.producto === ''){
      setLoading(false);
      setData([]);
      setTotalItems(0);
      return;
    }

    getNormativas(pageTo, limit, filters).then(res =>{
      setLoading(false);
      setData(res.items.map(p => ({
        id: p._id,
        titulo: p.titulo,
        descripcion: p.descripcion,
        agencia: p.agencia,
        origen: p.normativaOrigen,
        fechaImplementacion: p.fechaImplementacion.split('T')[0],
      })));
      setTotalItems(res.totalItems);
    });

  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);  
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: { md: '100vh', sm: 'unset'},
        paddingBlock: { md: 0, sm: '1em', xs: '1.5em'}
      }}
    >
      <Paper
        sx={{
          padding: { xs: '1em', sm: '1.5em', md: '2em' },
          maxWidth: '80vw',
          width: '100%',
          height: { md: '80vh', sm:'fit-content'},
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7} md={7}>
            <TextField
              label="Buscar"
              variant="outlined"
              fullWidth
              margin="none"
              onChange={handleSearchChange}
              value={search}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': {
                  padding: '0.5em',
                },
                '& .MuiInputBase-input': {
                  paddingTop: '0.5em',
                  paddingBottom: '0.5em',
                  textAlign: 'left'
                },
                '& .MuiFormLabel-root': {
                  top: '1em', // Ajusta verticalmente la posición del label
                  left: '1em', // Ajusta horizontalmente la posición del label
                  transform: 'translateY(0)', // Asegura que el label no se mueva
                  fontSize: '1em'
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translateY(-1.25em)' // Ajusta la posición cuando el label está reducido
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <Autocomplete
              freeSolo
              options={paises} // Muestra todos los países para el Autocomplete
              onChange={handleCountryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="País"
                  variant="outlined"
                  fullWidth
                  margin="none"
                  sx={{
                    '& .MuiInputBase-root': {
                      padding: '0.5em',
                    },
                    '& .MuiInputBase-input': {
                      paddingTop: '0.5em',
                      paddingBottom: '0.5em',
                      textAlign: 'left'
                    },
                    '& .MuiFormLabel-root': {
                      top: '1em', // Ajusta verticalmente la posición del label
                      left: '1em', // Ajusta horizontalmente la posición del label
                      transform: 'translateY(0)', // Asegura que el label no se mueva
                      fontSize: '1em'
                    },
                    '& .MuiInputLabel-shrink': {
                      transform: 'translateY(-1.25em)' // Ajusta la posición cuando el label está reducido
                    }
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              sx={{
                '& .MuiAutocomplete-popupIndicator': {
                  display: 'none', // Oculta el indicador de desplegable
                },
                '& .MuiAutocomplete-option': {
                  padding: '0.5em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
                '& .MuiAutocomplete-options': {
                  maxHeight: '15em', // Limita la altura del desplegable a 15em
                  overflowY: 'auto',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2} sx={{ height: '3em', paddingTop: '0 !important', marginTop: '1em !important' }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSearchClick}
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
        <TableContainer
          sx={{
            flex: 1,
            overflowY: 'auto',
            marginTop: '2em',
          }}
        >
          <Table stickyHeader sx={{height: '100%'}}>
            <TableHead>
                <TableRow>
                  <TableCell sx={{ width: { xs: '100%', sm: '40%' } }}>Titulo</TableCell>
                  {!isSmallScreen && (
                    <>
                      <TableCell sx={{ width: '45%' }}>Normativa</TableCell>
                      <TableCell sx={{ width: '15%' }}>Fecha de Implementación</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
            <TableBody sx={{ overflowY: 'auto'}}>
            {
              loading ? 
                <TableRowsLoader rowsNum={rowsPerPage} cellsNum={(isSmallScreen ? 1 : 3)} />
              :              
                <>
                {data.map((row) => (
                  <TableRow key={row.id} hover onClick={() => handleRowClick(row)}>
                    <TableCell sx={{ width: { xs: '100%', sm: '40%' } }}>{row.titulo}</TableCell>
                    {!isSmallScreen && (
                      <>
                        <TableCell>{row.origen}</TableCell>
                        <TableCell>{row.fechaImplementacion}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
                {data.length < rowsPerPage && Array.from({ length: rowsPerPage - data.length }).map((_, index) => (
                  <TableRow key={`empty-${index}`}>
                    <TableCell colSpan={3}></TableCell>
                  </TableRow>
                ))}
                </>
              }   
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ flexShrink: 0 }}
        />    
        <DialogDetalles data={selectedRow} openModal={openModal} handleCloseModal={handleCloseModal} />    
      </Paper>
    </Box>
  );
};

export default PaginatedTable;

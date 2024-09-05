import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Autocomplete,
  useMediaQuery,
  useTheme,
  InputAdornment,
  Fade
} from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { getPaises } from 'services/paisesService'; // Importa la función getPaises
import './style.css'; // Importa el archivo de estilos CSS

// Datos de ejemplo para la tabla
const data = [
  { name: 'Normativa 1', lastUpdate: '2024-01-15', agency: 'Agencia A' },
  { name: 'Normativa 2', lastUpdate: '2024-02-20', agency: 'Agencia B' },
  { name: 'Normativa 3', lastUpdate: '2024-03-10', agency: 'Agencia C' },
  // Agrega más datos según sea necesario
];

const PaginatedTable = () => {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterApplied, setFilterApplied] = useState(false); // Para controlar si se aplicó un filtro

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fetchedCountries = await getPaises();
        setCountries(fetchedCountries.map(p => p.pais));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCountryChange = (event, value) => {
    setSelectedCountry(value || '');
  };

  const handleSearchClick = () => {
    setFilterApplied(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Filtrar datos basados en la búsqueda y selección de país
  const filteredData = data.filter(item =>
    (item.name.toLowerCase().includes(search.toLowerCase()) || !filterApplied) &&
    (!selectedCountry || item.agency === selectedCountry)
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Paper
        sx={{
          padding: { xs: '1em', sm: '1.5em', md: '2em' },
          maxWidth: '80vw',
          width: '100%',
          height: '80vh',
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
              options={countries} // Muestra todos los países para el Autocomplete
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
                <li {...props}>
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
          <Grid item xs={12} sm={2} md={2} sx={{ height: '3em', paddingTop: '0 !important' }}>
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
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: { xs: '100%', sm: '50%' } }}>Nombre</TableCell>
                {!isSmallScreen && (
                  <>
                    <TableCell>Fecha Última Actualización</TableCell>
                    <TableCell>Agencia</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.name} hover onClick={() => handleRowClick(row)}>
                  <TableCell sx={{ width: { xs: '100%', sm: '50%' } }}>{row.name}</TableCell>
                  {!isSmallScreen && (
                    <>
                      <TableCell>{row.lastUpdate}</TableCell>
                      <TableCell>{row.agency}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
              {/* Rellenar filas vacías si hay menos de 5 elementos */}
              {filteredData.length < 5 && Array.from({ length: 5 - filteredData.length }).map((_, index) => (
                <TableRow key={`empty-${index}`}>
                  <TableCell colSpan={3} sx={{ height: '3em' }}></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ flexShrink: 0 }}
        />
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          TransitionComponent={(props) => <Fade in={openModal} {...props} />}
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
            Detalles
            <Button onClick={handleCloseModal} sx={{ position: 'absolute', right: 0, top: 0 }}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent>
            {selectedRow && (
              <div>
                <p>Nombre: {selectedRow.name}</p>
                {!isSmallScreen && (
                  <>
                    <p>Fecha Última Actualización: {selectedRow.lastUpdate}</p>
                    <p>Agencia: {selectedRow.agency}</p>
                  </>
                )}
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};

export default PaginatedTable;

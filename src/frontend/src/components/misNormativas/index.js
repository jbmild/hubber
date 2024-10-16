import React, { useState, useEffect } from 'react';
import {
    Box, InputLabel, NativeSelect,
    Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress
} from '@mui/material';
import axios from 'axios';
import { getNormativa } from 'services/normativasService';
import DialogDetalles from 'components/paginatedTable/detallesDialog'

const MisNormativas = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState('Todos');

    useEffect(() => {
        const fetchNormativasUsuario = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/normativas-usuario`, { withCredentials: true });
                console.log(response.data);
                setUserData(response.data); // Directly set the array here
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user normativas:', error);
                setLoading(false);
            }
        };

        fetchNormativasUsuario();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const verNormativa = async (idNormativa) => {
        const normativa = await getNormativa(idNormativa);
        normativa.origen = normativa.normativaOrigen;
        normativa.id = normativa._id;
        setSelectedRow(normativa);
        setOpenModal(true);
      };

    
      const handleCloseModal = () => {
        setOpenModal(false);  
      };

    if (loading) {
        return <CircularProgress />;
    }

    // Check if userData is empty
    if (!userData || userData.length === 0) {
        return <div>Este usuario no tiene normativas.</div>;
    }


    // Función para manejar el cambio del filtro
    const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
    };
  
    // Filtrar las filas de la tabla en función del valor seleccionado
    const filteredData = userData.filter((row) => {
      if (selectedStatus === 'Todos') return true; // Mostrar todas las filas
      return row.status === selectedStatus; // Mostrar solo las que coinciden
    });

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
              padding: { xs: '3.5em', sm: '2.5em', md: '1em' },
              maxWidth: '90vw',
              width: '100%',
              minHeight: '10vh',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease'
            }}
          >
              <Box textAlign={'right'} paddingRight={'3em'}>
                  <InputLabel htmlFor="filter" >
                    Filtrar Normativas
                              </InputLabel>
                      <NativeSelect  id='filter'
                      value={selectedStatus} onChange={handleStatusChange}>
                        <option value="Todos"> Todas</option>
                        <option value="Aprobado"> Aprobadas</option>
                        <option value="Pendiente"> Pendientes</option>
                    </NativeSelect>
              </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Estado</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>País</TableCell>
                                <TableCell>Fecha de Aprobación</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((reg) => (
                                    <TableRow key={reg.idNormativa._id} hover onClick={() => verNormativa(reg.idNormativa._id)}>
                                        <TableCell>{reg.status}</TableCell>
                                        <TableCell>{reg.idNormativa.titulo}</TableCell>
                                        <TableCell>{reg.idNormativa.pais}</TableCell>
                                        <TableCell>{new Date(reg.fechaAprobacion).toLocaleDateString()}</TableCell>
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
                />
                <DialogDetalles data={selectedRow} openModal={openModal} handleCloseModal={handleCloseModal} />
            </Paper>
        </Box>
    );
};

export default MisNormativas;
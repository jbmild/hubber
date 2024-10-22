import React, { useState, useEffect } from 'react';
import {
    Box, InputLabel, NativeSelect,
    Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress
} from '@mui/material';
import axios from 'axios';
import { getNormativa } from 'services/normativasService';
import DialogDetalles from 'components/paginatedTable/detallesDialog';

const obtenerValoresUnicos = (campo, elementosFiltrados) => {
    switch (campo) {
        case 'pais':
            return [...new Set(elementosFiltrados.map(e => e.idNormativa[campo]))];
        case 'status':
            return [...new Set(elementosFiltrados.map(e => e[campo]))];
        case 'etiquetas':
            return [...new Set(elementosFiltrados.flatMap(e => e.idNormativa[campo]))];
    }
  };

const MisNormativas = () => {
    const [userData, setUserData] = useState([]);
    //const [filteredData, setFilteredData] = useState([]);
    //const [statusData, setStatusData] = useState([]);
    

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [changes, setChanges] = useState(false);

    //const [selectedStatus, setSelectedStatus] = useState('Todos');
    //const [selectedPais, setSelectedPais] = useState('Todos');
    //const [selectedProducto, setSelectedProducto] = useState('Todos');
    const [filtros, setFiltros] = useState({
        pais: 'Todos',
        producto: 'Todos',
        estado: 'Todos'
      });

    const [elementosFiltrados, setElementosFiltrados] = useState([]);
    const [paisesDisponibles, setPaisesDisponibles] = useState([]);
    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [estadosDisponibles, setEstadosDisponibles] = useState([]);

    useEffect(() => {
        const fetchNormativasUsuario = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/normativas-usuario`, { withCredentials: true });
                //console.log(response.data);
                setUserData(response.data); 
                setElementosFiltrados(response.data);
                const paisesDisponibles = obtenerValoresUnicos('pais', response.data.filter(el => {
                    return (filtros.producto === 'Todos' || el.idNormativa.etiquetas.includes(filtros.producto)) &&
                           (filtros.estado === 'Todos' || el.status === filtros.estado);
                  }));
                
                  const productosDisponibles = obtenerValoresUnicos('etiquetas', response.data.filter(el => {
                    return (filtros.pais === 'Todos' || el.idNormativa.pais === filtros.pais) &&
                           (filtros.estado === 'Todos' || el.status === filtros.estado);
                  }));

                  const estadosDisponibles = obtenerValoresUnicos('status', response.data.filter(el => {
                    return (filtros.pais === 'Todos' || el.idNormativa.pais === filtros.pais) &&
                           (filtros.producto === 'Todos' || el.idNormativa.etiquetas.includes(filtros.producto));
                  }));

    
                  setPaisesDisponibles(paisesDisponibles);
                  setProductosDisponibles(productosDisponibles);
                  setEstadosDisponibles(estadosDisponibles);

            } catch (error) {
                console.error('Error fetching user normativas:', error);
            }
        };

        setLoading(true);
        fetchNormativasUsuario();
        setLoading(false);
        console.log(estadosDisponibles)
    }, [changes]);


    useEffect(() => {
        // Si la página actual es mayor que el número máximo de páginas disponibles, ajusta la página
        const movePage = async () => {
           /* const statusData = userData.filter((row) => {
                if (selectedStatus === 'Todos') return true; // Mostrar todas las filas
                return row.status === selectedStatus; // Mostrar solo las que coinciden
            })
            setStatusData(statusData);

            const statusPais = statusData.filter((normativa) => {
                if (selectedPais === 'Todos') return true; // Mostrar todas las filas
                return normativa.idNormativa.pais === selectedPais; // Mostrar solo las que coinciden
            })
            
            const filteredData = statusPais.filter((norm)=>{
                if (selectedProducto === 'Todos') return true;
                return norm.idNormativa.etiquetas.includes(selectedProducto);
            });

            setFilteredData(filteredData);*/
            const elementosFiltrados = userData.filter(el => {
                return (
                  (filtros.pais === 'Todos' || el.idNormativa.pais === filtros.pais) &&
                  (filtros.producto === 'Todos' || el.idNormativa.etiquetas.includes(filtros.producto)) &&
                  (filtros.estado === 'Todos' || el.status === filtros.estado)
                );
              });
          
            setElementosFiltrados(elementosFiltrados);

            const paisesDisponibles = obtenerValoresUnicos('pais', userData.filter(el => {
                return (filtros.producto === 'Todos' || el.idNormativa.etiquetas.includes(filtros.producto)) &&
                       (filtros.estado === 'Todos' || el.status === filtros.estado);
              }));
            
              const productosDisponibles = obtenerValoresUnicos('etiquetas', userData.filter(el => {
                return (filtros.pais === 'Todos' || el.idNormativa.pais === filtros.pais) &&
                       (filtros.estado === 'Todos' || el.status === filtros.estado);
              }));
            
              const estadosDisponibles = obtenerValoresUnicos('status', userData.filter(el => {
                return (filtros.pais === 'Todos' || el.idNormativa.pais === filtros.pais) &&
                       (filtros.producto === 'Todos' || el.idNormativa.etiquetas.includes(filtros.producto));
              }));

              setPaisesDisponibles(paisesDisponibles);
              setProductosDisponibles(productosDisponibles);
              setEstadosDisponibles(estadosDisponibles);

            const totalPages = Math.ceil(elementosFiltrados.length / rowsPerPage);
            if (page >= totalPages && page != 0) {
                setPage(page - 1);
            }
            
        }
        setLoading(true);
        movePage();
        setLoading(false);
      }, [userData, rowsPerPage, page, filtros]);


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

    
      const handleCloseModal = (cambios) => { 
        if(cambios)
            setChanges(!changes);
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
    /*const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
    };
    const handleStatusChangePais = (e) => {
        setSelectedPais(e.target.value);
      };
      const handleStatusChangeProducto = (e) => {
        setSelectedProducto(e.target.value);
      };*/

    const manejarCambioFiltro = (e) => {
        const { name, value } = e.target;
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            [name]: value
        }));
    };
    

    return (
        loading ? <></> : (
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
              <Box display="flex" paddingRight="5em" textAlign="right" gap="5em" justifyContent="flex-end">
                  <Box>
                      <InputLabel htmlFor="filterStatus" >
                        Filtrar por Estado
                                  </InputLabel>
                          <NativeSelect  id='filterStatus' 
//                          value={selectedStatus} onChange={handleStatusChange}>
                            name="estado" value={filtros.estado} onChange={manejarCambioFiltro}>
                            <option value="Todos"> Todas </option>
                                {
                                estadosDisponibles.map((estado) => (
                                    <option key={estado} value={estado}>{estado}</option>
                                ))}
                        </NativeSelect>
                  </Box>
                    <Box>
                        <InputLabel htmlFor="filterPais" >
                        Filtrar por Pais
                                  </InputLabel>
                          <NativeSelect  id='filterPais'
//                          value={selectedPais} onChange={handleStatusChangePais}>
                            name="pais" value={filtros.pais} onChange={manejarCambioFiltro}>
                            <option value="Todos"> Todos</option>
                            {
                                /*[...new Set(statusData.map((norm) => norm.idNormativa.pais))]
                                    .map((pais) =>
                                        <option key={pais} value={pais}> {pais} </option>
                                    )
                             */
                            paisesDisponibles.map((pais) => (
                                <option key={pais} value={pais}>{pais}</option>
                                ))       
                            }
                        </NativeSelect>
                    </Box>
                    <Box>
                        <InputLabel htmlFor="filterProducto" >
                        Filtrar por Producto
                                  </InputLabel>
                          <NativeSelect  id='filterProducto'
        //                  value={selectedProducto} onChange={handleStatusChangeProducto}>
                              name="producto" value={filtros.producto} onChange={manejarCambioFiltro}>
                           <option value="Todos"> Todos</option>
                            {
                               /* [...new Set(statusData.flatMap((norm) =>
                                    norm.idNormativa.etiquetas
                                ))].map((prod) =>
                                        <option key={prod} value={prod}> {prod} </option>
                                    )*/
                                        productosDisponibles.map((producto) => (
                                            <option key={producto} value={producto}>{producto}</option>
                                          ))

                            }
                        </NativeSelect>
                    </Box>
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
                            {elementosFiltrados
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
                    count={elementosFiltrados.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <DialogDetalles data={selectedRow} openModal={openModal} handleCloseModal={handleCloseModal} />
            </Paper>
        </Box>
    ));
};

export default MisNormativas;
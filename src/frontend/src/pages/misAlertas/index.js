import React, { useState, useEffect } from 'react';
import {
   Badge, Box, 
   Button, ButtonGroup,
   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress
} from '@mui/material';
import {getNotificaciones, cambiarEstado} from 'services/notificacionesService';
import { getNormativa } from 'services/normativasService';
import DialogDetalles from 'components/paginatedTable/detallesDialog'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const MisNormativas = ({setHasAlerts}) => {
    const [userData, setUserData] = useState([]);
    const [newData, setNewData] = useState();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchNotificacionesUsuario = async () => {
            try {
                setLoading(true);
                const response = await getNotificaciones();
                console.log(response);
                setUserData(response); // Directly set the array here
                setHasAlerts(response.some(notif => notif.estado === "Nueva"));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user notificaciones:', error);
                setLoading(false);
            }
        };

        fetchNotificacionesUsuario();
    }, [newData]);

    const handleCloseModal = () => {
        setOpenModal(false);  
      };
    
    const marcarLeida = async (id) => {
       const notif = await cambiarEstado(id, "Leida");
        setNewData(notif);
      };

    const elminiarAlerta = async (id) => {
        const notif = await cambiarEstado(id, "Eliminada");
        setNewData(notif);
      };
    
    

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

    if (loading) {
        return <CircularProgress />;
    }

    // Check if userData is empty
    if (!userData || userData.length === 0) {
        return <div>Este usuario no tiene notificaciones.</div>;
    }

    return (
        <Box     sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: { xs: '25vh', sm: '25vh', md: '30vh' },
            flexDirection: 'column',
            padding: '1em'
          }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Estado</TableCell>
                                <TableCell>Descripcion</TableCell>
                                <TableCell>Pais/Productos</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((reg) => (
                                    <TableRow key={reg._id} hover onClick={() => marcarLeida(reg._id)} title="Marcar notificacion como leida">
                                        <TableCell>
                                            { reg.estado === "Nueva" &&                     
                                            (<Badge color="error" variant="dot"              
                                             style={{ marginRight: '8px'}}></Badge>)}
                                             {reg.estado}
                                        </TableCell>
                                        <TableCell>{reg.motivo}</TableCell>
                                        <TableCell>{reg.interes}</TableCell>
                                        <TableCell>{new Date(reg.fecha).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                        <ButtonGroup variant="string" aria-label="Basic button group">
                                            <Button onClick={(event) => {event.stopPropagation(); verNormativa(reg.normativa)}} title='Ver normativa'><VisibilityOutlinedIcon /></Button>
                                            <Button onClick={(event) => {event.stopPropagation(); elminiarAlerta(reg._id)}} title='Eliminar notificacion'><DeleteForeverOutlinedIcon /></Button>
                                        </ButtonGroup>

                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userData.length}
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
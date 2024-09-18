import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress
} from '@mui/material';
import axios from 'axios';

const MisNormativas = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    if (loading) {
        return <CircularProgress />;
    }

    // Check if userData is empty
    if (!userData || userData.length === 0) {
        return <div>Este usuario no tiene normativas.</div>;
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                        {userData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((reg) => (
                                <TableRow key={reg.idNormativa._id}>
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
                count={userData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default MisNormativas;
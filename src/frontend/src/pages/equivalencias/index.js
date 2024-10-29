import axios from "axios";
import { useEffect, useState } from "react";
import {
    Badge, Box, 
    Button, Grid,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress
 } from '@mui/material';
import { getNormativa } from "services/normativasService";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CarrouselEquivalencia from "components/carrouselEquivalencia";
import TableAdmin from "components/TableAdmin";
import SaveIcon from '@mui/icons-material/Save';

const Equivalencias = () => {
    const url = process.env.REACT_APP_BACKEND_URL;

    const [equivalencias, setEquivalencias] = useState([]);
    const [provisorio, setProvisorio] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const [selectedRowEquivalencia, setSelectedRowEquivalencia] = useState(null); //este abre un modal doble, se ve el detalle de ambas normativas
    const [openModalEquivalencia, setOpenModalEquivalencia] = useState(false);


    const [normativas, setNormativas] = useState({
        normativa1: '',
        normativa2: '',
      });

    const [changes, setchanges] = useState(false);

    useEffect(() =>{

        const fetchEquivalencias = async () => {
            const equivalencias = await axios.get(`${url}/equivalencias?page=0&limit=10`, { withCredentials: true });

            
        const itemsEquivalencias = await Promise.all(
            equivalencias.data.items.map(async (eq) => {
                const n1 = await getNormativa(eq.normativa1);
                const n2 = await getNormativa(eq.normativa2);
                return {
                    equivalenciaId: eq._id,
                    normativa1: n1,
                    normativa2: n2,
                };
            })
        );
        console.log(itemsEquivalencias);
        setEquivalencias(itemsEquivalencias);                
        }

        fetchEquivalencias();
    },[changes]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const elminiarEquivalencia = async (id) => {
        const result = await axios.delete(`${url}/equivalencia/${id}`, { withCredentials: true });
        setchanges(!changes);
    }

    const guardarEquivalencia = async () => {
        const result = await axios.post(`${url}/equivalencia/new`, { n1: normativas.normativa1, n2: normativas.normativa2}, { withCredentials: true });
        setNormativas({normativa1: '',
        normativa2: '',})
        setchanges(!changes);
    }

    const verEquivalenciaProvisoria = async () => {
        setSelectedRowEquivalencia(normativas);
        setProvisorio(true);
        setOpenModalEquivalencia(true);
    };

    const verEquivalencia = async (equivalencia) => {
        setSelectedRowEquivalencia(equivalencia);
        setProvisorio(false);
        setOpenModalEquivalencia(true);
    };


  const handleCloseModalEquivalencia = () => { 
    setOpenModalEquivalencia(false); 
  };

    return (

        <p>{equivalencias.length > 0 ? (
        
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { xs: '25vh', sm: '25vh', md: '30vh' },
              flexDirection: 'column',
              paddingBottom: '2em',
              paddingTop: '1em'
            }}
            >
              <Paper 
                sx={{
                  padding: { xs: '1.5em', sm: '1em', md: '0.7em' },
                  maxWidth: '90vw',
                  width: '100%',
                  minHeight: '10vh',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
              >
                    <Table>
                        {  
                        equivalencias.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((eq)=> 
                        <TableRow hover title="Ver detalle de las normativas" onClick={()=>verEquivalencia(eq)}>
                                    <TableCell sx={{fontSize: '0.7em', margin: 0}}>{eq.normativa1.normativaOrigen}</TableCell>
                                    <TableCell sx={{fontSize: '0.7em', margin: 0}}>{eq.normativa1.pais}</TableCell>
                                    <TableCell sx={{fontSize: '0.7em', margin: 0}}>{eq.normativa2.normativaOrigen}</TableCell>
                                    <TableCell sx={{fontSize: '0.7em', margin: 0}}>{eq.normativa2.pais}</TableCell>
                                    <TableCell><Button onClick={(event) => {event.stopPropagation(); elminiarEquivalencia(eq.equivalenciaId)}} title='Eliminar equivalencia'><DeleteForeverOutlinedIcon /></Button></TableCell>
                        </TableRow>)
                        }
                        {
                            (normativas.normativa1 || normativas.normativa2) && (
                            <TableRow style={{backgroundColor:"#fdf4fb"}} hover title="Ver detalle de las normativas" onClick={()=>verEquivalenciaProvisoria()} >
                                <TableCell sx={{fontSize: '0.7em', margin: 0}}>{normativas.normativa1 && normativas.normativa1.normativaOrigen}</TableCell>
                                <TableCell sx={{fontSize: '0.7em', margin: 0}}>{normativas.normativa1 && normativas.normativa1.pais}</TableCell>
                                <TableCell sx={{fontSize: '0.7em', margin: 0}}>{normativas.normativa2 && normativas.normativa2.normativaOrigen}</TableCell>
                                <TableCell sx={{fontSize: '0.7em', margin: 0}}>{normativas.normativa2 && normativas.normativa2.pais}</TableCell>
                                <TableCell><Button onClick={(event) => {event.stopPropagation(); guardarEquivalencia(normativas)}} title='Guardar equivalencia' disabled={!(normativas.normativa1 && normativas.normativa2)}><SaveIcon /></Button></TableCell>
                            </TableRow>)
                        }
                    </Table>

                    {selectedRowEquivalencia && (<CarrouselEquivalencia equivalencias={[selectedRowEquivalencia.normativa1, selectedRowEquivalencia.normativa2]} openModal={openModalEquivalencia} handleCloseModal={handleCloseModalEquivalencia} provisorio={provisorio} normativas={normativas} setNormativas={setNormativas}/>)}
                    
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={equivalencias.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Paper>
                <Paper 
                sx={{
                  padding: { xs: '1.5em', sm: '1em', md: '0.7em' },
                  maxWidth: '90vw',
                  width: '100%',
                  minHeight: '10vh',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
              >



                <TableAdmin normativas={normativas} setNormativas={setNormativas}/>

                </Paper>
        </Box>
        
        ) : <span> cargando... </span>}</p>

    )
}


export default Equivalencias;
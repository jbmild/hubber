import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react"
import { getSugerencias, getSugerencia } from "services/sugerenciasService"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CarrouselDialog from 'components/carrouselDialog';
import DialogDetalles from "components/paginatedTable/detallesDialog";


function transformedArray(data) { 
    const response = Object.keys(data).map(producto => {
        const paises = Object.keys(data[producto]).map(pais => {
            return { [pais]: data[producto][pais] };
        });
        return { [producto]: paises };
});
    return response;
}

const Sugerencias = () => {

    const [loading, setLoading] = useState(true);
    const [sugerenciasUsuario, setSugerencias] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);

    useEffect (() => {
        const fetchSugerencias = async () => {
            try {
                setLoading(true);
                const response = await getSugerencias();
                setSugerencias(transformedArray(response));
                console.log(transformedArray(response));
            } catch (error) {
                console.error('Error fetching user sugerencias:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSugerencias()
    }, [])



    const verNormativa = async (producto, pais) => {
        const sugerencias = await getSugerencia(pais, producto);
        setSelectedRow(sugerencias);
        setOpenModal(true);
      };

    
      const handleCloseModal = () => { 
        setOpenModal(false); 
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
        }}>
            <Paper 
            sx={{
              padding: { xs: '3.5em', sm: '2.5em', md: '1em' },
              maxWidth: '90vw',
              width: '100%',
              minHeight: '10vh',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease'
            }}>

            {loading ? <></> : 
                 sugerenciasUsuario.map((productoObj, index) => {
                    const producto = Object.keys(productoObj)[0];
                    let paises = productoObj[producto];

                    paises = paises.sort((a, b) => {
                        const valorA = Object.values(a)[0]; 
                        const valorB = Object.values(b)[0]; 
                        return valorA - valorB; 
                      });
            
                    return (
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    >
                        {producto}
                    </AccordionSummary>
                    <AccordionDetails>

                    <Table>
                            <TableHead>
                                <TableCell>Pais</TableCell>
                                <TableCell>Normativas</TableCell>
                            </TableHead>
                            <TableBody>
                        {paises.map((paisObj, index) => {
                            // Para cada país, obtenemos su clave (nombre) y valor (cantidad)
                            const pais = Object.keys(paisObj)[0];
                            const cantidad = paisObj[pais];
                            
                            return <>
                                <TableRow hover key={index} onClick={() => verNormativa(producto, pais)}>
                                        <TableCell>{pais}</TableCell>
                                        <TableCell>{cantidad}</TableCell>
                                    </TableRow>
                            </>
                        })}
                        </TableBody>
                    </Table>

                    </AccordionDetails>

                </Accordion>
                );
                
            })}
                    <CarrouselDialog sugerencias={selectedRow} openModal={openModal} handleCloseModal={handleCloseModal}/>
            </Paper>
        </Box>
    ));
}

export default Sugerencias
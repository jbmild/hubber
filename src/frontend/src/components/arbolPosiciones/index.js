
import DialogArbol from "./arbol";
import { getSecciones } from "services/arbolService";
import React, { useState } from 'react';
import { 
    Button,
    Grid,
} from '@mui/material';



function ArbolPosiciones(){

    const [openModal, setOpenModal] = useState(false);
    const [secciones, setSecciones] = useState([]);

    const handleCloseModal = () => {
        setOpenModal(false);  
      };

    const handleArbolClick = async () => {

            getSecciones().then(res => {
                setSecciones(res.secciones);
        })
        setOpenModal(true);
      };

    return (
    <Grid marginLeft={'0.5em'}><p>
        <Button   
        sx={{textTransform: 'none',
            '&:hover': {
                textDecoration: 'underline', 
                backgroundColor: 'transparent'}}}
                onClick={handleArbolClick}
                title="Estructura de árbol para facilitar la búsqueda de la posición arancelaria de su producto">
        Búsqueda en forma de árbol</Button></p>
        <DialogArbol secciones={secciones} openModal={openModal} handleCloseModal={handleCloseModal} />
        </Grid>
    )
}

export default ArbolPosiciones;
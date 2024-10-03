import TransferListIntereses from "components/transferListIntereses/transferListIntereses";
import {Box, Button, Divider, Grid} from '@mui/material';
import { getPaises } from "services/paisesService";
import { useEffect, useState } from "react";
import { getUser } from "services/authService";
import axios from "axios";

const  MisIntereses = () => {

    const backend = `${process.env.REACT_APP_BACKEND_URL}/users`;

    const [paises, setPaises] = useState([]);
    const [productos, setProductos] = useState(["Vino","Miel","Alfajor"]);
    const [paisesUsuario, setPaisesUsuario] = useState([]);
    const [productosUsuario, setProductosUsuario] = useState([]);
    const [nuevosPaisesUsuario, setNuevosPaisesUsuario] = useState([]);
    const [nuevosProductosUsuario, setNuevosProductosUsuario] = useState([]);
    const [loading, setLoading] = useState(true);
    const [changes, setChanges] = useState('');

    useEffect (() => {
        const poblarPaises = async () => {
            setLoading(true);
            const paises = (await getPaises()).map( pais => pais.pais);
            const usuario = await getUser();
            setPaisesUsuario(usuario.paises_interes.sort());
            setProductosUsuario(usuario.productos_interes.sort());
            setNuevosPaisesUsuario(usuario.paises_interes.sort());
            setNuevosProductosUsuario(usuario.productos_interes.sort());
            setPaises(paises.sort());
            setLoading(false);
            };
        poblarPaises();
    },[changes])

    const handleGuardar = async () => {
        if(JSON.stringify(nuevosPaisesUsuario) != JSON.stringify(paisesUsuario)){
            const change = await axios.post(`${backend}/interesPais`,
                {
                    interes: nuevosPaisesUsuario
                  }, {
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json'
                    }});
                setChanges(change);
        };
        if(JSON.stringify(nuevosProductosUsuario) != JSON.stringify(productosUsuario)){
            const change = await axios.post(`${backend}/interesProducto`,
                {
                    interes: nuevosProductosUsuario
                  }, {
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json'
                    }});
            setChanges(change);
        };
    };      


    return(<>
        { loading ? <></> : (
                <Box sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: { xs: '25vh', sm: '25vh', md: '30vh' },
                    flexDirection: 'column',
                    padding: '1em'
                }}>
            <TransferListIntereses general = {paises} usuario={paisesUsuario} height={250} funcion={setNuevosPaisesUsuario}/>
            <Divider/>
            <TransferListIntereses general = {productos} usuario={productosUsuario} height={170} funcion={setNuevosProductosUsuario}/>
            <Box display="flex" justifyContent="flex-end" marginRight={'10em'}><Button onClick={handleGuardar}> Guardar </Button></Box>        
        </Box>)
        }</>
    );
};

export default MisIntereses;
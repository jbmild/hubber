import TransferListIntereses from "components/transferListIntereses/transferListIntereses";
import {Box} from '@mui/material';
import { getPaises } from "services/paisesService";
import { useEffect, useState } from "react";
import { getUser } from "services/authService";

export default function  MisIntereses()  {

    const [paises, setPaises] = useState([]);
    const [productos, setProductos] = useState(["Vino","Miel","Alfajor"]);
    const [paisesUsuario, setPaisesUsuario] = useState([]);
    const [productosUsuario, setProductosUsuario] = useState([]);

    useEffect (() => {
        const poblarPaises = async () => {
            const paises = (await getPaises()).map( pais => pais.pais);
            const usuario = await getUser();
            setPaisesUsuario(usuario.paises_interes);
            setProductosUsuario(usuario.productos_interes);
            setPaises(paises);
            };
        poblarPaises();
    },[])


    return(
        <Box>
            <TransferListIntereses general = {paises} usuario={paisesUsuario}/>
            <TransferListIntereses general = {productos} usuario={productosUsuario}/>
        </Box>
    )
}
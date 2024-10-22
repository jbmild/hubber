import { Box } from "@mui/material";
import { useEffect, useState } from "react"
import { getSugerencias, getSugerencia } from "services/sugerenciasService"



const Sugerencias = () => {

    const [loading, setLoading] = useState(true);
    const [sugerenciasUsuario, setSugerencias] = useState([]);

    useEffect (() => {
        const fetchSugerencias = async () => {
            try {
                setLoading(true);
                const response = await getSugerencias();
                setSugerencias(response);
                console.log(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user sugerencias:', error);
                setLoading(false);
            }
        };
        fetchSugerencias()
    }, [])

    return (
            loading ? <></> :
            <Box>

            </Box>
    )
}

export default Sugerencias
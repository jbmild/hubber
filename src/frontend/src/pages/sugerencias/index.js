import { useEffect, useState } from "react"
import { getSugerencias, getSugerencia } from "services/sugerenciasService"



const Sugerencias = () => {

    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const fetchSugerencias = async () => {
            try {
                setLoading(true);
                const response = await getSugerencia("Barbados", "Alfajor");
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user sugerencias:', error);
                setLoading(false);
            }
        };
        const sugerencias = fetchSugerencias()
        console.log(sugerencias)
    }, [])

    return (

        <p>"Hola mundo"</p>

    )
}

export default Sugerencias
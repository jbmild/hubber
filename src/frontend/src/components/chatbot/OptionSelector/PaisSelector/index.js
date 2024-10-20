import React from "react";
import Options from "../Options";

const PaisesOptions = (props) => {

    const paises = ['Brasil', 'Colombia', 'Chile', 'Uruguay', 'Estados Unidos'];

    const options = paises.map(p => ({
        name: p,
        handler: props.actionProvider.handlePaisSeleccionado,
        params: {pais : p},
        id: p
    })).concat([{
        name: 'Mas opciones',
        handler: props.actionProvider.handleMasOpcionesPais,
        id: 'Mas opciones'
    }]);

    return <Options options={options} title="Options" {...props} />;
};

export default PaisesOptions;

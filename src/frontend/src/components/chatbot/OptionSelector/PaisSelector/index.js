import React from "react";
import Options from "../Options";

const PaisesOptions = (props) => {

    const paises = ['Brasil', 'Peru', 'Chile'];

    const options = paises.map(p => ({
        name: p,
        handler: props.actionProvider.handlePaisSeleccionado,
        params: {pais : p},
        id: p
    }));

    return <Options options={options} title="Options" {...props} />;
};

export default PaisesOptions;

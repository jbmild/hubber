import React from "react";
import Options from "../Options";

const GeneralOptions = (props) => {

    const options = [
        {
            name: "Exportar tu producto",
            handler: props.actionProvider.handlePais,
            id: 1
        },
        { 
            name: "Infomación basica para exportar desde Argentina", 
            handler: props.actionProvider.handleNormativasBasicas, 
            id: 2 
        }
    ];
    return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;

import React from "react";
import Options from "../Options";

const GeneralOptions = (props) => {

    const options = [
        {
            name: "Por país a exportar",
            handler: props.actionProvider.handlePais,
            id: 1
        },
        { 
            name: "Como exportar?", 
            handler: props.actionProvider.handleNormativasBasicas, 
            id: 2 
        }
    ];
    return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;

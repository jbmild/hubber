import React from "react";
import Options from "../Options";

const GeneralOptions = (props) => {

    const options = [
        {
            name: "País especifico y producto",
            handler: props.actionProvider.handlePais,
            id: 1
        },
        { 
            name: "Normativa basica", 
            handler: props.actionProvider.handleNormativasBasicas, 
            id: 2 
        }
    ];
    return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;

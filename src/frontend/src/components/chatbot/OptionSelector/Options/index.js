import React, { useState, useEffect } from "react";
import "./index.css";

const Options = props => {
  const [done, setDone] = useState(false);
  const [cantMessages, setCantMessages] = useState(props.state.messages.length);

  useEffect(() => {
    const cantActual = props.state.messages.length;
    if(cantMessages < cantActual){
      setDone(true);
    }
  }, [props.state.messages]);

  return (
    <div className="options">
      <div className={'options-container' + (done ? ' option-done' : '')}>
        {props.options.map(option => {
          return (
            <div
              className="option-item"
              onClick={() => {
                if(!done){
                  option.handler(option.params);
                  setDone(true);
                }
              }}
              key={option.id}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;

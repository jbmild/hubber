import React, { useState } from "react";

import "./index.css";

const Options = props => {
  const [done, setDone] = useState(false);

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

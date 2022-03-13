import React from 'react';

import "./Linha.css"

const Linha = (props) => {
    return ( 
        <div className="Linha">
            {props.children}
        </div>
     );
}
 
export default Linha;
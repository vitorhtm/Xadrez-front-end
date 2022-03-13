import React, { useState } from 'react';
import { GiChessBishop,GiChessKnight,GiChessKing,GiChessPawn,GiChessQueen,GiChessRook } from "react-icons/gi";

import "./Quadrado.css"


const colecaoIcones = {
     
     Cavalo: GiChessKnight,
     Peao: GiChessPawn,
     REI: GiChessKing,
     Bispo: GiChessBishop,
     Rainha: GiChessQueen,
     Torre: GiChessRook,
}


const Quadrados = ({color, peca , posicao, mover}) => {

     let Icon = null    
     if (peca.peca in colecaoIcones){
          Icon = colecaoIcones[peca.peca]
     }
     const moverPeca = () => {
          mover(peca, posicao)
     }

          return ( 
        <div onClick={moverPeca} className= {`quadrado ${color} `}>
             {Icon && <Icon size={72} className={peca.cor}/>}
        </div> 
     );
}

console.log(Quadrados)
 
export default Quadrados;
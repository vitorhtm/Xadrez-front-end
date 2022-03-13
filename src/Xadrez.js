import React, { useEffect, useState } from "react";

import Api from "./Api";
import Quadrados from "./components/Quadrado";
import Linha from "./components/Linha";
import "./Xadrez";
import "./index.css";
import Botao from "./components/Botao";
import "./menu.css";

const Xadrez = () => {
  const [primeiraJogada, setPrimeiraJogada] = useState([]);
  const [contadorDeClick, setContadorDeClick] = useState(0);
  const [tabuleiro, setTabuleiro] = useState([]);

  useEffect(async () => {
    const response = await Api.get("/olamundo");
    setTabuleiro(response.data.tabuleiro);
  }, []);

  const restart = () => {
    setTabuleiro = [];
    setContadorDeClick(0);
    setPrimeiraJogada([]);
  };

  const linha = (l) => {
    var linha = [];
    for (var i = 0; i < 8; i++) {
      let cor = "";
      if (i % 2 === 0 && l % 2 === 0) {
        cor = "branco";
      }
      if (l % 2 != 0 && i % 2 != 0) {
        cor = "branco";
      }
      var peca = tabuleiro[l][i];
      var posicao = tabuleiro;
      linha.push(
        <Quadrados
          mover={mover}
          color={cor}
          peca={peca}
          posicao={[l, i]}
          key={`q${i}`}
        />
      );
    }
    return linha;
  };

  let click = 0;
  let mover = async (peca, posicao) => {
    if (contadorDeClick >= 1) {
      setContadorDeClick(0);

      const response1 = await Api.post("/jogar", {
        linha_atual: primeiraJogada[0],
        coluna_atual: primeiraJogada[1],
        futura_linha: posicao[0],
        futura_coluna: posicao[1],
      });
      setTabuleiro(response1.data.tabuleiro);
    } else {
      setPrimeiraJogada(posicao);
      setContadorDeClick(contadorDeClick + 1);
    }
  };

  const mesa = () => {
    var table = [];
    for (var i = 0; i < 8; i++) {
      table.push(
        <Linha className={"fundo"} key={i}>
          {linha(i)}
        </Linha>
      );
    }
    return table;
  };

  if (tabuleiro.length == 0) {
    return <></>;
  }

  return (
    <div className="flex">
      <div className="menu coluna">
        <h1 className="titulo">XADREZ</h1>
        <Botao />
      </div>
      <div className="flexbox">{mesa().map((item) => item)}</div>
    </div>
  );
};

export default Xadrez;

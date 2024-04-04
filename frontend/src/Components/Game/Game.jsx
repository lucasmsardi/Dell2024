import "./Game.css";
import Button from "../Button/Button";
import { getInfo, postInfo } from "../../service/game.service.js";
import { useState } from "react";
import Results from "../Results/Results.jsx";
import "../../service/game.service.js";
import Apostas from "../Apostas/Apostas.jsx";

function Game(props) {
  const nome = sessionStorage.getItem("name");
  const cpf = sessionStorage.getItem("CPF");
  const [clickedButtons, setClickedButtons] = useState([]);
  const [surpresinhaNumbers, setSurpresinhaNumbers] = useState([]);
  const [isSurpresinhaClicked, setSurpresinhaClicked] = useState(false);
  const [arrayCorretos, setArrayCorretos] = useState([]);
  const [isGameOn, setGameOn] = useState(false);
  const [showApostas, setShowApostas] = useState(false);
  const faseEscolha = "Selecione cinco números!";
  const [fase, setFase] = useState(faseEscolha);

  const handleButtonClick = (number) => {
    setClickedButtons((prevClickedButtons) => [...prevClickedButtons, number]);
  };

  const numerosCorretos = () => {
    setArrayCorretos([1, 2, 3, 4, 5]);
    /* let newNumbers = [...arrayCorretos];
    while (newNumbers.length < 5) {
      const numeroCorreto = Math.floor(Math.random() * 50) + 1;
      if (!newNumbers.includes(numeroCorreto)) {
        newNumbers.push(numeroCorreto);
      }
    } */
    newNumbers.sort((a, b) => a - b);

    const numerosCorretos = () => {};

    /* setArrayCorretos(newNumbers); */
  };

  const surpresinha = () => {
    const randomNumbers = [];
    while (randomNumbers.length < 5) {
      const randomNumber = Math.floor(Math.random() * 50) + 1;
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    setSurpresinhaNumbers(randomNumbers);
  };

  const backspace = () => {
    if (clickedButtons.length > 0) {
      setClickedButtons((prevClickedButtons) =>
        prevClickedButtons.slice(0, -1)
      );
    }
  };

  const novaAposta = () => {
    setGameOn(false);
    setClickedButtons([]);
    setSurpresinhaNumbers([]);
  };

  return (
    <div>
      {!showApostas && (
        <div>
          <div className="fases">
            <p>{fase}</p>
          </div>
          <div className="Box">
            <div className="todos-numeros">
              Sua escolha:
              {clickedButtons.map((btn) => {
                return <span className="numeros">{btn}</span>;
              })}
              {surpresinhaNumbers.map((btn) => {
                return <span className="numeros">{btn}</span>;
              })}
            </div>
            <Button
              handleClick={handleButtonClick}
              clickedButtons={clickedButtons}
              surpresinha={surpresinhaNumbers}
            ></Button>

            <button
              disabled={clickedButtons.length < 5 && !isSurpresinhaClicked}
              className="botao-rodar"
              onClick={() => {
                surpresinhaNumbers.length > 0
                  ? postInfo(nome, cpf, surpresinhaNumbers)
                  : postInfo(nome, cpf, clickedButtons);
                props.rodaTrevo();
                setGameOn(true);
                numerosCorretos();
              }}
            >
              Rodar
            </button>

            <button
              disabled={isSurpresinhaClicked || clickedButtons.length >= 1}
              className="botao-surpresinha"
              onClick={() => {
                surpresinha(), setSurpresinhaClicked(true);
              }}
            >
              SURPRESINHA!
            </button>
            <button
              disabled={clickedButtons.length == 0}
              className="botao-backspace"
              onClick={backspace}
            >
              Apagar
            </button>
            <button
              disabled={
                clickedButtons.length == 0 && surpresinhaNumbers.length == 0
              }
              className="nova-aposta"
              onClick={() => {
                novaAposta();
              }}
            >
              Nova Aposta
            </button>
          </div>
          <div className="mostrar-apostas">
            <button
              className="botao-mostrar-apostas"
              onClick={() => {
                setGameOn(false), setShowApostas(true);
              }}
            >
              Mostrar todas as apostas
            </button>
          </div>
        </div>
      )}
      {showApostas && <Apostas />}
      {isGameOn && (
        <Results
          rodaTrevo={props.rodaTrevo}
          clickedButtons={clickedButtons}
          surpresinhaNumbers={surpresinhaNumbers}
          arrayCorretos={arrayCorretos}
        />
      )}
    </div>
  );
}

export default Game;

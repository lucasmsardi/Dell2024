import React, { useState, useEffect } from "react";
import "./Apostas.css";
import { getInfo } from "../../service/game.service";

function Apostas() {
  const [apostas, setApostas] = useState([]);

  useEffect(() => {
    const buscaDados = async () => {
      try {
        const data = await getInfo();
        setApostas(data);
      } catch (error) {
        console.error("Erro buscando informações:", error);
      }
    };

    buscaDados();
  }, []);

  return (
    <div className="box-apostas">
      <h1>Lista de Apostas</h1>
      <ol className="cada-aposta">
        {apostas.map((aposta, index) => (
          <li key={index}>
            Nome: {aposta.nome}, CPF: {aposta.cpf}, Números:{" "}
            {aposta.numeros.join(", ")}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Apostas;

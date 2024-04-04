import { useState } from "react";
import { getInfo } from "../../service/game.service";
import "./Footer.css";

function Footer() {
  const [textoFooter, setTextoFooter] = useState();

  async function mostrarMaisJogados() {
    const allData = await getInfo();
    const allNumbers = allData.flatMap((data) => data.numeros);
    const frequencyMap = {};
    allNumbers.forEach((number) => {
      frequencyMap[number] = (frequencyMap[number] || 0) + 1;
    });
    const keys = Object.keys(frequencyMap);
    const mostPlayed = keys.slice(0, 5);
    const newObject = {};
    mostPlayed.forEach((key) => {
      newObject[key] = frequencyMap[key];
    });

    let text = "Esses são os números mais jogados: ";
    mostPlayed.forEach((key, index) => {
      text += `${key}: ${frequencyMap[key]}`;
      if (index < mostPlayed.length - 1) {
        text += " vezes, ";
      } else {
        text += " vezes";
      }
    });

    setTextoFooter(text);
  }

  mostrarMaisJogados();

  return <div className="footer">{textoFooter}</div>;
}

export default Footer;

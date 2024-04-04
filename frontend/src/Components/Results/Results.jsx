import "./Results.css";
import Prize from "../Prize/Prize";

function Results(props) {
  const perdeu = "Nenhuma aposta feita acertou os 5 números! Tente novamente.";

  const sortedClicked = props.clickedButtons.slice().sort();

  const apuracao = () => {
    if (
      JSON.stringify(sortedClicked) == JSON.stringify(props.arrayCorretos) ||
      props.surpresinhaNumbers == props.arrayCorretos
    ) {
      return true;
    } else {
      return false;
    }
  };

  return <div className="Box-results">{apuracao() ? <Prize /> : perdeu}</div>;
}

export default Results;

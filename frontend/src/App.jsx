import "./App.css";
import Header from "./Components/Header/Header";
import Game from "./Components/Game/Game";
import { useState } from "react";
import Start from "./Components/Start/Start";
import Footer from "./Components/Footer/Footer";

function App() {
  const Pages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "results" },
    { id: 4, name: "prize" },
  ];

  const [isSpinning, setIsSpinning] = useState(false);

  function handleButtonClick() {
    setIsSpinning(true);
  }

  const [currentPage, setCurrentPage] = useState(Pages[0].name);

  return (
    <>
      <Header isSpinning={isSpinning} />
      {currentPage === "start" && <Start onPageChange={setCurrentPage} />}
      {currentPage === "game" && <Game rodaTrevo={handleButtonClick} />}
      <Footer />
    </>
  );
}

export default App;

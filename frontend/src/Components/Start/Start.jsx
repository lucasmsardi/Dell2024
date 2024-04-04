import { useState } from "react";
import "./Start.css";

function Start({ onPageChange }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [nameError, setNameError] = useState("");
  const [cpfError, setCpfError] = useState("");

  function setDataSessionStorage() {
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("CPF", cpf);
  }

  function handleCpfChange(e) {
    const inputCpf = e.target.value;
    setCpf(inputCpf);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name.length === 0) {
      setNameError(
        "Nome inválido. O nome deve conter pelo menos um caractere."
      );
      return;
    }

    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      setCpfError("CPF inválido. O CPF deve conter exatamente 11 números.");
      return;
    }

    setNameError("");
    setCpfError("");
    onPageChange("game");
    setDataSessionStorage();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Informe seu Nome: </label>
        <br />
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Informe seu CPF: </label>
        <br />
        <input value={cpf} onChange={handleCpfChange} />
        <br />
        {nameError && <p className="error">{nameError}</p>}
        {cpfError && <p className="error">{cpfError}</p>}
        <button className="submit" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Start;

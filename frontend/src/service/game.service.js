import axios from "axios";

async function postInfo(nome, cpf, numeros) {
  const url = "http://localhost:3000/send-info";
  const postData = { nome: nome, cpf: cpf, numeros: numeros };
  try {
    const response = await axios.post(url, postData);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

async function getInfo() {
  const usuario = await axios.get("http://localhost:3000/get-all-info");
 return usuario.data
}

export { getInfo, postInfo };

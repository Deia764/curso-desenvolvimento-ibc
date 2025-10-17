import { Form } from "./form.js";

const form = document.getElementById("formulario") as HTMLFormElement;
const tabela = document.getElementById("tabela") as HTMLTableElement;
const corpoTabela = tabela.querySelector("tbody") as HTMLTableSectionElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nomeInput = document.getElementById("nome") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const mensagemInput = document.getElementById("mensagem") as HTMLTextAreaElement;

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const mensagem = mensagemInput.value.trim();

  if (!nome || !email || !mensagem) {
    alert("Preencha todos os campos antes de enviar!");
    return;
  }

  const novoForm = new Form(nome, email, mensagem);

  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td>${novoForm.nome}</td>
    <td>${novoForm.email}</td>
    <td>${novoForm.mensagem}</td>
    <td><button class="excluir">Excluir</button></td>
  `;
  corpoTabela.appendChild(linha);

  form.reset();

  alert("Mensagem enviada com sucesso!");

  const botaoExcluir = linha.querySelector(".excluir") as HTMLButtonElement;
  botaoExcluir.addEventListener("click", () => {
    linha.remove();
  });
});

const botaoLimpar = document.getElementById("limpar") as HTMLButtonElement;
botaoLimpar.addEventListener("click", () => {
  form.reset();
});

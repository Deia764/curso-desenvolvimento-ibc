;import { Form } from "./form.js";

const formContato = document.getElementById("formulario");
const txtNome = document.getElementById("txtNome");
const txtEmail = document.getElementById("txtEmail");
const txtMensagem = document.getElementById("txtMensagem");
const btnEnviar = document.getElementById("btnEnviar");
const btnLimpar = document.getElementById("btnLimpar");
const divMensagem = document.getElementById("divMensagem");
const tabelaMensagens = document.getElementById("tabelaMensagens");

function exibirMensagem(cor, msg) {
  divMensagem.style.color = cor;
  divMensagem.textContent = msg;
}

function atualizarTabela() {
  const lista = Form.listar();
  tabelaMensagens.innerHTML = "";

  lista.forEach((form) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${form.nome}</td>
      <td>${form.email}</td>
      <td>${form.mensagem}</td>
      <td><button data-id="${form.id}" class="btnExcluir">Excluir</button></td>
    `;
    tabelaMensagens.appendChild(linha);
  });

  document.querySelectorAll(".btnExcluir").forEach((botao) => {
    botao.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      Form.excluir(id);
      atualizarTabela();
    });
  });
}

btnEnviar.addEventListener("click", () => {
  const nome = txtNome.value.trim();
  const email = txtEmail.value.trim();
  const mensagem = txtMensagem.value.trim();

  if (!nome || !email || !mensagem) {
    exibirMensagem("red", "Todos os campos são obrigatórios!");
    return;
  }

  const novoForm = new Form(nome, email, mensagem);
  novoForm.cadastrar();
  exibirMensagem("green", "Mensagem enviada com sucesso!");

  formContato.reset();
  atualizarTabela();
});

btnLimpar.addEventListener("click", () => {
  formContato.reset();
  divMensagem.textContent = "";
});

window.onload = atualizarTabela;


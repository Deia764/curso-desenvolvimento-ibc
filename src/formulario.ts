import { Form } from "./form.js";

const formulario = document.getElementById("formulario") as HTMLFormElement;
const txtNome = document.getElementById("txtNome") as HTMLInputElement;
const txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
const txtMensagem = document.getElementById("txtMensagem") as HTMLTextAreaElement;
const btnSubmit = document.getElementById("btnSubmit") as HTMLButtonElement;
const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
const divMensagem = document.getElementById("divMensagem") as HTMLDivElement;
const tabelaMensagens = document.getElementById("tabelaMensagens")!.querySelector("tbody") as HTMLTableSectionElement;

function exibirMensagem(cor: string, msg: string) {
  divMensagem.style.color = cor;
  divMensagem.textContent = msg;
  setTimeout(() => divMensagem.textContent = "", 3000);
}

function renderizarTabela() {
  const lista = Form.listar();
  tabelaMensagens.innerHTML = "";
  lista.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.email}</td>
      <td>${item.mensagem}</td>
      <td><button data-id="${item.id}">Excluir</button></td>
    `;
    const btnExcluir = tr.querySelector("button") as HTMLButtonElement;
    btnExcluir.addEventListener("click", () => {
      Form.excluir(item.id);
      renderizarTabela();
    });
    tabelaMensagens.appendChild(tr);
  });
}

formulario.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const nome = txtNome.value.trim();
  const email = txtEmail.value.trim();
  const mensagem = txtMensagem.value.trim();

  if(!nome || !email || !mensagem) {
    exibirMensagem("red", "Todos os campos são obrigatórios!");
    return;
  }

  const novoForm = new Form(nome, email, mensagem);
  novoForm.cadastrar();
  exibirMensagem("green", "Mensagem enviada com sucesso!");
  formulario.reset();
  renderizarTabela();
});

btnLimpar.addEventListener("click", () => {
  formulario.reset();
  divMensagem.textContent = "";
});

renderizarTabela();

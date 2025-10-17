import { Form } from "./form.js";

const formContato = document.getElementById("formulario") as HTMLFormElement;
const txtNome = document.getElementById("txtNome") as HTMLInputElement;
const txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
const txtMensagem = document.getElementById("txtMensagem") as HTMLTextAreaElement;
const btnEnviar = document.getElementById("btnEnviar") as HTMLButtonElement;
const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
const divMensagem = document.getElementById("divMensagem") as HTMLDivElement;
const tabelaMensagens = document.getElementById("tabelaMensagens") as HTMLTableSectionElement;

function exibirMensagem(cor: string, msg: string) {
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

  const botoesExcluir = document.querySelectorAll(".btnExcluir") as NodeListOf<HTMLButtonElement>;
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      const id = (e.target as HTMLButtonElement).getAttribute("data-id");
      if (id) {
        Form.excluir(id);
        atualizarTabela();
      }
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

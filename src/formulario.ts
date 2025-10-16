import { Form } from "./classes/form.js";

const formulario = document.getElementById("formulario") as HTMLFormElement;
const txtNome = document.getElementById("txtNome") as HTMLInputElement;
const txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
const txtMensagem = document.getElementById("txtMensagem") as HTMLTextAreaElement;
const btnSubmit = document.getElementById("btnSubmit") as HTMLButtonElement;
const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
const divMensagem = document.getElementById("divMensagem") as HTMLDivElement;

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

window.onload = () => {
  if (id) {
    btnSubmit.textContent = "Alterar";
    carregarForm(id);
  }
};

function exibirMensagem(color: string, msg: string) {
  divMensagem.style.color = color;
  divMensagem.textContent = msg;
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = txtNome.value;
  const email = txtEmail.value;
  const mensagem = txtMensagem.value;

  if (!nome || !email || !mensagem) {
    exibirMensagem("red", "Todos os campos são obrigatórios!");
    return;
  }

  if (!id) {
    const novoForm = new Form(nome, email, mensagem);
    novoForm.cadastrar();
    exibirMensagem("green", "Mensagem enviada com sucesso");
    formulario.reset();
  } else {
    let formAlterado = new Form(nome, email, mensagem);
    formAlterado.id = id;
    Form.alterar(formAlterado);
    exibirMensagem("green", "Mensagem alterada com sucesso");
  }
});

btnLimpar.addEventListener("click", () => {
  formulario.reset();
  divMensagem.textContent = "";
});

function carregarForm(id: string) {
  let formBuscado = Form.buscar(id);
  if (formBuscado) {
    txtNome.value = formBuscado.nome;
    txtEmail.value = formBuscado.email;
    txtMensagem.value = formBuscado.mensagem;
  }
}

import { Form } from "./classes/form.js";

const formContato = document.getElementById("formContato") as HTMLFormElement;
const txtNome = document.getElementById("txtNome") as HTMLInputElement;
const txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
const txtMensagem = document.getElementById("txtMensagem") as HTMLTextAreaElement;
const btnEnviar = document.getElementById("btnEnviar") as HTMLButtonElement;
const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
const divMensagem = document.getElementById("divMensagem") as HTMLDivElement;

function exibirMensagem(color: string, msg: string) {
  divMensagem.style.color = color;
  divMensagem.textContent = msg;
}

formContato.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = txtNome.value;
  const email = txtEmail.value;
  const mensagem = txtMensagem.value;

  if (!nome || !email || !mensagem) {
    exibirMensagem("red", "Todos os campos são obrigatórios!");
    return;
  }

  const novoForm = new Form(nome, email, mensagem);
  novoForm.cadastrar();

  exibirMensagem("green", "Mensagem enviada com sucesso!");
  formContato.reset();
});

btnLimpar.addEventListener("click", (event) => {
  event.preventDefault(); 
  formContato.reset(); 
  divMensagem.textContent = ""; 
});



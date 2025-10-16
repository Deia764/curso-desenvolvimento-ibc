import { Form } from "./form.js";

const formContato = document.getElementById("formContato") as HTMLFormElement;
const txtNome = document.getElementById("txtNome") as HTMLInputElement;
const txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
const txtMensagem = document.getElementById("txtMensagem") as HTMLTextAreaElement;
const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
const divMensagem = document.getElementById("divMensagem") as HTMLDivElement;
const tabela = document.createElement("table");
document.body.appendChild(tabela);

function exibirMensagem(color: string, msg: string) {
  divMensagem.style.color = color;
  divMensagem.textContent = msg;
  setTimeout(() => divMensagem.textContent = "", 3000);
}

function renderizarTabela() {
  const lista = Form.listar();
  let html = "<tr><th>Nome</th><th>E-mail</th><th>Mensagem</th><th>Ação</th></tr>";
  lista.forEach(item => {
    html += `<tr>
      <td>${item.nome}</td>
      <td>${item.email}</td>
      <td>${item.mensagem}</td>
      <td><button data-id="${item.id}">Excluir</button></td>
    </tr>`;
  });
  tabela.innerHTML = html;

  tabela.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if(id) {
        Form.excluir(id);
        renderizarTabela();
      }
    });
  });
}

formContato.addEventListener("submit", (event) => {
  event.preventDefault();

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
  renderizarTabela();
});

btnLimpar.addEventListener("click", () => {
  formContato.reset();
  divMensagem.textContent = "";
});

renderizarTabela();

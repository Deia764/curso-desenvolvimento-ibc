// Classe Form
function Form(nome, email, mensagem) {
  this.id = new Date().getTime().toString();
  this.nome = nome;
  this.email = email;
  this.mensagem = mensagem;
}

Form.prototype.cadastrar = function() {
  let lista = Form.listar();
  lista.push(this);
  localStorage.setItem("listaForm", JSON.stringify(lista));
}

Form.listar = function() {
  const dados = localStorage.getItem("listaForm");
  return dados ? JSON.parse(dados) : [];
}

Form.excluir = function(id) {
  let lista = Form.listar().filter(f => f.id !== id);
  localStorage.setItem("listaForm", JSON.stringify(lista));
  renderizarTabela();
}

// DOM
const formulario = document.getElementById("formulario");
const txtNome = document.getElementById("txtNome");
const txtEmail = document.getElementById("txtEmail");
const txtMensagem = document.getElementById("txtMensagem");
const btnSubmit = document.getElementById("btnSubmit");
const btnLimpar = document.getElementById("btnLimpar");
const divMensagem = document.getElementById("divMensagem");
const tabelaMensagens = document.getElementById("tabelaMensagens").querySelector("tbody");

// Função de mensagem
function exibirMensagem(cor, msg) {
  divMensagem.style.color = cor;
  divMensagem.textContent = msg;
  setTimeout(() => divMensagem.textContent = "", 3000);
}

// Renderizar tabela
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
    const btnExcluir = tr.querySelector("button");
    btnExcluir.addEventListener("click", function() {
      Form.excluir(item.id);
    });
    tabelaMensagens.appendChild(tr);
  });
}

// Eventos
formulario.addEventListener("submit", function(e) {
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

btnLimpar.addEventListener("click", function() {
  formulario.reset();
  divMensagem.textContent = "";
});

// Inicializa tabela
renderizarTabela();

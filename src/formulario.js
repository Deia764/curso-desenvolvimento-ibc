  import { Form } from "./form.js";

var formulario = document.getElementById("formulario");
var txtNome = document.getElementById("txtNome");
var txtEmail = document.getElementById("txtEmail");
var txtMensagem = document.getElementById("txtMensagem");
var btnSubmit = document.getElementById("btnSubmit");
var btnLimpar = document.getElementById("btnLimpar");
var divMensagem = document.getElementById("divMensagem");
var tabelaMensagens = document.getElementById("tabelaMensagens").querySelector("tbody");

function exibirMensagem(cor, msg) {
    divMensagem.style.color = cor;
    divMensagem.textContent = msg;
    setTimeout(function () { return divMensagem.textContent = ""; }, 3000);
}

function renderizarTabela() {
    var lista = Form.listar();
    tabelaMensagens.innerHTML = "";
    lista.forEach(function (item) {
        var tr = document.createElement("tr");
        tr.innerHTML = "\n      <td>".concat(item.nome, "</td>\n      <td>").concat(item.email, "</td>\n      <td>").concat(item.mensagem, "</td>\n      <td><button data-id=\"").concat(item.id, "\">Excluir</button></td>\n    ");
        var btnExcluir = tr.querySelector("button");
        btnExcluir.addEventListener("click", function () {
            Form.excluir(item.id);
            renderizarTabela();
        });
        tabelaMensagens.appendChild(tr);
    });
}

formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = txtNome.value.trim();
    var email = txtEmail.value.trim();
    var mensagem = txtMensagem.value.trim();
    if (!nome || !email || !mensagem) {
        exibirMensagem("red", "Todos os campos são obrigatórios!");
        return;
    }
    var novoForm = new Form(nome, email, mensagem);
    novoForm.cadastrar();
    exibirMensagem("green", "Mensagem enviada com sucesso!");
    formulario.reset();
    renderizarTabela();
});

btnLimpar.addEventListener("click", function () {
    formulario.reset();
    divMensagem.textContent = "";
});

renderizarTabela();

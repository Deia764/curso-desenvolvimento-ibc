import { Form } from "./form.js";
var formulario = document.getElementById("formulario");
var txtNome = document.getElementById("txtNome");
var txtEmail = document.getElementById("txtEmail");
var txtMensagem = document.getElementById("txtMensagem");
var btnSubmit = document.getElementById("btnSubmit");
var btnLimpar = document.getElementById("btnLimpar");
var divMensagem = document.getElementById("divMensagem");
var params = new URLSearchParams(window.location.search);
var id = params.get("id");
window.onload = function () {
    if (id) {
        btnSubmit.textContent = "Alterar";
        carregarForm(id);
    }
};
function exibirMensagem(color, msg) {
    divMensagem.style.color = color;
    divMensagem.textContent = msg;
}
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    var nome = txtNome.value;
    var email = txtEmail.value;
    var mensagem = txtMensagem.value;
    if (!nome || !email || !mensagem) {
        exibirMensagem("red", "Todos os campos são obrigatórios!");
        return;
    }
    if (!id) {
        var novoForm = new Form(nome, email, mensagem);
        novoForm.cadastrar();
        exibirMensagem("green", "Mensagem enviada com sucesso");
        formulario.reset();
    }
    else {
        var formAlterado = new Form(nome, email, mensagem);
        formAlterado.id = id;
        Form.alterar(formAlterado);
        exibirMensagem("green", "Mensagem alterada com sucesso");
    }
});
btnLimpar.addEventListener("click", function () {
    formulario.reset();
    divMensagem.textContent = "";
});
function carregarForm(id) {
    var formBuscado = Form.buscar(id);
    if (formBuscado) {
        txtNome.value = formBuscado.nome;
        txtEmail.value = formBuscado.email;
        txtMensagem.value = formBuscado.mensagem;
    }
}

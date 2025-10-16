import { Form } from "./form.js";

const formContato = document.getElementById("formContato");
const txtNome = document.getElementById("txtNome");
const txtEmail = document.getElementById("txtEmail");
const txtMensagem = document.getElementById("txtMensagem");
const btnLimpar = document.getElementById("btnLimpar");
const divMensagem = document.getElementById("divMensagem");
const tabela = document.getElementById("tabelaMensagens");

function exibirMensagem(color, msg) {
    divMensagem.style.color = color;
    divMensagem.textContent = msg;
    setTimeout(() => (divMensagem.textContent = ""), 3000);
}

function renderizarTabela() {
    const lista = Form.listar();
    const tbody = tabela.querySelector("tbody");
    tbody.innerHTML = "";

    lista.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.email}</td>
            <td>${item.mensagem}</td>
            <td><button data-id="${item.id}">Excluir</button></td>
        `;
        tbody.appendChild(tr);
    });

    tabela.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            if (id) {
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

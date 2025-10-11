"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
class Form {
    constructor(nome, email, mensagem) {
        this.nome = nome;
        this.email = email;
        this.mensagem = mensagem;
        this.id = crypto.randomUUID();
        this.nome = nome;
        this.email = email;
        this.mensagem = mensagem;
    }
    cadastrar() {
        const listaForm = JSON.parse(localStorage.getItem("listaForm") || "[]");
        listaForm.push(this);
        localStorage.setItem("listaForm", JSON.stringify(listaForm));
    }
    static listar() {
        const listaForm = JSON.parse(localStorage.getItem("listaForm") || "[]");
        return listaForm;
    }
    static excluir(id) {
        let listaForm = JSON.parse(localStorage.getItem("listaForm") || "[]");
        listaForm = listaForm.filter((form) => form.id !== id);
        localStorage.setItem("listaForm", JSON.stringify(listaForm));
    }
    static alterar(formAlterado) {
        let listaForm = JSON.parse(localStorage.getItem("listaForm") || "[]");
        listaForm = listaForm.map((form) => {
            if (form.id === formAlterado.id) {
                return formAlterado;
            }
            return form;
        });
        localStorage.setItem("listaForm", JSON.stringify(listaForm));
    }
    static buscar(id) {
        let listaForm = this.listar();
        let form = listaForm.find(form => form.id === id);
        return form;
    }
}
exports.Form = Form;

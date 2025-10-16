export class Form {
    constructor(nome, email, mensagem) {
        this.nome = nome;
        this.email = email;
        this.mensagem = mensagem;
        this.id = new Date().getTime().toString();
    }

    cadastrar() {
        const listaForm = JSON.parse(localStorage.getItem("listaForm") || "[]");
        listaForm.push(this);
        localStorage.setItem("listaForm", JSON.stringify(listaForm));
    }

    static listar() {
        return JSON.parse(localStorage.getItem("listaForm") || "[]");
    }

    static excluir(id) {
        let listaForm = JSON.parse(localStorage.getItem("listaForm") || "[]");
        listaForm = listaForm.filter(form => form.id !== id);
        localStorage.setItem("listaForm", JSON.stringify(listaForm));
    }
}

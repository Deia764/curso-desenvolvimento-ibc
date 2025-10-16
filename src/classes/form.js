export var Form = /** @class */ (function () {
    function Form(nome, email, mensagem) {
        this.id = new Date().getTime().toString();
        this.nome = nome;
        this.email = email;
        this.mensagem = mensagem;
    }
    Form.prototype.cadastrar = function () {
        var lista = Form.listar();
        lista.push(this);
        localStorage.setItem("listaForm", JSON.stringify(lista));
    };
    Form.listar = function () {
        var dados = localStorage.getItem("listaForm");
        return dados ? JSON.parse(dados) : [];
    };
    Form.buscar = function (id) {
        return Form.listar().find(function (f) { return f.id === id; });
    };
    Form.alterar = function (formAlterado) {
        var lista = Form.listar();
        var index = lista.findIndex(function (f) { return f.id === formAlterado.id; });
        if (index !== -1) {
            lista[index] = formAlterado;
            localStorage.setItem("listaForm", JSON.stringify(lista));
        }
    };
    Form.excluir = function (id) {
        var lista = Form.listar().filter(function (f) { return f.id !== id; });
        localStorage.setItem("listaForm", JSON.stringify(lista));
    };
    return Form;
}());

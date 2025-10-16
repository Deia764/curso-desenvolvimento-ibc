export class Form {
  id: string;
  nome: string;
  email: string;
  mensagem: string;

  constructor(nome: string, email: string, mensagem: string) {
    this.id = new Date().getTime().toString();
    this.nome = nome;
    this.email = email;
    this.mensagem = mensagem;
  }

  cadastrar(): void {
    let lista = Form.listar();
    lista.push(this);
    localStorage.setItem("listaForm", JSON.stringify(lista));
  }

  static listar(): Form[] {
    const dados = localStorage.getItem("listaForm");
    return dados ? JSON.parse(dados) : [];
  }

  static buscar(id: string): Form | undefined {
    return Form.listar().find(f => f.id === id);
  }

  static alterar(formAlterado: Form): void {
    let lista = Form.listar();
    const index = lista.findIndex(f => f.id === formAlterado.id);
    if (index !== -1) {
      lista[index] = formAlterado;
      localStorage.setItem("listaForm", JSON.stringify(lista));
    }
  }

  static excluir(id: string): void {
    let lista = Form.listar().filter(f => f.id !== id);
    localStorage.setItem("listaForm", JSON.stringify(lista));
  }
}

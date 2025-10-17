export class Form {
  id: string;
  nome: string;
  email: string;
  mensagem: string;

  constructor(nome: string, email: string, mensagem: string) {
    this.id = crypto.randomUUID();
    this.nome = nome;
    this.email = email;
    this.mensagem = mensagem;
  }

  cadastrar(): void {
    const listaForm: Form[] = JSON.parse(localStorage.getItem("listaForm") || "[]");
    listaForm.push(this);
    localStorage.setItem("listaForm", JSON.stringify(listaForm));
  }

  static listar(): Form[] {
    return JSON.parse(localStorage.getItem("listaForm") || "[]");
  }

  static excluir(id: string): void {
    let listaForm: Form[] = JSON.parse(localStorage.getItem("listaForm") || "[]");
    listaForm = listaForm.filter(f => f.id !== id);
    localStorage.setItem("listaForm", JSON.stringify(listaForm));
  }
}

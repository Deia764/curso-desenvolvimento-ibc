
export class Form {
  public id: string;

  constructor(
    public nome: string,
    public email: string,
    public mensagem: string
  ) {
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
    const listaForm: Form[] = JSON.parse(localStorage.getItem("listaForm") || "[]");
    return listaForm;
  }

  static excluir(id: string): void {
    let listaForm: Form[] = JSON.parse(localStorage.getItem("listaForm") || "[]");
    listaForm = listaForm.filter((form: Form) => form.id !== id);
    localStorage.setItem("listaForm", JSON.stringify(listaForm));
  }

  static alterar(formAlterado: Form): void {
    let listaForm: Form[] = JSON.parse(localStorage.getItem("listaForm") || "[]");
    listaForm = listaForm.map((form: Form) => {
      if (form.id === formAlterado.id) {
        return formAlterado;
      }
      return form;
    });
    localStorage.setItem("listaForm", JSON.stringify(listaForm));
  }

  static buscar(id: string): Form | undefined {
    const listaForm: Form[] = this.listar();
    const form = listaForm.find((form) => form.id === id);
    return form;
  }
}


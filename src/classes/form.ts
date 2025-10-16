export class Form {
  public id: string;

  constructor(
    public nome: string,
    public email: string,
    public mensagem: string
  ) {
    this.id = new Date().getTime().toString();
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
}

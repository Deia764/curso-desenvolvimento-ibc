export declare class Form {
    nome: string;
    email: string;
    mensagem: string;
    id: string;
    constructor(nome: string, email: string, mensagem: string);
    cadastrar(): void;
    static listar(): Form[];
    static excluir(id: string): void;
    static alterar(formAlterado: Form): void;
    static buscar(id: string): Form | undefined;
}
//# sourceMappingURL=form.d.ts.map
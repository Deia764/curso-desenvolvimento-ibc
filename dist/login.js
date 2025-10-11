const formLogin = document.getElementById("formLogin");
const txtEmail = document.getElementById("txtEmail");
const txtSenha = document.getElementById("txtSenha");
const mensagem = document.getElementById("mensagem");
formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = txtEmail.value;
    const senha = txtSenha.value;
    if (!email) {
        mensagem.style.color = "red";
        mensagem.textContent = "Preencha o email, campo obrigatório!";
        return;
    }
    if (!senha) {
        mensagem.style.color = "red";
        mensagem.textContent = "Preencha a senha, campo obrigatório!";
        return;
    }
    if (email === "admin@gmail.com" && senha === "123") {
        mensagem.style.color = "green";
        mensagem.textContent = "Login realizado com sucesso!";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    }
    else {
        mensagem.style.color = "red";
        mensagem.textContent = "Email ou senha inválidos";
    }
});
export {};
//# sourceMappingURL=login.js.map
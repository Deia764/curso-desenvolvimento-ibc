const formLogin = document.getElementById("formLogin") as HTMLFormElement;
const txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
const txtSenha = document.getElementById("txtSenha") as HTMLInputElement;
const mensagem = document.getElementById("mensagem") as HTMLDivElement;

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = txtEmail.value;
  const senha = txtSenha.value;

  if (!email) {
    mensagem.style.color = "red";
    mensagem.textContent = "Preencha o e-mail, campo obrigatório!";
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
      window.location.href = "areaRestrita.html"; 
    }, 1000);
  } else {
    mensagem.style.color = "red";
    mensagem.textContent = "E-mail ou senha inválidos";
  }
});


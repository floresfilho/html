const toggleSenha = document.getElementById("toggleSenha");
const inputSenha = document.getElementById("senha");

// Funcionalidade de mostrar/esconder senha (perfeita!)
toggleSenha.addEventListener("click", () => {
    const isPassword = inputSenha.type === "password";
    inputSenha.type = isPassword ? "text" : "password";
    toggleSenha.classList.toggle("fa-eye");
    toggleSenha.classList.toggle("fa-eye-slash");
});

// Lógica de envio de formulário para LOGIN
const loginForm = document.getElementById('loginForm'); // Usar o ID correto do HTML

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const email = document.getElementById('email').value; // Obtém o valor do email
    const senha = inputSenha.value; // Obtém o valor da senha (usando a variável correta)

    // --- AQUI VAI A LÓGICA REAL DE LOGIN ---
    // Por enquanto, podemos simular:

    console.log("Tentativa de Login:");
    console.log("Email:", email);
    console.log("Senha:", senha);

    // Exemplo de validação simples (apenas para demonstração)
    if (email === "teste@email.com" && senha === "0000") {
        alert("Login bem-sucedido! Bem-vindo(a)!");
        // Redirecionar para a página principal ou dashboard, por exemplo
        window.location.href = "../feed/index.html"; // Exemplo de redirecionamento
    } else {
        alert("Email ou senha incorretos. Tente novamente.");
    }

    // Opcional: Limpar campos após a tentativa de login
    loginForm.reset();
    inputSenha.type = 'password'; // Garante que a senha volte a ser tipo 'password'
    toggleSenha.classList.add("fa-eye"); // Garante que o ícone volte a ser o olho aberto
    toggleSenha.classList.remove("fa-eye-slash");
});
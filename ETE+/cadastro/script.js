// script da página de cadastro

// 1. Mostrar/Esconder Senha
const inputSenha = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha"); // Usar o ID correto do ícone

// Adiciona um listener de clique no ícone para alternar a visibilidade da senha
toggleSenha.addEventListener("click", () => {
    // Verifica se o tipo atual do input é 'password'
    const isPassword = inputSenha.type === "password";

    // Alterna o tipo do input entre 'text' e 'password'
    inputSenha.type = isPassword ? "text" : "password";

    // Alterna as classes do Font Awesome para mudar o ícone (olho aberto/fechado)
    toggleSenha.classList.toggle("fa-eye");
    toggleSenha.classList.toggle("fa-eye-slash");
});

// 2. Lógica de Envio do Formulário de Cadastro
const cadastroForm = document.getElementById('cadastroForm'); // Usar o ID correto do formulário

cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página (comportamento padrão do formulário)

    // Captura os valores dos campos
    const nome = document.getElementById('nome').value.trim(); // .trim() para remover espaços em branco no início/fim
    const email = document.getElementById('email').value.trim();
    const senha = inputSenha.value; // Usar a variável 'inputSenha' já declarada
    const newsletter = document.getElementById('newsletter').checked;

    // --- Validações Básicas (Essencial para um cadastro) ---
    // Você pode expandir muito esta seção!

    // Exemplo: Validação de campos vazios (além do 'required' do HTML)
    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return; // Interrompe a execução da função se houver erro
    }

    // Exemplo: Validação de formato de email (básica)
    if (!email.includes('@') || !email.includes('.')) {
        alert("Por favor, insira um email válido.");
        return;
    }

    // Exemplo: Validação de força da senha (mínimo de caracteres)
    if (senha.length < 6) { // Senha com pelo menos 6 caracteres
        alert("A senha deve ter no mínimo 6 caracteres.");
        return;
    }

    // --- Se você descomentar o campo de "confirmar senha" no HTML, adicione aqui: ---
    /*
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem. Por favor, digite novamente.");
        return;
    }
    */

    // --- Se você descomentar o campo de "termos de serviço" no HTML, adicione aqui: ---
    /*
    const termosAceitos = document.getElementById('termos').checked;
    if (!termosAceitos) {
        alert("Você deve aceitar os Termos de Serviço e Política de Privacidade para se cadastrar.");
        return;
    }
    */

    // --- Simulação de Cadastro (Após todas as validações) ---
    // Em um projeto real, aqui você enviaria os dados para um servidor (API)
    // usando fetch() ou XMLHttpRequest.

    alert(`Cadastro realizado com sucesso!\n\nNome: ${nome}\nEmail: ${email}\nReceber newsletter: ${newsletter ? 'Sim' : 'Não'}`);

    // Limpa os campos do formulário após o "cadastro"
    cadastroForm.reset();

    // Redefine o campo de senha para 'password' e o ícone para o olho aberto
    inputSenha.type = 'password';
    toggleSenha.classList.add("fa-eye");
    toggleSenha.classList.remove("fa-eye-slash");

    // Opcional: Redirecionar o usuário para a tela de login após o cadastro
    window.location.href = "../login/index.html";
});
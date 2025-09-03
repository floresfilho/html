// script da página de feed

// Seleciona os elementos do DOM
const feed = document.getElementById('feed');
const novaPostagemButton = document.getElementById('novaPostagem');

// Array para armazenar postagens
// Verifica se há postagens salvas no localStorage e as carrega, caso contrário, usa a postagem inicial
let postagens = JSON.parse(localStorage.getItem('postagensFeed')) || [
    {
        titulo: "Bem-vindo ao ETE+!",
        descricao: "Essa é sua primeira postagem. Crie novas clicando no botão '+'.", // Corrigido para 'descricao'
        data: new Date()
    }
];

// Garante que as datas carregadas do localStorage sejam objetos Date
postagens = postagens.map(post => ({
    ...post,
    data: new Date(post.data)
}));

// Função para formatar data/hora para exibição
function formatarData(data) {
    return data.toLocaleString('pt-br', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// Função para renderizar as postagens no HTML
function renderizarFeed() {
    feed.innerHTML = ''; // Limpa o conteúdo atual para re-renderizar

    // Se não houver postagens, mostra uma mensagem
    if (postagens.length === 0) {
        feed.innerHTML = '<p class="no-posts-message">Nenhuma postagem ainda. Que tal criar uma?</p>';
        return; // Sai da função
    }

    // Itera sobre o array de postagens e cria os cards no HTML
    postagens.forEach((post, index) => { // Adicionado 'index' para identificar a postagem
        const card = document.createElement('div');
        card.classList.add('postagem');

        // Estrutura interna do card usando template literals
        card.innerHTML = `
            <h3>${post.titulo}</h3>
            <p>${post.descricao}</p>
            <div class="card-footer">
                <div class="hora">${formatarData(post.data)}</div>
                <button class="delete-post" data-index="${index}" aria-label="Excluir postagem"><i class="fas fa-trash"></i></button>
            </div>
        `;

        feed.appendChild(card);
    });

    // Adiciona event listeners para os botões de exclusão APÓS as postagens serem renderizadas
    document.querySelectorAll('.delete-post').forEach(button => {
        button.addEventListener('click', (e) => {
            const indexToDelete = parseInt(e.currentTarget.dataset.index);
            excluirPostagem(indexToDelete);
        });
    });
}

// Função para excluir uma postagem
function excluirPostagem(index) {
    if (confirm("Tem certeza que deseja excluir esta postagem?")) {
        postagens.splice(index, 1); // Remove 1 elemento a partir do índice
        localStorage.setItem('postagensFeed', JSON.stringify(postagens)); // Atualiza localStorage
        renderizarFeed(); // Re-renderiza o feed
    }
}

// Adiciona nova postagem ao clicar no botão '+'
novaPostagemButton.addEventListener('click', () => {
    // Para uma UX melhor, seria um modal de formulário aqui, em vez de prompts
    const titulo = prompt("Título da postagem:");
    const descricao = prompt("Descrição da postagem:"); // Corrigido para 'descricao'

    // Verifica se o usuário digitou algo em ambos os prompts
    if (titulo && descricao) {
        const nova = {
            titulo: titulo.trim(), // Remove espaços em branco
            descricao: descricao.trim(), // Remove espaços em branco
            data: new Date() // Data e hora atuais
        };

        postagens.unshift(nova); // Adiciona a nova postagem no início do array
        localStorage.setItem('postagensFeed', JSON.stringify(postagens)); // Salva no localStorage
        renderizarFeed(); // Atualiza o feed na tela
    } else {
        // Se o usuário cancelou ou deixou campos em branco
        alert("A criação da postagem foi cancelada ou campos não foram preenchidos.");
    }
});

// Exibe o conteúdo inicial do feed ao carregar a página
renderizarFeed();
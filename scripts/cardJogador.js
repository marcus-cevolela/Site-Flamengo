let elencoCompleto = [];
let ordemCrescente = false;

fetch("assets/dados/elenco.json")
    .then(res => res.json())
    .then(elenco => {
        elencoCompleto = elenco;
        renderizarElenco(elenco);
    });

function renderizarElenco(jogadores) {
    const container = document.querySelector(".elenco");
    container.innerHTML = '';

    jogadores.forEach(jogador => {
        const card = document.createElement("div");
        card.classList.add("cardJogador");
        card.innerHTML = `
            <span class="numeroFoto">${jogador.numero}</span>
            <img src="assets/images/jogadores/${jogador.foto}" alt="${jogador.nome}" class="imgJogador">
            <span class="posicaoJogador">${jogador.posicao.toUpperCase()}</span>
            <div class="infoJogador">
                <span class="nomeJogador">${jogador.nome}</span>
                <div class="subInfos">
                    <span class="numeroJogador">#${jogador.numero}</span>
                    <span class="nacionalidade">
                        <img src="assets/images/bandeiras/${jogador.bandeira}" alt="">
                    </span>
                </div>
            </div>
        `;

        card.addEventListener("click", () => {
            if (typeof abrirModal === "function") {
                abrirModal(jogador);
            }
        });

        container.appendChild(card);
    });
}

function aplicarFiltros() {
    const posicaoAtiva = document.querySelector('.filtroElencoBtn:not(#btnOrdenar).filtroElencoAtivo').dataset.posicao;

    let resultado = posicaoAtiva === 'todos'
        ? [...elencoCompleto]
        : elencoCompleto.filter(j => j.posicao === posicaoAtiva);

    if (ordemCrescente) {
        resultado.sort((a, b) => a.numero - b.numero);
    }

    renderizarElenco(resultado);
}

// filtro de posicao
document.querySelectorAll('.filtroElencoBtn:not(#btnOrdenar)').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filtroElencoBtn:not(#btnOrdenar)').forEach(b => b.classList.remove('filtroElencoAtivo'));
        btn.classList.add('filtroElencoAtivo');
        aplicarFiltros();
    });
});

// ordena por numero
document.getElementById('btnOrdenar').addEventListener('click', () => {
    ordemCrescente = !ordemCrescente;

    const btn = document.getElementById('btnOrdenar');
    btn.textContent = ordemCrescente ? '↓ Nº CAMISA' : '↑ Nº CAMISA';
    btn.classList.toggle('filtroElencoAtivo', ordemCrescente);

    aplicarFiltros();
});
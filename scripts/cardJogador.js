fetch("assets/dados/elenco.json")
    .then(res => res.json())
    .then(elenco => {

        const container = document.querySelector(".elenco");

        elenco.forEach(jogador => {
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
            container.appendChild(card);
        });

    });
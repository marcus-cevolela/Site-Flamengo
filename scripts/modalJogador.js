function abrirModal(jogador) {
    const overlay = document.getElementById("overlayModal");

    document.getElementById("modalFoto").src = `assets/images/jogadores/${jogador.foto}`;
    document.getElementById("modalPosicao").textContent = jogador.posicao;
    document.getElementById("modalNumero").textContent = jogador.numero;
    document.getElementById("modalApelido").textContent = jogador.nome.toUpperCase();
    document.getElementById("modalNomeCompleto").textContent = jogador.nomeCompleto;
    document.getElementById("modalBandeira").src = `assets/images/bandeiras/${jogador.bandeira}`;
    document.getElementById("modalSobre").textContent = jogador.sobre ?? "---";

    document.querySelector("[data-nascimento]").textContent = jogador.nascimento ?? "---";
    document.querySelector("[data-naturalidade]").textContent = jogador.naturalidade ?? "---";
    document.querySelector("[data-altura]").textContent = jogador.altura ?? "---";
    document.querySelector("[data-pe]").textContent = jogador.peDominante ?? "---";
    document.querySelector("[data-chegada]").textContent = jogador.chegada ?? "---";

    const statJogos = document.querySelector("[data-jogos]");
    const statGols = document.querySelector("[data-gols]");
    const statAssist = document.querySelector("[data-assistencias]");

    const labelGols = document.querySelector(".statLabel:nth-child(2)");

    statJogos.textContent = jogador.jogos ?? "---";

    if (jogador.posicao === "Goleiro") {
        //gols sofridos
        statGols.textContent = jogador.golsSofridos ?? "---";
        statGols.closest(".statItem").querySelector(".statLabel").textContent = "GOLS SOFRIDOS";

        //jogos sem sofrer gols
        statAssist.textContent = jogador.jogosSemGols ?? "---";
        statAssist.closest(".statItem").querySelector(".statLabel").textContent = "S/ SOFRER GOLS";
    } else {
        statGols.textContent = jogador.gols ?? "---";
        statGols.closest(".statItem").querySelector(".statLabel").textContent = "GOLS";

        statAssist.textContent = jogador.assistencias ?? "---";
        statAssist.closest(".statItem").querySelector(".statLabel").textContent = "ASSIST.";
    }

    // títulos
    const titulosGrid = document.getElementById("titulosGrid");
    titulosGrid.innerHTML = "";
    if (jogador.titulos && jogador.titulos.length > 0) {
        jogador.titulos.forEach(t => {
            titulosGrid.innerHTML += `
                <div class="tituloItem">
                    <span class="tituloNome">${t.nome}</span>
                    <span class="tituloQtd">${t.quantidade}</span>
                </div>
            `;
        });
    } else {
        titulosGrid.innerHTML = `<p class="semTitulos">---</p>`;
    }

    overlay.style.display = "flex";

    // total de títulos
    const total = jogador.titulos
        ? jogador.titulos.reduce((acc, t) => acc + t.quantidade, 0)
        : 0;
    document.getElementById('totalTitulosJogador').textContent = total;
}


document.getElementById("overlayModal").addEventListener("click", function (e) {
    if (e.target === this) this.style.display = "none";
});
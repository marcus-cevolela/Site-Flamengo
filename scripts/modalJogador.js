function abrirModal(jogador) {
    const overlay = document.getElementById("overlayModal");

    document.getElementById("modalFoto").src = `assets/images/jogadores/${jogador.foto}`;
    document.getElementById("modalPosicao").textContent = jogador.posicao;
    document.getElementById("modalNumero").textContent = jogador.numero;
    document.getElementById("modalApelido").textContent = jogador.nome.toUpperCase();
    document.getElementById("modalNomeCompleto").textContent = jogador.nomeCompleto;
    document.getElementById("modalBandeira").src = `assets/images/bandeiras/${jogador.bandeira}`;
    document.getElementById("modalSobre").textContent = jogador.sobre ?? "---";

    document.querySelector("[data-jogos]").textContent = jogador.jogos ?? "---";
    document.querySelector("[data-gols]").textContent = jogador.gols ?? "---";
    document.querySelector("[data-assistencias]").textContent = jogador.assistencias ?? "---";
    document.querySelector("[data-nascimento]").textContent = jogador.nascimento ?? "---";
    document.querySelector("[data-naturalidade]").textContent = jogador.naturalidade ?? "---";
    document.querySelector("[data-chegada]").textContent = jogador.chegada ?? "---";
    document.querySelector("[data-saida]").textContent = jogador.saida ?? "---";
    document.querySelector("[data-altura]").textContent = jogador.altura ?? "---";
    document.querySelector("[data-pe]").textContent = jogador.peDominante ?? "---";

    const titulosGrid = document.getElementById("titulosGrid");
    titulosGrid.innerHTML = "";
    if (jogador.titulos.length > 0) {
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
}

document.getElementById("overlayModal").addEventListener("click", function (e) {
    if (e.target === this) this.style.display = "none";
});
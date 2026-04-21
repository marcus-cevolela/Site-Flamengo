var cardAtual = 0;

fetch("assets/dados/titulos.json")
    .then(res => res.json())
    .then(titulos => {

        const container = document.getElementById("idCarrosselTacas");

        titulos.forEach(titulo => {
            const card = document.createElement("div");
            card.classList.add("cardTitulo");
            card.innerHTML = `
                <h1 class="nomeTitulo">${titulo.nome.toUpperCase()}</h1>
                <img class="imgTaca" id="taca${titulo.nome.trim().replace(/\s+/g, '')}" src="assets/images/tacas/${titulo.foto}" alt="${titulo.nome}">
                <h2 class="qtdTitulos">${titulo.quantidade}</h2>
                <span class="anosTitulos">${titulo.anos}</span>
            `;
            container.appendChild(card);
        });

        const imagens = container.querySelectorAll("img");
        let carregadas = 0;
        const total = imagens.length;

        function checarCarregamento() {
            carregadas++;
            if (carregadas === total) atualizarCarrosselTacas();
        }

        imagens.forEach(img => {
            if (img.complete) {
                checarCarregamento();
            } else {
                img.addEventListener("load", checarCarregamento);
                img.addEventListener("error", checarCarregamento);
            }
        });

    });

function atualizarCarrosselTacas() {
    var cards = document.getElementById("idCarrosselTacas").children;
    var total = cards.length;
    var deslocamentos = [-420, -230, 0, 230, 420];
    var escalas = [0.65, 0.82, 1.00, 0.82, 0.65];
    var classes = ["longe", "lateral", "ativo", "lateral", "longe"];

    for (var i = 0; i < total; i++) {
        var posicao = i - cardAtual;
        if (posicao < -2) posicao = posicao + total;
        if (posicao > 2) posicao = posicao - total;
        var slot = posicao + 2;

        cards[i].style.transform = "translateX(" + deslocamentos[slot] + "px) scale(" + escalas[slot] + ")";
        cards[i].style.zIndex = slot == 2 ? 5 : slot == 1 || slot == 3 ? 2 : 1;
        cards[i].className = "cardTitulo " + classes[slot];

        if (slot == 2) {
            cards[i].style.bottom = "1rem";
        } else {
            cards[i].style.bottom = "0";
        }
    }
}

function moverCarrosselTacas(direcao) {
    var total = document.getElementById("idCarrosselTacas").children.length;
    cardAtual = cardAtual + direcao;
    if (cardAtual < 0) cardAtual = total - 1;
    if (cardAtual >= total) cardAtual = 0;
    atualizarCarrosselTacas();
}

document.getElementById("idCarrosselTacas").addEventListener("click", function(e) {
    var card = e.target.closest(".cardTitulo");
    if (!card || card.classList.contains("ativo")) return;

    var cards = document.getElementById("idCarrosselTacas").children;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i] == card) {
            var diff = i - cardAtual;
            if (diff > 2) diff = diff - cards.length;
            if (diff < -2) diff = diff + cards.length;
            moverCarrosselTacas(diff);
            break;
        }
    }
});
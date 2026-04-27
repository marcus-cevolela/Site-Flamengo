/* carrossel tacas*/
let _atualizarCarrosselTacasOriginal = null;

function _getDeslocamentos() {
    let w = window.innerWidth;
    if (w <= 400) {
        return { deslocamentos: [-160, -90, 0, 90, 160], escalas: [0.50, 0.72, 1.00, 0.72, 0.50] };
    } else if (w <= 480) {
        return { deslocamentos: [-185, -105, 0, 105, 185], escalas: [0.55, 0.75, 1.00, 0.75, 0.55] };
    } else if (w <= 600) {
        return { deslocamentos: [-210, -120, 0, 120, 210], escalas: [0.58, 0.78, 1.00, 0.78, 0.58] };
    } else if (w <= 768) {
        return { deslocamentos: [-240, -140, 0, 140, 240], escalas: [0.60, 0.80, 1.00, 0.80, 0.60] };
    } else if (w <= 1024) {
        return { deslocamentos: [-320, -180, 0, 180, 320], escalas: [0.62, 0.81, 1.00, 0.81, 0.62] };
    }
    return { deslocamentos: [-420, -230, 0, 230, 420], escalas: [0.65, 0.82, 1.00, 0.82, 0.65] };
}

function atualizarCarrosselTacas() {
    let cards = document.getElementById("idCarrosselTacas");
    if (!cards) return;
    cards = cards.children;

    let total = cards.length;
    let config = _getDeslocamentos();
    let deslocamentos = config.deslocamentos;
    let escalas = config.escalas;
    let classes = ["longe", "lateral", "ativo", "lateral", "longe"];

    for (let i = 0; i < total; i++) {
        let posicao = i - cardAtual;
        if (posicao < -2) posicao = posicao + total;
        if (posicao > 2) posicao = posicao - total;
        let slot = posicao + 2;

        if (slot < 0 || slot > 4) {
            cards[i].className = "cardTitulo";
            cards[i].style.pointerEvents = "none";
            continue;
        }

        cards[i].style.pointerEvents = "auto";
        cards[i].style.transform = "translateX(" + deslocamentos[slot] + "px) scale(" + escalas[slot] + ")";
        cards[i].style.zIndex = slot == 2 ? 5 : (slot == 1 || slot == 3 ? 2 : 1);
        cards[i].className = "cardTitulo " + classes[slot];
        cards[i].dataset.indice = i;
        cards[i].style.bottom = slot == 2 ? "1rem" : "0";
    }
}

let _resizeTimer = null;
window.addEventListener("resize", function () {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(function () {
        atualizarCarrosselTacas();
    }, 120);
});


/* carrossel idolo */
document.addEventListener("DOMContentLoaded", function () {

    function ajustarAlturaIdolo() {
        let bio = document.querySelector(".bioIdolo");
        let conteudoIdolo = document.querySelector(".conteudoIdolo");
        if (!bio || !conteudoIdolo) return;

        if (window.innerWidth <= 768) {
            bio.style.maxHeight = "220px";
            bio.style.overflowY = "auto";
        } else if (window.innerWidth <= 1024) {
            bio.style.maxHeight = "200px";
            bio.style.overflowY = "auto";
        } else {
            bio.style.maxHeight = "";
            bio.style.overflowY = "";
        }
    }

    ajustarAlturaIdolo();
    window.addEventListener("resize", ajustarAlturaIdolo);


    let dotsContainer = document.querySelector(".dotsIdolos");
    if (!dotsContainer) return;

    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mut) {
            if (mut.type === "attributes" && mut.attributeName === "class") {
                let dot = mut.target;
                if (dot.classList.contains("ativo")) {
                    scrollDotIntoView(dot);
                }
            }
        });
    });

    function iniciarObservadorDots() {
        let dots = dotsContainer.querySelectorAll(".navDot");
        dots.forEach(function (dot) {
            observer.observe(dot, { attributes: true });
        });
    }

    function scrollDotIntoView(dot) {
        if (!dot || !dotsContainer) return;
        let containerRect = dotsContainer.getBoundingClientRect();
        let dotRect = dot.getBoundingClientRect();
        let dotCenter = dotRect.left - containerRect.left + dotRect.width / 2;
        let containerCenter = dotsContainer.clientWidth / 2;
        let scrollTarget = dotsContainer.scrollLeft + (dotCenter - containerCenter);
        dotsContainer.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
    let tentativas = 0;
    let intervalo = setInterval(function () {
        tentativas++;
        let dots = dotsContainer.querySelectorAll(".navDot");
        if (dots.length > 0) {
            clearInterval(intervalo);
            iniciarObservadorDots();
        }
        if (tentativas > 40) clearInterval(intervalo);
    }, 100);
});

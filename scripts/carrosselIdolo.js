fetch("assets/dados/idolos.json")
    .then(res => res.json())
    .then(idolos => {

        let indiceAtual = 0;

        function renderizarIdolo(indice) {
            const idolo = idolos[indice];

            document.querySelector(".tituloIdolo").textContent = idolo.nome;
            document.querySelector(".posicaoIdolo").textContent = idolo.posicao.toUpperCase();
            document.querySelector(".bioIdolo").textContent = idolo.bio;
            document.querySelector(".subtituloNoClube").textContent = idolo.noClube;
            document.querySelector(".subtituloJogos").textContent = idolo.jogos ?? "---";
            document.querySelector(".fotoIdolo").src = `assets/images/idolos/${idolo.foto}`;
            document.querySelector(".fotoIdolo").alt = idolo.nome;
            document.querySelector(".fotoDescricao").textContent = idolo.fotoDescricao;

            const labelGolsVitorias = document.querySelector(".labelGolsVitorias");
            const valorGolsVitorias = document.querySelector(".subtituloGols");

            if (idolo.vitorias !== undefined) {
                labelGolsVitorias.textContent = "VITÓRIAS";
                valorGolsVitorias.textContent = idolo.vitorias;
            } else {
                labelGolsVitorias.textContent = "GOLS";
                valorGolsVitorias.textContent = idolo.gols ?? "---";
            }

            document.querySelectorAll(".navDot").forEach((dot, i) => {
                dot.classList.toggle("ativo", i === indice);
            });
        }

        const navIdolos = document.querySelector(".navIdolos");
        idolos.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.classList.add("navDot");
            if (i === 0) dot.classList.add("ativo");
            dot.addEventListener("click", () => {
                indiceAtual = i;
                renderizarIdolo(indiceAtual);
            });
            navIdolos.prepend(dot);
        });

        document.getElementById("proximoIdolo").addEventListener("click", () => {
            indiceAtual = (indiceAtual + 1) % idolos.length;
            renderizarIdolo(indiceAtual);
        });

        document.getElementById("anteriorIdolo").addEventListener("click", () => {
            indiceAtual = (indiceAtual - 1 + idolos.length) % idolos.length;
            renderizarIdolo(indiceAtual);
        });

        renderizarIdolo(0);

    });
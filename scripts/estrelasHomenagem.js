function gerarPontinhos(quantidade = 20) {
    const caixaCeu = document.querySelector('.caixaCeu');

    for (let i = 0; i < quantidade; i++) {
        const pontinho = document.createElement('span');
        pontinho.classList.add('pontinho');

        //posicao aleatoria
        pontinho.style.top  = `${Math.random() * 95}%`;
        pontinho.style.left = `${Math.random() * 95}%`;

        //variar a animacao
        pontinho.style.animationDelay    = `${(Math.random() * 3).toFixed(2)}s`;
        pontinho.style.animationDuration = `${(1.5 + Math.random() * 2).toFixed(2)}s`;

        //variar o tamanho
        const tamanho = `${1 + Math.random() * 3}px`;
        pontinho.style.width  = tamanho;
        pontinho.style.height = tamanho;

        caixaCeu.appendChild(pontinho);
    }
}

gerarPontinhos(100);

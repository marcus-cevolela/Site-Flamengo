let fotosCarregadas = [];
let fotosFiltradas = [];
let fotosVisiveis = 4;

const basePath = 'assets/images/galeria/';

function preCarregarGifs(fotos) {
    fotos
        .filter(f => f.gif)
        .forEach(f => {
            const img = new Image();
            img.src = basePath + f.gif;
        });
}

fetch("assets/dados/galeria.json")
    .then(res => res.json())
    .then(fotos => {
        fotosCarregadas = fotos;
        fotosFiltradas = fotos;

        preCarregarGifs(fotos);

        document.querySelectorAll('.itemFiltro').forEach(btn => {
            const categoria = btn.dataset.categoria;
            const quantidade = categoria === 'todos'
                ? fotos.length
                : fotos.filter(f => f.categoria === categoria).length;
            btn.querySelector('.subFiltro').textContent = `${quantidade} Fotos`;
        });

        renderizarGrid();
    });

function renderizarGrid() {
    const grid = document.querySelector('.gridGaleria');
    grid.innerHTML = '';

    const fatia = fotosFiltradas.slice(0, fotosVisiveis);

    fatia.forEach((foto, index) => {
        const item = document.createElement('div');
        item.classList.add('itemGaleria');

        const isGol = foto.categoria === 'gols' && foto.gif;

        item.innerHTML = `
            <img src="${basePath}${foto.src}" class="imgGaleria" alt="${foto.titulo}">
            <div class="overlayGaleria">
                <div class="badgeGaleria ${isGol ? 'badgeGol' : ''}">
                    <span>${isGol ? '● GOL' : foto.badge}</span>
                </div>
                <span class="tituloGaleria">${foto.titulo}</span>
                <span class="subGaleria">${foto.descricao}</span>
            </div>
        `;

        item.addEventListener('click', () => abrirModalGaleria(index, fatia));
        grid.appendChild(item);
    });

    document.getElementById('contadorGaleria').innerHTML =
        `Exibindo <b>${Math.min(fotosVisiveis, fotosFiltradas.length)}</b> de <b>${fotosFiltradas.length}</b> fotos`;

    const btnMais = document.getElementById('btnVerMais');
    btnMais.style.display = fotosVisiveis >= fotosFiltradas.length ? 'none' : 'flex';
}

// filtros
document.querySelectorAll('.itemFiltro').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.itemFiltro').forEach(b => b.classList.remove('filtroAtivo'));
        btn.classList.add('filtroAtivo');

        const categoria = btn.dataset.categoria;
        fotosFiltradas = categoria === 'todos'
            ? fotosCarregadas
            : fotosCarregadas.filter(f => f.categoria === categoria);

        fotosVisiveis = 4;
        renderizarGrid();
    });
});

// ver mais
document.getElementById('btnVerMais').addEventListener('click', () => {
    fotosVisiveis += 4;
    renderizarGrid();
});

// modal
function abrirModalGaleria(index, fotos) {
    const foto = fotos[index];
    const overlay = document.getElementById('overlayModalGaleria');
    const modalFoto = document.getElementById('modalGaleriaFoto');
    const btnGif = document.getElementById('btnGif');

    modalFoto.src = basePath + foto.src;

    // botão gif
    const temGif = foto.gif && foto.categoria === 'gols';
    btnGif.style.display = temGif ? 'block' : 'none';
    btnGif.textContent = '▶ VER O GOL';
    btnGif.classList.remove('rodando');

    // alterna entre gif e foto
    btnGif.onclick = () => {
        const gifRodando = btnGif.classList.contains('rodando');
        if (gifRodando) {
            modalFoto.src = basePath + foto.src;
            btnGif.textContent = '▶ VER O GOL';
            btnGif.classList.remove('rodando');
        } else {
            modalFoto.classList.add('carregando');
            btnGif.textContent = '⏳ CARREGANDO...';
            btnGif.disabled = true;

            const gifTemp = new Image();
            gifTemp.src = basePath + foto.gif;
            gifTemp.onload = () => {
                modalFoto.src = basePath + foto.gif;
                modalFoto.classList.remove('carregando');
                btnGif.textContent = '⏹ VER A FOTO';
                btnGif.classList.add('rodando');
                btnGif.disabled = false;
            };
        }
    };

    document.getElementById('modalGaleriaTitulo').textContent = foto.titulo;
    document.getElementById('modalGaleriaCategoria').textContent = foto.badge;
    document.getElementById('modalGaleriaData').textContent = foto.data;
    document.getElementById('modalGaleriaDesc').textContent = foto.descricao;
    document.getElementById('navContador').textContent = `${index + 1} / ${fotos.length}`;

    // thumbnails
    const thumbsGrid = document.getElementById('thumbsGrid');
    thumbsGrid.innerHTML = '';

    const mesmaCategoria = fotosCarregadas
        .filter(f => f.categoria === foto.categoria && f.id !== foto.id);

    const aleatorias = mesmaCategoria
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    const thumbsFinal = [foto, ...aleatorias];

    thumbsFinal.forEach((f, i) => {
        const img = document.createElement('img');
        img.src = basePath + f.src;
        img.classList.add('thumbItem');
        if (i === 0) img.classList.add('ativo');
        img.addEventListener('click', () => abrirModalGaleria(
            fotos.findIndex(ft => ft.id === f.id),
            fotos
        ));
        thumbsGrid.appendChild(img);
    });

    document.getElementById('btnAnterior').onclick = () =>
        abrirModalGaleria(index > 0 ? index - 1 : fotos.length - 1, fotos);
    document.getElementById('btnProximo').onclick = () =>
        abrirModalGaleria(index < fotos.length - 1 ? index + 1 : 0, fotos);

    overlay.style.display = 'flex';
}

// fecha modal
document.getElementById('overlayModalGaleria').addEventListener('click', (e) => {
    if (e.target === document.getElementById('overlayModalGaleria')) {
        document.getElementById('overlayModalGaleria').style.display = 'none';
    }
});
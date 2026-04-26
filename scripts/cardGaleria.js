let fotosCarregadas = [];
let fotosFiltradas = [];
let fotosVisiveis = 4;

const basePath = 'assets/images/galeria/';

function getSrc(foto) {
    return basePath + foto.src;
}

function getGif(foto) {
    return foto.gif.startsWith('http') ? foto.gif : basePath + foto.gif;
}

function preCarregarGifs(fotos) {
    fotos
        .filter(f => f.gif)
        .forEach(f => {
            const img = new Image();
            img.src = getGif(f);
        });
}

fetch("assets/dados/galeria.json")
    .then(res => res.json())
    .then(fotos => {
        fotosCarregadas = fotos;
        fotosFiltradas = [...fotos].sort(() => Math.random() - 0.5);

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

    fatia.forEach((foto) => {
        const item = document.createElement('div');
        item.classList.add('itemGaleria');

        const isGol = foto.categoria === 'gols' && foto.gif;

        item.innerHTML = `
            <img src="${getSrc(foto)}" class="imgGaleria" alt="${foto.titulo}">
            <div class="overlayGaleria">
                <div class="badgeGaleria ${isGol ? 'badgeGol' : ''}">
                    <span>${isGol ? '● GOL' : foto.badge}</span>
                </div>
                <span class="tituloGaleria">${foto.titulo}</span>
                <span class="subGaleria">${foto.descricao}</span>
            </div>
        `;

        item.addEventListener('click', () => abrirModalGaleria(foto.id, fotosFiltradas));
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
        const base = categoria === 'todos'
            ? fotosCarregadas
            : fotosCarregadas.filter(f => f.categoria === categoria);

        fotosFiltradas = [...base].sort(() => Math.random() - 0.5);

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
function abrirModalGaleria(id, fotos) {
    const index = fotos.findIndex(f => f.id === id);
    const foto = fotos[index];

    if (!foto) return;

    const overlay = document.getElementById('overlayModalGaleria');
    const modalFoto = document.getElementById('modalGaleriaFoto');
    const btnGif = document.getElementById('btnGif');

    modalFoto.src = getSrc(foto);

    const temGif = foto.gif && foto.categoria === 'gols';
    btnGif.style.display = temGif ? 'block' : 'none';
    btnGif.textContent = '▶ VER O GOL';
    btnGif.classList.remove('rodando');
    btnGif.disabled = false;

    btnGif.onclick = () => {
        const gifRodando = btnGif.classList.contains('rodando');
        if (gifRodando) {
            modalFoto.src = getSrc(foto);
            btnGif.textContent = '▶ VER O GOL';
            btnGif.classList.remove('rodando');
        } else {
            modalFoto.classList.add('carregando');
            btnGif.textContent = '⏳ CARREGANDO...';
            btnGif.disabled = true;

            const gifTemp = new Image();
            gifTemp.src = getGif(foto);
            gifTemp.onload = () => {
                modalFoto.src = getGif(foto);
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
        img.src = getSrc(f);
        img.classList.add('thumbItem');
        if (i === 0) img.classList.add('ativo');
        img.addEventListener('click', () => {
            const idxEmFotos = fotos.findIndex(ft => ft.id === f.id);
            const contexto = idxEmFotos !== -1 ? fotos : fotosCarregadas;
            abrirModalGaleria(f.id, contexto);
        });
        thumbsGrid.appendChild(img);
    });

    // setas
    document.getElementById('btnAnterior').onclick = () =>
        abrirModalGaleria(fotos[index > 0 ? index - 1 : fotos.length - 1].id, fotos);
    document.getElementById('btnProximo').onclick = () =>
        abrirModalGaleria(fotos[index < fotos.length - 1 ? index + 1 : 0].id, fotos);

    overlay.style.display = 'flex';
}

// fecha modal
document.getElementById('overlayModalGaleria').addEventListener('click', (e) => {
    if (e.target === document.getElementById('overlayModalGaleria')) {
        document.getElementById('overlayModalGaleria').style.display = 'none';
    }
});
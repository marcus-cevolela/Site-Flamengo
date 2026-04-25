// menumobile
function toggleMenu() {
    const menu = document.getElementById("menuMobile");
    const overlay = document.getElementById("overlay");

    menu.classList.toggle("aberto");
    overlay.classList.toggle("ativo");

    document.body.classList.toggle("menu-aberto");
}

function fecharMenu() {
    const menu = document.getElementById("menuMobile");
    const overlay = document.getElementById("overlay");

    menu.classList.remove("aberto");
    overlay.classList.remove("ativo");
    document.body.classList.remove("menu-aberto");
}

document.querySelectorAll("#menuMobile a").forEach(link => {
    link.addEventListener("click", () => {
        fecharMenu();
    });
});

// navbar animada
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const menuMobile = document.getElementById("menuMobile");

    if (!navbar) return;

    const currentScroll = window.scrollY;

    if (menuMobile && menuMobile.classList.contains("aberto")) {
        navbar.classList.remove("hidden");
        return;
    }

    if (currentScroll > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add("hidden");
    } else {
        navbar.classList.remove("hidden");
    }

    lastScroll = currentScroll;
});
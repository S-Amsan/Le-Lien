document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('menu-burger');
    const mobileMenu = document.getElementById('menu-mobile');

    burgerMenu.addEventListener('click', function () {
        // Toggle l'affichage du menu mobile
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });
});
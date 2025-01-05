document.addEventListener('DOMContentLoaded', () => {
    const boutonPrecedent = document.querySelector('.prev');
    const boutonSuivant = document.querySelector('.next');
    const cartes = document.querySelectorAll('.card');
    let indexActuel = 0;

    if (!boutonPrecedent || !boutonSuivant || cartes.length === 0) {
        console.error('Éléments manquants dans le DOM.');
        return;
    }

    function animerNombre(element) {
        const cible = parseInt(element.getAttribute('data-target'), 10);
        const unite = element.getAttribute('data-unit') || '';
        let actuel = 0;
        const increment = Math.ceil(cible / 50);
        const tempsIntervalle = 10;

        const intervalle = setInterval(() => {
            actuel += increment;
            if (actuel >= cible) {
                actuel = cible;
                clearInterval(intervalle);
            }
            element.innerHTML = `${actuel.toLocaleString()}<span class="unit">${unite}</span>`;
        }, tempsIntervalle);
    }

    function changerCarte(index) {
        cartes.forEach((carte, i) => {
            carte.style.display = i === index ? 'flex' : 'none';
        });

        const grandNombre = cartes[index].querySelector('.big-number');
        animerNombre(grandNombre);
    }

    boutonPrecedent.addEventListener('click', () => {
        indexActuel = (indexActuel - 1 + cartes.length) % cartes.length;
        changerCarte(indexActuel);
    });

    boutonSuivant.addEventListener('click', () => {
        indexActuel = (indexActuel + 1) % cartes.length;
        changerCarte(indexActuel);
    });

    changerCarte(indexActuel);
});

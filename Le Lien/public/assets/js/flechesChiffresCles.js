// Sélection des éléments nécessaires
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");

// Vérifie que tous les éléments nécessaires sont présents
if (!prevButton || !nextButton || cards.length === 0 || dots.length === 0) {
    console.error("Certains éléments nécessaires sont manquants !");
} else {
    let currentIndex = 0;

    // Fonction pour mettre à jour l'affichage des slides
    function updateSlide(index) {
        // Vérifie les limites
        if (index < 0) {
            currentIndex = cards.length - 1;
        } else if (index >= cards.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Affiche la bonne carte et met à jour les points
        cards.forEach((card, i) => {
            card.style.display = i === currentIndex ? "flex" : "none";
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    // Gestion des clics sur les flèches
    prevButton.addEventListener("click", () => {
        updateSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        updateSlide(currentIndex + 1);
    });

    // Gestion des clics sur les points
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            updateSlide(index);
        });
    });

    // Initialise l'affichage
    updateSlide(currentIndex);
}

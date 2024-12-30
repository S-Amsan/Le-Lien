const pages = document.querySelectorAll('.question-page');
let currentPage = 0;

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const retourButton = document.getElementById('retourAccueil-button');

const ageInput = document.getElementById('age');
const qualiteDeVieCheckboxes = document.querySelectorAll('.form-check-input');
const toutVaBienCheckbox = document.getElementById('tout_va_bien');

const AGE_MAX = 120; // la limite d'age maximum est de 120 ans
const AGE_MINIMUM = 18; // la limite d'age minimun est de 18 ans
ageInput.setAttribute('max', AGE_MAX);
ageInput.setAttribute('min', AGE_MINIMUM);
// Affiche une erreur si l'âge dépasse la limite
ageInput.addEventListener('input', () => {
    if (parseInt(ageInput.value) > AGE_MAX) {
        ageInput.setCustomValidity(`L'âge ne peut pas dépasser ${AGE_MAX} ans.`);
        ageInput.reportValidity();
    } else if(parseInt(ageInput.value) < AGE_MINIMUM){
        ageInput.setCustomValidity(`L'âge doit être d'au moins 18 ans`);
        ageInput.reportValidity();
    } else {
        ageInput.setCustomValidity('');
    }
});

// Vérifie si au moins une case est cochée dans la qualité de vie
function validateQualiteDeVie() {
    const isChecked = Array.from(qualiteDeVieCheckboxes).some((checkbox) => checkbox.checked);
    // Si aucune case n'est cochée alors, on met une erreur, qu'on affichera dans nextbutton click
    if (!isChecked) {
        qualiteDeVieCheckboxes[0].setCustomValidity('Veuillez cocher au moins une case.');
        return false;
    } else {
        qualiteDeVieCheckboxes[0].setCustomValidity(''); // On enlève l'erreur
    }
    return true;
}

// Car on peut soit coché "Tout va bien" ou soit le reste, mais pas les 2 en même temps, parce que sinon ça n'a pas de sens
qualiteDeVieCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        if (checkbox.id === 'tout_va_bien' && checkbox.checked) {
            // Décoche toutes les autres cases
            qualiteDeVieCheckboxes.forEach((cb) => {
                if (cb.id !== 'tout_va_bien') cb.checked = false;
            });
        } else if (checkbox.checked) {
            // Décoche "Tout va bien" si une autre case est cochée
            toutVaBienCheckbox.checked = false;
        }
        validateQualiteDeVie(); // On actualise à chaque changement (l'erreur à afficher), une case coché ou décoché
    });
});

function showPage(index) { // On affiche la page
    pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
    });
    prevButton.style.display = index === 0 ? 'none' : 'inline-block';
    nextButton.style.display = index === pages.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = index === pages.length - 1 ? 'inline-block' : 'none';
    retourButton.style.display = 'none';
}

function validatePage() {
    const currentForm = pages[currentPage].querySelectorAll('input, select, textarea');
    for (const field of currentForm) {
        if (!field.checkValidity()) {
            field.reportValidity(); // Affiche un message d'erreur pour le champ non valide
            return false;
        }
    }
    // Valide la qualité de vie si on est sur cette page
    if (pages[currentPage].id === 'pageQualitédeVie') {
        return validateQualiteDeVie();
    }
    return true;
}

prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < pages.length - 1 && validatePage()) {
        currentPage++;
        showPage(currentPage);
    }
    qualiteDeVieCheckboxes[0].reportValidity();
});

function utilisateurEstAdherent() {
    return fetch("../assets/php/infosUtilisateur.php")
        .then((response) => response.json())
        .then((data) => {
            return data.estAdherent;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}
const estAdherent = await utilisateurEstAdherent();

if (estAdherent) {
    showPage(currentPage);
} else { // Si l'utilisateur n'est pas Adherent, il n'est pas censé avoir accès à cette page
    document.getElementById('titre').innerHTML = `Hmm &#129300, cette page est réservée aux adhérents.<br> Comment êtes-vous arrivé là ?`;
    document.getElementById('titre').style.textAlign = 'center';
    document.getElementById('titre').style.fontSize = '35px';
    retourButton.style.display = 'inline-block';
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
}

// Indique à l'utilisateur qu'il peut perdre ces données si il quitte ou actualise la page
window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
});

const pages = document.querySelectorAll('.question-page');
let currentPage = 0;

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const retourButton = document.getElementById('retourAccueil-button');

function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
    });
    prevButton.style.display = index === 0 ? 'none' : 'inline-block';
    nextButton.style.display = index === pages.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = index === pages.length - 1 ? 'inline-block' : 'none';
    retourButton.style.display = 'none';
}


prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
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

if(estAdherent){
    showPage(currentPage);
}else{
    document.getElementById('titre').innerHTML=`Hmm &#129300, cette page est réservée aux adhérents.<br> Comment êtes-vous arrivé là ?`;
    document.getElementById('titre').style.textAlign='center';
    document.getElementById('titre').style.fontSize='35px';
    retourButton.style.display = 'inline-block';
    prevButton.style.display =  'none';
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
}

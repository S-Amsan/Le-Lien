const pages = document.querySelectorAll('.question-page');
let currentPage = 0;

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');

function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.toggle('d-none', i !== index);
    });
    prevButton.classList.toggle('d-none', index === 0);
    nextButton.classList.toggle('d-none', index === pages.length - 1);
    submitButton.classList.toggle('d-none', index !== pages.length - 1);
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

showPage(currentPage);
const pages = document.querySelectorAll('.question-page');
let currentPage = 0;

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');

function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
    });
    prevButton.style.display = index === 0 ? 'none' : 'inline-block';
    nextButton.style.display = index === pages.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = index === pages.length - 1 ? 'inline-block' : 'none';
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
document.addEventListener('DOMContentLoaded', () => {
    const footerElement = document.querySelector('footer');
    fetch('../assets/conteneurs/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de chargement du footer : ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            footerElement.innerHTML = data;
        })
        .catch(error => console.error('Erreur de chargement :', error));
});

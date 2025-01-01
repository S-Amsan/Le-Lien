const boutonMensuel = document.getElementById('button-mensuel')
const boutonAnnuel = document.getElementById('button-annuel')
const buttonsDon = document.querySelectorAll('#container-buttonDon button');
const inputMontant = document.getElementById('input-montant');

boutonMensuel.addEventListener("click", ()=>{
    boutonMensuel.classList.add('active');
    boutonAnnuel.classList.remove('active');
})

boutonAnnuel.addEventListener("click", () =>{
    boutonAnnuel.classList.add('active');
    boutonMensuel.classList.remove('active')
})


// Ajoute un écouteur d'événement à chaque bouton
buttonsDon.forEach(button => {
    button.addEventListener('click', () => {
        // Supprime la classe "active" de tous les boutons
        buttonsDon.forEach(btn => btn.classList.remove('active'));
        inputMontant.value = '';

        // Ajoute la classe "active" au bouton cliqué
        button.classList.add('active');
    });
});

inputMontant.addEventListener('input', ()=>{
    inputMontant.value = inputMontant.value.replace(/[^0-9]/g, '');

    if (inputMontant.value.startsWith('0')){
        inputMontant.value = inputMontant.value.slice(1);
    }

    buttonsDon.forEach(button => {
        button.classList.remove('active')
    })

})
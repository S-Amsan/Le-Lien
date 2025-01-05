const inputMontant = document.getElementById('input-montant');
const buttons = document.querySelectorAll('.buttons-Don');


buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        const value = button.getAttribute('data-value');
        inputMontant.value = value;

        button.classList.add('active');
    });
});

inputMontant.addEventListener('input', ()=>{
    inputMontant.value = inputMontant.value.replace(/[^0-9]/g, '');

    if (inputMontant.value.startsWith('0')){
        inputMontant.value = inputMontant.value.slice(1);
    }

    buttons.forEach(button => {
        button.classList.remove('active')

        if(button.getAttribute('data-value') === inputMontant.value )
        button.classList.add('active');
    })

})
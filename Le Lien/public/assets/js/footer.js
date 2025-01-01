const srcImg = "../assets/images/footer";

document.addEventListener('DOMContentLoaded', () => {

    // On ajoute le contenu HTML dans la balise <footer>
    document.querySelector('footer').innerHTML = `
        <div class="footerHaut">
            <div class="leLien">
                <img src="${srcImg}/logoFooter.png"/>
                <p>LE LIEN</p>
            </div>
            <div class="contenuHautFooter">
                <div class="blockFooter">
                    <h3 id="localisationTitre">LOCALISATION</h3>
                    <p> <a> 13, rue Le Corbusier - 92100 </a></p>
                    <p> <a> Boulogne Billancourt </a></p>
                </div>
                <div class="blockFooter">
                    <h3 id="contactTitre">NOUS CONTACTER</h3>
                    <p><a><img src="${srcImg}/tel.png"/> 06 22 60 22 28</a></p>
                    <p><a><img src="${srcImg}/mail.png"/> reseausante@hotmail.fr</a></p>
                </div>
                <div class="blockFooter">
                    <h3 id="liensTitre">LES LIENS DU LIEN</h3>
                    <ul class="LesLiens">
                        <li><a href="https://www.heral-pub.fr" target="_blank">Héral Publicité</a></li>
                        <li><a href="http://www.paris-bristol.com" target="_blank">Paris-Bristol</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footerBas">
            <div class="contenuBasFooter">
                <div class="mentionEtCondidentialite">
                    <p id="mentionLegale"><a href="https://lelien-association.fr/asso/?mentions-legales" target="_blank">Mentions légales</a></p>
                    <p id="politiqueConfidentialite"><a href="#" target="_blank">Politique de confidentialité</a></p>
                </div>
                <div class="copyright">
                    <p>© Années 1999-2024 - Association “le Lien” spécialisée dans la traite des erreurs médicales</p>
                </div>
            </div>
            <div class="cookie">
                <img src="${srcImg}/cookie.png" alt="Cookie footer">
            </div>
        </div>
    `;
});

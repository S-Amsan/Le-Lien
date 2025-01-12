import {utilisateurEstAdmin} from "./infoUser.js";

const estAdmin = await utilisateurEstAdmin();
const contenuMain = document.querySelector("main");
if(!estAdmin) {
    contenuMain.innerHTML=`
                <div class="contenuBloquer">
                    <h1>Euh...&#128560; vous n'êtes pas censé être ici ! Cette page est réservée aux admins.</h1>
                    <button type="button" id="retourAccueil-button" class="button" onclick="window.location.href='accueil.html';">Retourner à l'accueil</button>
                </div>`;

    contenuMain.style.display = "block";

}else {
    contenuMain.style.display = "block";
}

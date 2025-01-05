import {utilisateurEstAdherent, utilisateurEstConnecte} from "./infoUser.js";

const buttonAdherer = document.getElementById("button-adherer");
const containerDeveniradherent = document.getElementById("container-adherer");

if(await utilisateurEstAdherent()) {
    containerDeveniradherent.style.display = "none";
}

buttonAdherer.addEventListener("click", async ()=>{
    if(await utilisateurEstConnecte())
        if(await utilisateurEstAdherent()){
            window.location.href = "../../pages/profil.html";
        }
        else
            window.location.href = "../../pages/adherer.html";
    else {
        window.location.href = "../../pages/authentification.html"
    }
})
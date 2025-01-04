import {utilisateurEstAdherent, utilisateurEstConnecte} from "./infoUser.js";

const buttonAdherer = document.getElementById("bouton-rejoindre");

buttonAdherer.addEventListener("click", async ()=>{
    if(await utilisateurEstConnecte())
        if(await utilisateurEstAdherent())
            window.location.href = "../../pages/profil.html"
        else
            window.location.href = "../../pages/adherer.html"
    else {
        window.location.href = "../../pages/authentification.html"
    }
})
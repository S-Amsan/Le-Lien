import {utilisateurEstAdherent, utilisateurEstAdmin, getNom, getPrenom} from "./infoUser.js";

const rangUser = document.getElementById("rang-user")
const logoRang = document.getElementById("rang-logo")
const userName = document.getElementById("username-profil")


userName.textContent = await getNom() + " " + await getPrenom();

if(await utilisateurEstAdmin()){
    logoRang.src = "../assets/images/profil/logoRang/couronne.png";
    rangUser.textContent = "Admin";
    rangUser.classList.add("admin");
}
else if(await utilisateurEstAdherent()){
    logoRang.src = "../assets/images/profil/logoRang/adherent-logo.png";
    rangUser.textContent = "Adhérent";
    rangUser.classList.add("adherent");
}
else{
    logoRang.src = "../assets/images/profil/logoRang/utilisateur-logo.png";
    rangUser.textContent = "Utilisateur";
    rangUser.classList.add("utilisateur");
}

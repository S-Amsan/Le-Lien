export function utilisateurEstConnecte() {
    return fetch("../assets/php/infosUtilisateur.php")
        .then((response) => response.json())
        .then((data) => {
            return data.estConnecte;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}

export function utilisateurEstAdmin() {
    return fetch("../assets/php/infosUtilisateur.php")
        .then((response) => response.json())
        .then((data) => {
            return data.estAdmin;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}

export function utilisateurEstAdherent() {
    return fetch("../assets/php/infosUtilisateur.php")
        .then((response) => response.json())
        .then((data) => {
            return data.estAdherent;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}

export function utilisateurASoumisEnquete() {
    return fetch("../assets/php/infosUtilisateur.php")
        .then((response) => response.json())
        .then((data) => {
            return data.aSoumisEnquete;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}
<?php

namespace LeLien\Management;

use PDO;

class MariaDBUserRepository implements IUserRepository
{
    private \PDO $dbConnexion;

    public function __construct(\PDO $dbConnexion)
    {
        $this->dbConnexion = $dbConnexion;
    }

    /**
     * Enregistre un utilisateur (email/password) dans la base MariaDB.
     * Le mot de passe est sécurisé avec password_hash().
     * @param User $user
     * @return bool
     */
    public function saveUser(User $user): bool
    {
        $sql = "INSERT INTO users (prenom, nom, email, mdp, estAdmin) 
            VALUES (:prenom, :nom, :email, :mdp, :estAdmin)";
        $stmt = $this->dbConnexion->prepare($sql);

        // Récupérer les valeurs
        $prenom = $user->getPrenom();
        $nom = $user->getNom();
        $email = $user->getEmail();
        $estAdmin = $user->estAdmin();
        $mdpHash = password_hash($user->getMotDePasse(), PASSWORD_BCRYPT);

        // Liaison des paramètres
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':mdp', $mdpHash);
        $stmt->bindParam(':estAdmin', $estAdmin, PDO::PARAM_BOOL);
        // Exécution et retour du statut
        return $stmt->execute();
    }


    /**
     * Recherche un utilisateur par email.
     * Retourne l'utilisateur si trouvé, sinon null.
     * @param string $email
     * @return User|null
     */
    public function findUserByEmail(string $email): ?User
    {
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $this->dbConnexion->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch();
        if (!$user) {
            return null;
        }
        // Crée un objet User avec le mot de passe hashé récupéré
        return new User($user['prenom'], $user['nom'], $user['email'], $user['mdp'],$user['estAdmin']);
    }

    public function UserIsAdherent(string $email): bool
    {
        return true;
    }
}

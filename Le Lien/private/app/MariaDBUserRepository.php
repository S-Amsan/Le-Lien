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
        $sql = "INSERT INTO users (prenom, nom, email, mdp, estAdherant, estAdmin) 
            VALUES (:prenom, :nom, :email, :password, :estAdherant, :estAdmin)";
        $stmt = $this->dbConnexion->prepare($sql);

        // Récupérer les valeurs
        $prenom = $user->getPrenom();
        $nom = $user->getNom();
        $email = $user->getEmail();
        $passwordHash = password_hash($user->getMotDePasse(), PASSWORD_BCRYPT);
        $estAdherant = false;
        $estAdmin = false;

        // Liaison des paramètres
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $passwordHash);
        $stmt->bindParam(':estAdherant', $estAdherant, PDO::PARAM_BOOL);
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
        return new User($user['prenom'],$user['nom'],$user['email'], $user['mdp']);
    }
}

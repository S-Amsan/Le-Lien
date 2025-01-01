<?php

namespace LeLien\Management\user;

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
        $sql = "INSERT INTO user (prenom, nom, email, mdp, estAdmin) 
            VALUES (:prenom, :nom, :email, :mdp, :estAdmin)";
        $stmt = $this->dbConnexion->prepare($sql);
        return $stmt->execute([
            "prenom" => $user->getPrenom(),
            "nom" => $user->getNom(),
            "email" => $user->getEmail(),
            "mdp" => password_hash($user->getMotDePasse(), PASSWORD_BCRYPT),
            "estAdmin" => (int) $user->estAdmin()
        ]);
    }
    /**
     * Recherche umon utilisateur par email.
     * Retourne l'utilisateur si trouvé, sinon null.
     * @param string $email
     * @return User|null
     */
    public function findUserByEmail(string $email): ?User
    {
        $sql = "SELECT * FROM user WHERE email = :email";
        $stmt = $this->dbConnexion->prepare($sql);
        $stmt->execute(["email" => $email]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            return new User(
                $user['prenom'],
                $user['nom'],
                $user['email'],
                $user['mdp'],
                (bool) $user['estAdmin']
            );
        }
        return null;
    }

    public function userIsAdherent(string $email): bool
    {
        return true; // à compléter avec la table cotisation
    }

    public function getUserId(string $email)
    {
        $sql = "SELECT idUser FROM User WHERE email = :email";
        $stmt = $this->dbConnexion->prepare($sql);
        $stmt->execute(["email" => $email]);
        $id = $stmt->fetch(PDO::FETCH_ASSOC);
        return (int) $id['idUser'];
    }

    public function saveUserCotisation(Cotisation $cotisation): bool
    {
        // TODO: Implement saveUserCotisation() method.
        return false;
    }

    public function findUserCotisationById(int $id): ?Cotisation
    {
        // TODO: Implement findUserCotisationByEmail() method.
        return null;
    }

    public function findUserFormById(int $id): bool
    {
        $sql = "SELECT * FROM formulaire WHERE idUser = :id";
        $stmt = $this->dbConnexion->prepare($sql);
        $stmt->execute(["id" => $id]);
        return (bool) $stmt->fetch(PDO::FETCH_ASSOC); // Renvoie false si pas d'id trouvé
    }
}

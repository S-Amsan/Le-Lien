<?php

namespace LeLien\Management\user;

use LeLien\Management\MariaDBRepository;

class MariaDBUserRepository extends MariaDBRepository implements IUserRepository
{
    public function __construct(\PDO $dbConnexion)
    {
        parent::__construct($dbConnexion);
    }

    /**
     * Enregistre un utilisateur (email/password) dans la base MariaDB.
     * Le mot de passe est sécurisé avec password_hash().
     * @param User $user
     * @return bool
     */
    public function saveUser(User $user): bool
    {
        $sql = "INSERT INTO user (prenom, nom, email, mdp) 
            VALUES (:prenom, :nom, :email, :mdp)";
        $stmt = $this->getDbConnexion()->prepare($sql);
        return $stmt->execute([
            "prenom" => $user->getPrenom(),
            "nom" => $user->getNom(),
            "email" => $user->getEmail(),
            "mdp" => password_hash($user->getMotDePasse(), PASSWORD_BCRYPT)
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
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute(["email" => $email]);

        $user = $stmt->fetch(\PDO::FETCH_ASSOC);
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

    public function userIsAdherent(string $id): bool
    {
        $sql = "SELECT * FROM Cotisation WHERE idUser = :id AND fin IS NULL";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute(["id" => $id]);
        return (bool) $stmt->fetch(\PDO::FETCH_ASSOC); // Renvoie false si pas d'id trouvé
    }

    public function getUserId(string $email): int
    {
        $sql = "SELECT idUser FROM User WHERE email = :email";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute(["email" => $email]);
        $id = $stmt->fetch(\PDO::FETCH_ASSOC);
        return (int) $id['idUser'];
    }

    public function saveUserCotisation(Cotisation $cotisation): bool
    {
        $sql = "CALL AjouterCotisation(:idUser, :type, :montant);";
        $stmt = $this->getDbConnexion()->prepare($sql);
        return $stmt->execute([
            "idUser" => $cotisation->getIdUser(),
            "type" => $cotisation->getType(),
            "montant" => $cotisation->getMontant()
        ]);
    }

    public function findUserFormById(int $id): bool
    {
        $sql = "SELECT * FROM formulaire WHERE idUser = :id";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute(["id" => $id]);
        return (bool) $stmt->fetch(\PDO::FETCH_ASSOC); // Renvoie false si pas d'id trouvé
    }

    public function deleteUserCotisation(int $idUser) : bool
    {
        $sql = "CALL supprimerCotisation(:idUser);";
        $stmt = $this->getDbConnexion()->prepare($sql);
        return $stmt->execute([
            "idUser" => $idUser
        ]);
    }
}

<?php

namespace LeLien\Management\user;

use LeLien\Management\BddConnect;

class User
{
    private string $prenom;
    private string $nom;
    private string $email;
    private string $motDePasse;
    private bool $estAdmin;

    /**
     * @param string $prenom
     * @param string $nom
     * @param string $email
     * @param string $motDePasse
     * @param bool $estAdmin
     */
    public function __construct(string $prenom, string $nom, string $email, string $motDePasse, bool $estAdmin = false)
    {
        $this->prenom = $prenom;
        $this->nom = $nom;
        $this->email = $email;
        $this->motDePasse = $motDePasse;
        $this->estAdmin = $estAdmin;
    }

    public function getPrenom(): string
    {
        return $this->prenom;
    }

    public function getNom(): string
    {
        return $this->nom;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getMotDePasse(): string
    {
        return $this->motDePasse;
    }

    public function estAdherent(int $id): bool
    {
        $bdd = new BddConnect();
        $pdo = $bdd->connexion();
        $trousseau = new MariaDBUserRepository($pdo);
        return $trousseau->userIsAdherent($id);
    }

    public function estAdmin(): bool
    {
        return $this->estAdmin;
    }

    public function aSoumisEnquete(int $id): bool
    {
        $bdd = new BddConnect();
        $pdo = $bdd->connexion();
        $trousseau = new MariaDBUserRepository($pdo);
        return $trousseau->didUserRespondToTheForm($id);
    }

    public function getCotisationInfo(int $id): array
    {
        $bdd = new BddConnect();
        $pdo = $bdd->connexion();
        $trousseau = new MariaDBUserRepository($pdo);
        $cotisation = $trousseau->getUserCotisation($id);
        if($cotisation){
            return ["type" => $cotisation->getType(),
                "montant" => $cotisation->getMontant()];
        }
        return [];
    }


    public function getId(): ?int
    {
        $bdd = new BddConnect();
        $pdo = $bdd->connexion();
        $trousseau = new MariaDBUserRepository($pdo);
        return $trousseau->getUserId($this->email);
    }
}
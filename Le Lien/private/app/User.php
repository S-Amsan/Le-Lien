<?php

namespace LeLien\Management;

class User
{
    private string $prenom;
    private string $nom;
    private string $email;
    private string $motDePasse;
    private bool $estAdherent;
    private bool $estAdmin;

    /**
     * @param string $prenom
     * @param string $nom
     * @param string $email
     * @param string $motDePasse
     * @param bool $estAdherent
     * @param bool $estAdmin
     */
    public function __construct(string $prenom, string $nom, string $email, string $motDePasse, bool $estAdherent, bool $estAdmin)
    {
        $this->prenom = $prenom;
        $this->nom = $nom;
        $this->email = $email;
        $this->motDePasse = $motDePasse;
        $this->estAdherent = $estAdherent;
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

    public function estAdherent(): bool
    {
        return $this->estAdherent;
    }

    public function estAdmin(): bool
    {
        return $this->estAdmin;
    }



}
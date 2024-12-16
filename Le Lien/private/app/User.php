<?php

namespace LeLien\Management;

class User
{
    private string $prenom;
    private string $nom;
    private string $email;
    private string $motDePasse;

    /**
     * @param string $prenom
     * @param string $nom
     * @param string $email
     * @param string $motDePasse
     */
    public function __construct(string $prenom, string $nom, string $email, string $motDePasse)
    {
        $this->prenom = $prenom;
        $this->nom = $nom;
        $this->email = $email;
        $this->motDePasse = $motDePasse;
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


}
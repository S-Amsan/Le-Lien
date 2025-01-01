<?php

namespace LeLien\Management\form;

class Form
{
    private int $idUser;
    private string $region;
    private int $age;
    private string $lieuDeVie;
    private bool $lieuDeVieVoulue;
    private array $qualiteDeVie;
    private string $commentaire;

    /**
     * @param int $idUser
     * @param string $region
     * @param int $age
     * @param string $lieuDeVie
     * @param bool $lieuDeVieVoulue
     * @param array $qualiteDeVie
     * @param string $commentaire
     */
    public function __construct(int $idUser, string $region, int $age, string $lieuDeVie, bool $lieuDeVieVoulue, array $qualiteDeVie, string $commentaire)
    {
        $this->idUser = $idUser;
        $this->region = $region;
        $this->age = $age;
        $this->lieuDeVie = $lieuDeVie;
        $this->lieuDeVieVoulue = $lieuDeVieVoulue;
        $this->qualiteDeVie = $qualiteDeVie;
        $this->commentaire = $commentaire;
    }

    public function getIdUser(): int
    {
        return $this->idUser;
    }

    public function getRegion(): string
    {
        return $this->region;
    }

    public function getAge(): int
    {
        return $this->age;
    }

    public function getLieuDeVie(): string
    {
        return $this->lieuDeVie;
    }

    public function isLieuDeVieVoulue(): bool
    {
        return $this->lieuDeVieVoulue;
    }

    public function getQualiteDeVie(): array
    {
        return $this->qualiteDeVie;
    }

    public function getCommentaire(): string
    {
        return $this->commentaire;
    }

}
<?php

namespace LeLien\Management\user;

class Cotisation
{
    private int $idUser;
    private string $type; // Type de paiement "annuelle ou mensuelle"
    private float $montant;

    public function __construct(int $idUser, string $type, int $montant)
    {
        $this->idUser = $idUser;
        $this->type = $type;
        $this->montant = $montant;
    }

    public function getIdUser(): int
    {
        return $this->idUser;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getMontant(): int
    {
        return $this->montant;
    }
}
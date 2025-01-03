<?php

namespace LeLien\Management\user;


use LeLien\Management\Exceptions\EnregistrementExeption;

class GestionCotisation
{
    private IUserRepository $userRepository;

    public function __construct(IUserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Enregistre un utilisateur.
     * @throws EnregistrementExeption
     */
    public function enregistrer(int $idUser, string $type, float $montant) : bool{
        if ($type !== "annuelle" && $type !== "mensuelle") {
            throw new EnregistrementExeption('Le type de montant est incorrect :' . $type, "warning");
        }
        $cotisation = new Cotisation($idUser, $type, $montant);
        return $this->userRepository->saveUserCotisation($cotisation);
    }

    public function annulerCotisation(int $idUser) : bool{
        return $this->userRepository->deleteUserCotisation($idUser);
    }
}
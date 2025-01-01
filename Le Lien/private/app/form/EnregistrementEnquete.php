<?php

namespace LeLien\Management\form;

class EnregistrementEnquete
{
    private IFormRepository $formRepository;

    public function __construct(IFormRepository $formRepository)
    {
        $this->formRepository = $formRepository;
    }

    public function enregistrer(int $idUsers, string $region, int $age, string $lieuDeVie, bool $lieuDeVieVoulue, array $qualiteDeVie, string $commentaire) : bool{
        // Pas d'exceptions
        $form = new Form($idUsers,$region,$age,$lieuDeVie,$lieuDeVieVoulue,$qualiteDeVie,$commentaire);
        return $this->formRepository->saveForm($form);
    }

}
<?php

namespace LeLien\Management\form;

interface IFormRepository
{
    public function saveForm(Form $form) : bool;

    public function findFormByUserEmail(string $email): ?Form; // à enlever si pas utile

    public static function getStatProportionParAge(): array; // pour l'instant vide, un exemple de méthode pour la page stat
}
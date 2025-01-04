<?php

namespace LeLien\Management\form;

interface IFormRepository
{
    public function saveForm(Form $form): bool;

    // Statistiques :
    public function getTauxReponseData(): float;
    public function getNombreReponseData(): int;
    public function getNombreAdherentsData(): int;
    public function getNombreAdherentsDataByRegion(string $region): int;
    public function getQualitesVieData(): array;
    public function getAgesData(): array;
    public function getLieuxVieData(): array;
    public function getLieuxVieVoulusData(): array;

}
<?php

namespace LeLien\Management\form;

interface IFormRepository
{
    public function saveForm(Form $form): bool;

    // Statistiques :
    public static function getTauxReponseData(): float;
    public static function getNombreReponseData(): int;
    public static function getNombreAdherentsData(): int;
    public static function getNombreAdherentsDataByRegion(string $region): int;
    public static function getQualitesVieData(): array;
    public static function getAgesData(): array;
    public static function getLieuxVieData(): array;
    public static function getLieuxVieVoulusData(): array;

}
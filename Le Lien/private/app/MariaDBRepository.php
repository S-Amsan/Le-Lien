<?php

namespace LeLien\Management;

class MariaDBRepository
{
    private \PDO $dbConnexion;

    public function __construct(\PDO $dbConnexion)
    {
        $this->dbConnexion = $dbConnexion;
    }

    public function getDbConnexion(): \PDO
    {
        return $this->dbConnexion;
    }
}
<?php

namespace LeLien\Management\Exceptions;

class EnregistrementExeption extends \Exception
{
    protected ?string $type = null;

    /**
     * @param string $message
     * @param string $type
     */
    public function __construct(string $message, string $type){
        parent::__construct($message);
        $this->type = $type;
    }

    public function getType(): ?string
    {
        return $this->type;
    }
}
<?php

namespace LeLien\Management\Exceptions;

use Throwable;

class AuthentificationException extends \Exception
{
    protected $message = null;
    protected ?string $type = null;

    /**
     * @param string $message
     * @param string $type
     */
    public function __construct(string $message, string $type){
        $this->message = $message;
        $this->type = $type;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

}
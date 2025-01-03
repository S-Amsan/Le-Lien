<?php

namespace LeLien\Management\form;

interface IFormRepository
{
    public function saveForm(Form $form): bool;

}
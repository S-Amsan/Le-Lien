<?php
$trousseau = __DIR__
    . DIRECTORY_SEPARATOR
    . 'data'
    . DIRECTORY_SEPARATOR . 'dataForm.ndjson';

function createTrousseau($trousseau): void
{
    $directory = dirname($trousseau);
    if (!is_dir($directory)) {
        mkdir($directory, 0777, true);
    }
    if (!file_exists($trousseau)) {
        touch($trousseau);
    }
}
function debugForm($variable, $type = "post") : void {

    $output = print_r($variable, true);
    $output = preg_replace('/^Array\n\(\n|\n\)$/', '', $output);

    $message = "Vous avez envoyé un formulaire de type : ";
    $spe = "<span class='text-danger'>$type </span>";

    echo "<h1>$message $spe</h1>";
    echo "<p class='lead'>Contenu du formulaire : </p>";
    echo "<pre class='text-white bg-warning rounded'>" . $output . "</pre>";
}
function addData(string $trousseau, array $data) : void{
    file_put_contents($trousseau, json_encode([$data], JSON_PRETTY_PRINT), FILE_APPEND);
}




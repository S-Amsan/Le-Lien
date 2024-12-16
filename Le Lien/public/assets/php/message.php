<?php

use LeLien\Management\Messages;

if (!session_id()) {
    session_start();
}

require_once '../../../private/app/Messages.php';

Messages::messageFlash();
?>

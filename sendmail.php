<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpMailer/src/Exception.php';
require 'phpMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpMailer/language/');
$mail->isHTML(true);

// от кого письмо
$mail->setFrom('mihgfgbj@gmail.com', 'Homsek - парфюмерия');
// кому отправить
$mail->addAddress('homsekusamogus@gmail.com');
// Тема письма
$mail->Subject = 'Консультация по парфюмерии';

// Тело письма
if (trim(!empty($_POST['name']))) {
   $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
   $body .= '<p><strong>Почта:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['phone']))) {
   $body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
   $message = 'ошибка';
} else {
   $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
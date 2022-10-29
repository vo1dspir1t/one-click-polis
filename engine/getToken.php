<?php
session_start();
require './config.php';
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://widget.agentapp.ru/v1/users/obtain-token',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => '{
              "username": "'.$username.'",
              "password": "'.$password.'"
            }',
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
    ),
));
$response = curl_exec($curl);
curl_close($curl);
//Раскомментировать строку ниже, чтобы увидеть сгенерированный токен
//echo json_decode($response)->token;
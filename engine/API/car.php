<?php
session_start();

require '../config.php';

$carObject = json_encode($_POST['carObject']);

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://widget.agentapp.ru/v2/insured_objects/cars',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => $carObject,
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Accept: application/json, text/plain, */*',
        'Authorization: Token '.$token
    ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
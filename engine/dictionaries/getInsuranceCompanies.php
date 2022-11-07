<?php
require '../config.php';

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://widget.agentapp.ru/v1/companies/',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => array(
        'Authorization: Token '.$token,
        'Content-Type: application/json',
        'Accept: application/json, text/plain, */*'
    ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
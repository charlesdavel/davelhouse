<?php

$curl = curl_init();

$message = $_GET['message'];

curl_setopt_array($curl, [
    CURLOPT_URL => "https://chatgpt-ai-chat-bot.p.rapidapi.com/ask",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "{
        \"query\" : \"$message\",
        \"wordLimit\":\"70\"
    }",
    CURLOPT_HTTPHEADER => [
        "X-RapidAPI-Host: chatgpt-ai-chat-bot.p.rapidapi.com",
        "X-RapidAPI-Key: 15648960ddmshfac486351ac7e1ep163b84jsn662c44e516c9",
        "content-type: application/json"
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    //echo $response;
    $obj = json_decode($response);
    print_r($obj->response);
}
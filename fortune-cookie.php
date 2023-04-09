<?php

$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://horoscope-astrology.p.rapidapi.com/dailyphrase",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"X-RapidAPI-Host: horoscope-astrology.p.rapidapi.com",
		"X-RapidAPI-Key: a27bf92948mshf6a88285aa333eap1c7634jsn6b5757954b29"
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
	print_r($obj->daily);
}
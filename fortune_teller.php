<?php
$url = 'https://davelhouse.com/api/json/tarot-images.json';
$content = file_get_contents($url);
$json = json_decode($content, true);
$items = array();
foreach($json['cards'] as $item) {
    //var_dump($item['fortune_telling']);
    for ($var = 0; $var < sizeof($item['fortune_telling']); $var++) {
    	$items[] = $item['fortune_telling'][$var];
    }
}
shuffle($items);
print_r($items[0]);
?>
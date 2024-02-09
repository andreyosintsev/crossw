<?php

require('connect.php');

$sql = $DBH->prepare('SELECT id FROM tasks ORDER BY id DESC LIMIT 10');
$sql->execute();

$result = [];

while ($row = $sql->fetch(PDO::FETCH_LAZY)) {
  array_push($result, $row['id']);
}

$json = json_encode($result);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo $json;

require('disconnect.php');

exit();
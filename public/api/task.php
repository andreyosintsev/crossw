<?php

$task = $_GET['task'];
if ($task) {

  require('connect.php');

  $sql = $DBH->prepare('SELECT task FROM tasks where id = :task');
  $sql->execute(['task' => $task]);
  $row = $sql->fetch(PDO::FETCH_LAZY);

  $json = $row['task'];

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  echo $json;

  require('disconnect.php');

}

exit();
<?php
require_once('init.php');

$sql = "select * from categ";

$result = mysqli_query($db_handler,$sql) or die("Невозможго выполнить запрос в categ-load.php".mysqli_error($db_handler));
$rows = array();
while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) $rows[] = $row;
echo json_encode($rows);

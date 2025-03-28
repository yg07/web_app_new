<?php
require_once('init.php');

if(isset($_REQUEST['predpr_id'])) {$predpr_id = $_REQUEST['predpr_id'];} else {$predpr_id=null;}

$sql = "select * from `order` where predpr_id = $predpr_id";

$result = mysqli_query($db_handler,$sql) or die("Невозможго выполнить запрос в predpr-load.php".mysqli_error($db_handler));
$rows = array();
while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) $rows[] = $row;
echo json_encode($rows);
<?php
require_once('init.php');

if(isset($_REQUEST['categ_id'])) {$categ_id = $_REQUEST['categ_id'];} else {$categ_id=null;}

$sql = "select * from prod where categ_id = $categ_id";

$result = mysqli_query($db_handler,$sql) or die("Невозможго выполнить запрос в prod-load.php".mysqli_error($db_handler));
$rows = array();
while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) $rows[] = $row;
echo json_encode($rows);
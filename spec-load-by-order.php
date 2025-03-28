<?php
require_once('init.php');

if(isset($_REQUEST['order_id'])) {$order_id = $_REQUEST['order_id'];} else {$order_id=null;}

$sql = "SELECT s.id, p.name as prod, c.name as categ, p.price, s.kol
        FROM spec s
        left join prod p on s.prod_id = p.id
        left join categ c on p.categ_id = c.id
        where order_id = $order_id";

$result = mysqli_query($db_handler,$sql) or die("Невозможго выполнить запрос в spec-load-by-order.php".mysqli_error($db_handler));
$rows = array();
while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) $rows[] = $row;
echo json_encode($rows);
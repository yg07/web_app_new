<?php
require_once("init.php");

$sql = "select p.id, p.name, p.price, c.name as categ
        from prod p
        left join categ c on p.categ_id = c.id";

$result = mysqli_query($db_handler,$sql) or die("Невозможно выполнить sql запрос: ".mysqli_error($db_handler));
while( $row = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
    $rows[] = $row;
}
echo json_encode($rows);
mysqli_close($db_handler);


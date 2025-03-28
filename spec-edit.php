<?php
require_once("init.php");

if(isset($_REQUEST['oper'])) {$oper = $_REQUEST['oper'];} else die('Error: Operation is not defined!!!');
if(isset($_REQUEST['id'])) {$id = $_REQUEST['id'];} else {$id=0;}
if(isset($_REQUEST['prod_id'])) {$prod_id = $_REQUEST['prod_id'];} else {$prod_id='Not Defined';}
if(isset($_REQUEST['order_id'])) {$order_id = $_REQUEST['order_id'];} else {$order_id=null;}
if(isset($_REQUEST['prod_kol'])) {$prod_kol = $_REQUEST['prod_kol'];} else {$prod_kol=0;}




switch ($oper) {
    case "add": 
        $sql = "insert into spec (order_id, prod_id, kol) 
                values ('$order_id', $prod_id, $prod_kol)";
        if(!($result = mysqli_query($db_handler,$sql))) {
            header($_SERVER['SERVER_PROTOCOL'] . '500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Error adding products: ".mysqli_error($db_handler);
        } else {
            echo (json_encode("Inserted!!!"));
        }
        break;

    
    case "edit": 
        $sql = "update spec
                set 
                order_id=$order_id,prod_id=$prod_id,kol=$prod_kol where id=$id";
        if(!mysqli_query($db_handler, $sql)) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Ошибка изменения products: ".mysqli_error($db_handler);
        } else {
            echo (json_encode("Updated Id=$id"));
        }
        break;


    case "del":
        $sql = "delete from spec where id = $id";
        if(!($result = mysqli_query($db_handler,$sql))) {
            header($_SERVER['SERVER_PROTOCOL'] . '500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Error deleting order position: ".mysqli_error($db_handler);
        } else {
            echo (json_encode("Data deleted!"));
        }
        break;
}
mysqli_close($db_handler);

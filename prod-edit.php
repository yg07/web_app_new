<?php
require_once("init.php");

if(isset($_REQUEST['oper'])) {$oper = $_REQUEST['oper'];} else die('Error: Operation is not defined!!!');
if(isset($_REQUEST['id'])) {$id = $_REQUEST['id'];} else {$id=0;}
if(isset($_REQUEST['name'])) {$name = $_REQUEST['name'];} else {$name='Not Defined';}
if(isset($_REQUEST['price'])) {$price = $_REQUEST['price'];} else {$price=0;}
if(isset($_REQUEST['categ_id'])) {$categ_id = $_REQUEST['categ_id'];} else {$categ_id=null;}




switch ($oper) {
    case "add": 
        $sql = "insert into prod (name, price, categ_id) 
                values ('$name', $price, $categ_id)";
        if(!($result = mysqli_query($db_handler,$sql))) {
            header($_SERVER['SERVER_PROTOCOL'] . '500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Error adding products: ".mysqli_error($db_handler);
        }else {
            $sql = "select id from prod where name = '$name'";
            if(!($result = mysqli_query($db_handler,$sql))) {
                header($_SERVER['SERVER_PROTOCOL'] . '500 Internal Server Error', true, 500);
                header('Content-Type: text/html; charset=utf-8');
                echo "Error adding products: ".mysqli_error($db_handler);
            }else {
                $rows = [];
                while( $row = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
                    $rows[] = $row;
                }
                echo ( json_encode($rows));
            }
        }
        break;

    
    case "edit": 
        $sql = "update prod
                set 
                name='$name',price=$price,categ_id=$categ_id where id=".$id;
        if(!mysqli_query($db_handler, $sql)) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Ошибка изменения products: ".mysqli_error($db_handler);
        } echo (json_encode("Updated Id=$id"));
        break;


    case "del":
        $sql = "delete from prod where id = $id";
        if(!($result = mysqli_query($db_handler,$sql))) {
            header($_SERVER['SERVER_PROTOCOL'] . '500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Error deleting products: ".mysqli_error($db_handler);
        } else {
            echo (json_encode("Data deleted!"));
        }
        break;
}
mysqli_close($db_handler);

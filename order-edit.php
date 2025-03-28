<?php
require_once("init.php");

if(isset($_REQUEST['oper'])) {$oper = $_REQUEST['oper'];} else die('Error: Operation is not defined!!!');
if(isset($_REQUEST['id'])) {$id = $_REQUEST['id'];} else {$id=0;}
if(isset($_REQUEST['name'])) {$name = $_REQUEST['name'];} else {$name='Not Defined';}
if(isset($_REQUEST['predpr_id'])) {$predpr_id = $_REQUEST['predpr_id'];} else {$predpr_id=0;}



switch ($oper) {
    case "add": 
        $sql = "insert into `order` (name, predpr_id) values ('$name', $predpr_id)";
        if(!($result = mysqli_query($db_handler,$sql))) {
            header($_SERVER['SERVER_PROTOCOL'] . '500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Error adding order: ".mysqli_error($db_handler);
        }else {
            $sql = "select id from `order` where name = '$name'";
            if(!($result = mysqli_query($db_handler,$sql))) {
                header($_SERVER['SERVER_PROTOCOL'] . '500 Internal Server Error', true, 500);
                header('Content-Type: text/html; charset=utf-8');
                echo "Error adding order: ".mysqli_error($db_handler);
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
        $sql = "update order
                set 
                name='$name' where id=$id";
        if(!mysqli_query($db_handler, $sql)) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Ошибка изменения order: ".mysqli_error($db_handler);
        } echo (json_encode("Updated Id=$id"));
        break;


    case "del":
        $sql = "delete from order where id = $id";
        if(!($result = mysqli_query($db_handler,$sql))) {
            header($_SERVER['SERVER_PROTOCOL'] . '500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Error deleting order: ".mysqli_error($db_handler);
        } else {
            echo (json_encode("Data deleted!"));
        }
        break;
}
mysqli_close($db_handler);

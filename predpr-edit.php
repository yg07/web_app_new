<?php
require_once("init.php");

if(isset($_REQUEST['oper'])) {$oper = $_REQUEST['oper'];} else die('Error: Operation is not defined!!!');
if(isset($_REQUEST['id'])) {$id = $_REQUEST['id'];} else {$id=0;}
if(isset($_REQUEST['name'])) {$name = $_REQUEST['name'];} else {$name='Not Defined';}
if(isset($_REQUEST['address'])) {$address = $_REQUEST['address'];} else {$address='Not Defined';}


switch ($oper) {
    case "add": 
        $sql = "insert into predpr (name, address) values ('$name', '$address')";
        if(!($result = mysqli_query($db_handler,$sql))) {
            header($_SERVER['SERVER_PROTOCOL'] . '500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Error adding products: ".mysqli_error($db_handler);
        }else {
            $sql = "select id from predpr where name = '$name'";
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
        $sql = "update predpr
                set 
                name='$name',
                address = '$address' where id=".$id;
        if(!mysqli_query($db_handler, $sql)) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            header('Content-Type: text/html; charset=utf-8');
            echo "Ошибка изменения products: ".mysqli_error($db_handler);
        } echo (json_encode("Updated Id=$id"));
        break;


    case "del":
        $sql = "delete from predpr where id = $id";
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

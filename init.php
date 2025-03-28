<?php
$hostname = '127.0.0.1';
$username = 'root';
$password = 'root';
$dbname = 'db';

$db_handler = mysqli_connect($hostname,$username,$password) or die("Error: не удается подключить в mysql серверу!");
mysqli_select_db($db_handler,$dbname) or die("Error: не удается выбрать схему ".$dbname);

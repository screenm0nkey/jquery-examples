<?php 
$id = isset($_POST['id']) ? intval($_POST['id']) : "";
$val = isset($_POST['val']) ? intval($_POST['val']) : "";
$reply = "";

switch ($id) {
    case "01":
        sleep(1);
        break;
    case "02":
        sleep(0.5);
        break;
    case "03":
        sleep(1);
        break;
    case "04":
        sleep(3);
        break;
    case "05":
        sleep(1.7);
        break;
    case "06":
        sleep(1);
        break;
    case "07":
        sleep(1);
        break;
    case "08":
        sleep(2.5);
        break;
    case "09":
        sleep(1);
        break;
    case "10":
        sleep(1.5);
        break;
	case "11":
        sleep(0.4);
        break;
    case "12":
        sleep(0.3);
        break;
    case "13":
        sleep(2.3);
        break;
    case "14":
        sleep(1);
        break;
    case "15":
        sleep(0.6);
        break;
    case "16":
       sleep(0.1);
        break;
	case "17":
        sleep(0);
        break;
}
$val= $val*$val*$val*$id;
$reply = "this is ".$id . " = ". $val;
echo $reply;
?>

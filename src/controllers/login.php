<?php
require_once 'classes.php';
use App\Models\Queries\ModelQueries;
use \App\Controllers\BaseController\BaseController as BC;


class LoginController extends ModelQueries
{
    public function checkState()
    {
        if (isset($_POST['login']) && !empty($_POST['email']) && !empty($_POST['password'])) {
            $resultLogin = $this->login($_POST['email'], $_POST['password']);
            if ($resultLogin != false) {
                $_SESSION['valid'] = true;
                $_SESSION['timeout'] = 60;
                $_SESSION['UserId'] = $resultLogin['UserId'];
                $_SESSION['FirstName'] = $resultLogin['FirstName'];
                $_SESSION['LastName'] = $resultLogin['LastName'];
                $_SESSION['Email'] = $resultLogin['Email'];
                $_SESSION['Role'] = $resultLogin['Role'];
                return $resultLogin;
            }
        } else if(isset($_POST['logout'])){
            session_unset();
            header("Location: /");
        }
        return false;
    }
}
$classTest = new LoginController();
$check = $classTest->checkState();


if ($check != false) {
    header("Location: /");
    exit();
} else {
    $Base = new BC;
    $Base->Display("login", "session", "Incorrect, try again!");
}

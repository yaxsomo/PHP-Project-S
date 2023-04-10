<?php
require_once 'classes.php';
use App\Models\Queries\ModelQueries;
use \App\Controllers\BaseController\BaseController as BC;


class RegisterController extends ModelQueries
{
    public function checkState()
    {
        if (isset($_POST['registerUser']) && !empty($_POST['rFirstName']) && !empty($_POST['rLastName'])&& !empty($_POST['rEmail'])&& !empty($_POST['rPhone'])&& !empty($_POST['rAddress'])&& !empty($_POST['rCity'])&& !empty($_POST['rCountry'])&& !empty($_POST['rPassword'])) {
            $emailCheck = $_POST['rEmail'];
            $queryPresence = $this->All('R','User',"*","Email='$emailCheck'");
            $resultCheck = $this->Execute($queryPresence);
            if (sizeof($resultCheck) == 0) {
                $userAccount = ["FirstName" => $_POST['rFirstName'],"LastName" => $_POST['rLastName'],"Email" => $_POST['rEmail'],"Phone" => $_POST['rPhone'],"Pwd" => $_POST['rPassword'],"Role" => 0];
                $queryAccount = $this->All('C', 'User', $userAccount);
                $this->Execute($queryAccount);
                $gatherId = $this->Execute("SELECT UserId from User WHERE Email='$emailCheck'");
                $userAddress = ["UserId" =>(int)$gatherId['UserId'],"UserAddress" =>$_POST['rAddress'],"City" =>$_POST['rCity'],"PostalCode" =>'69100',"Country" =>'France',"Continent" =>'France'];
                $queryAddress = $this->All('C','Address',$userAddress);
                $this->Execute($queryAddress);
                $queryCart = $this->All('C', 'Cart',['UserId' => (int)$gatherId['UserId'], 'TotalPrice' => 0.0]);
                $this->Execute($queryCart);
                return true;
            }
        } else if(isset($_POST['logout'])){
            session_unset();
            header("Location: /");
        }
        return false;
    }
}
$classTest = new RegisterController();
$check = $classTest->checkState();


if ($check != false) {
    header("Location: /");
    exit();
} else {
    $Base = new BC;
    $Base->Display("registration", "session", "0");
}

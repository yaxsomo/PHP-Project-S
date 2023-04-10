<?php
require_once 'classes.php';

use App\Models\Queries\ModelQueries;
use \App\Controllers\BaseController\BaseController as BC;

class AdminController extends ModelQueries
{

    public function index()
    {
        $Base = new BC;



        if (isset($_POST['Modify']) && !empty($_POST['target']) && !empty($_POST['newValue'])) {
            $option = $_POST['option'];
            $targetMail = $_POST['target'];
            $newValue = $_POST['newValue'];
            // var_dump($option);
            $query = $this->All("U", 'User', [$option => $newValue], "Email='$targetMail'");
            // var_dump($query);
            $this->execute($query);
            

            // header("Location: /adminPanel");
        }






        //Terminate session manually
        // $_SESSION['valid'] = false;
        $queryUsers = $this->All('R', "User", "*");
        $userList = $this->Execute($queryUsers);
        //Affiche les Admins en premier
        usort($userList, fn($a, $b) => $a['Role'] < $b['Role']);
        
        // var_dump($userList);
        $userList['session'] = $_SESSION;
        if (isset($_SESSION['valid']) && $_SESSION['Role'] == 1) {
            $Base->Display("admin", "collection",$userList);
        } else {
            header("Location: /");
        }
    }

}

$launch = new AdminController();

$launch->index();
?>

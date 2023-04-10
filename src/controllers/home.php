<?php
require_once 'classes.php';

use App\Models\Queries\ModelQueries;
use \App\Controllers\BaseController\BaseController as BC;

class HomeController extends ModelQueries
{
    public function index()
    {
        $Base = new BC;

        $query = $this->All('R', 'Product', "*");
        $dataToFeed = $this->Execute($query);

        //Terminate session manually
        // $_SESSION['valid'] = false;


        if (isset($_POST['addToCart'])){
            $productToAdd = $_POST['addToCart'];
            $currentUser = (int)$_SESSION['UserId'];
            if ($currentUser != NULL) {
            $getCartId = $this->Execute($this->All('R','Cart',"*","UserId=$currentUser"));
            $getProduct = $this->Execute($this->All('R','Product',"*","ProductId=$productToAdd"));
            $this->Execute($this->All('C', 'Command', ['ProductId' => $getProduct['ProductId'],'Price' => $getProduct['Price'],'Quantity' => 1,'Total' => $getProduct['Price'],'CartId' => $getCartId['CartId']]));
            $price = $getProduct['Price'];
            $this->Execute($this->All('U','Cart',['TotalPrice' => (int)$getCartId['TotalPrice'] + $price],"UserId=$currentUser"));
            header("Location: /");
            } else {
            header("Location: /");
            }
            unset($_POST['addToCart']);
        }
        if (isset($_SESSION['valid'])) {
            $dataToFeed['session'] = $_SESSION;
            $Base->Display("home", "userInfo", $dataToFeed);
        } else {
            $Base->Display("home", "userInfo", $dataToFeed);
        }
    }
}

$launch = new HomeController();
$launch->index();

?>

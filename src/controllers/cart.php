<?php
require_once 'classes.php';

use App\Models\Queries\ModelQueries;
use \App\Controllers\BaseController\BaseController as BC;

use function PHPSTORM_META\type;

class CartController extends ModelQueries
{
    public function index()
    {
        $Base = new BC;
        $currentUser = (int)$_SESSION['UserId'];
        $getCart = $this->Execute($this->All('R','Cart',"*","UserId=$currentUser"));
        $cartId = $getCart['CartId'];
        $getProductsAdded = $this->Execute($this->All('R','Command',"*","CartId=$cartId"));
        $productsFormatted = array();
        if (is_array($getProductsAdded[0])) {
            foreach ($getProductsAdded as $product) {
                $id = $product['ProductId'];
                array_push($productsFormatted,$this->Execute($this->All('R','Product',"*","ProductId=$id")));
            }
        } else if(sizeof($getProductsAdded) == 0) {
            
            
        } else {
            $idCase2 = $getProductsAdded['ProductId'];
            array_push($productsFormatted,$this->Execute($this->All('R','Product',"*","ProductId=$idCase2")));
        }
        // array_push($productsFormatted,$this->Execute($this->All('R','Product',"*","ProductId=$value")));
         
        $dataToFeed = $productsFormatted;
        $dataToFeed['totalCart'] = $getCart['TotalPrice'];

        //Terminate session manually
        // $_SESSION['valid'] = false;

        if (isset($_POST['removeFromCart'])){
            $productToRemove = $_POST['removeFromCart'];
            $getProduct = $this->Execute($this->All('R','Product',"*","ProductId=$productToRemove"));
            $this->Execute($this->All('D', 'Command',"ProductId=$productToRemove AND CartId=$cartId LIMIT 1"));
            $priceToRemove = $getProduct['Price'];
            $this->Execute($this->All('U','Cart',['TotalPrice' => (int)$getCart['TotalPrice'] - $priceToRemove],"UserId=$currentUser"));
            unset($_POST['removeFromCart']);
            header("Location: /cart");
            
        }


        if (isset($_SESSION['valid'])) {
            $dataToFeed['session'] = $_SESSION;
            $Base->Display("cart", "userInfo", $dataToFeed);
        } else {
            $Base->Display("cart", "userInfo", $dataToFeed);
        }
    }
}

$launch = new CartController();
$launch->index();

?>












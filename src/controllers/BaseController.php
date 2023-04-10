<?php 
namespace App\Controllers\BaseController;
use Twig\Loader\FilesystemLoader;



class BaseController{



    public function Display($twigPage, $dataName, $values)
    {
        $loader = new FilesystemLoader('src/views');
        $loader->addPath('src/views/css', 'views');
        $twig = new \Twig\Environment($loader, [
            'cache' => false, 'debug' => true
        ]);

        $template = $twig->Load($twigPage . ".twig");
        echo $twig->render($template, [
            $dataName => $values
        ]);
    }


}




?>
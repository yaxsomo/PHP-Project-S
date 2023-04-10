<?php 

use \Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader('src/views');
$twig = new \Twig\Environment($loader, [
    'cache' => false,'debug' => true, 'auto_reload' => true
]);

echo $twig->render('404.twig');


?>
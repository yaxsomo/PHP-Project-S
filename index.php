<?php 

require_once __DIR__ . '/vendor/autoload.php';
require_once './router.php';


// ##################################################
// ##################################################
// ##################################################

get('/', 'home.php');
get('localhost/home.php','home.php');
post('/', 'home.php');

get('/login', 'login.php');
post('/login','login.php');

get('/registration', 'register.php');
post('/registration', 'register.php');

get('/adminPanel','admin.php');
post('/adminPanel','admin.php');

get('/cart', 'cart.php');
post('/cart', 'cart.php');

// Dynamic GET. Example with 2 variables
// The $name will be available in full_name.php
// The $last_name will be available in full_name.php
// In the browser point to: localhost/user/X/Y
// get('/user/$name/$last_name', 'views/full_name.php');

// Dynamic GET. Example with 2 variables with static
// In the URL -> http://localhost/product/shoes/color/blue
// The $type will be available in product.php
// The $color will be available in product.php
// get('/product/$type/color/$color', 'product.php');

// A route with a callback
// get('/callback', function(){
//   echo 'Callback executed';
// });

// A route with a callback passing a variable
// To run this route, in the browser type:
// http://localhost/user/A
// get('/callback/$name', function($name){
//   echo "Callback executed. The name is $name";
// });

// A route with a callback passing 2 variables
// To run this route, in the browser type:
// http://localhost/callback/A/B
// get('/callback/$name/$last_name', function($name, $last_name){
//   echo "Callback executed. The full name is $name $last_name";
// });

// ##################################################
// ##################################################
// ##################################################
// any can be used for GETs or POSTs

// For GET or POST
// The 404.php which is inside the views folder will be called
// The 404.php has access to $_GET and $_POST

any('/404','404.php');
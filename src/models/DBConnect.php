<?php

namespace App\Models;
use PDO;


class MyConnection
{

    private string $host = 'mysql:dbname=Ecom;host=localhost:3306';
    private string $username = 'ecom';
    private string $password = 'ecom';


	/**
	 * @return string
	 */
	public function getHost(): string {
		return $this->host;
	}

	/**
	 * @return string
	 */
	public function getUsername(): string {
		return $this->username;
	}

	/**
	 * @return string
	 */
	public function getPassword(): string {
		return $this->password;
	}


    public function GetDB() : PDO
    {
        $host=$this->getHost();		                                   # host name or ip address
        $user=$this->getUsername();                                    # database user name
        $pass=$this->getPassword();                                    # database password
        $dblink = new PDO($host, $user, $pass);

        return $dblink;
    }
}

?>
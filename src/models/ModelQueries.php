<?php

namespace App\Models\Queries;

use App\Models\MyConnection;
use PDO;

class ModelQueries extends MyConnection
{


	public function getDatabase(): PDO
	{
		$DATABASE = $this->GetDB();
		return $DATABASE;
	}


	public function ParseTableCols($tableName): string
	{

		$q = $this->getDatabase()->prepare("DESCRIBE $tableName");
		$q->execute();
		$table_fields = $q->fetchAll(PDO::FETCH_COLUMN);
		array_shift($table_fields);
		return implode(", ", $table_fields);
	}


	function All($mode, $table, mixed ...$values): string
	{
		$query = "";
		$result = "";

		switch ($mode) {
			case 'C':
				$fields = "(" . $this->ParseTableCols($table) . ")";
				$valuesParsed = "('";
				foreach ($values as $data) {
					$valuesParsed .=  implode("', '", $data);
				}
				$valuesParsed .= "')";
				$result = "INSERT INTO $table $fields VALUES $valuesParsed";
				break;
			case 'D':
				$result = "DELETE FROM $table WHERE $values[0]";
				break;
			case 'U':
				$valuesParsed = "";
				$flattened = $values[0];
				array_walk($flattened, function (&$value, $key) {
					$value = "{$key}='{$value}'";
				});
				$valuesParsed .= implode(', ', $flattened);
				$result = "UPDATE $table SET $valuesParsed WHERE $values[1]";
				break;

			case 'R':

				if (isset($values[1])) {
					if ($values[0] != '*') {
						$valuesParsed = "";
						$valuesParsed .= implode(", ", $values[0]);
						$result = "SELECT $valuesParsed FROM $table WHERE $values[1]";
					} else {
						$result = "SELECT * FROM $table WHERE $values[1]";
					}
				} else {
					if ($values[0] != '*') {
						$valuesParsed = "";
						$valuesParsed .= implode(", ", $values[0]);
						$result = "SELECT $valuesParsed FROM $table";
					} else {
						$result = "SELECT * FROM $table";
					}
				}
				break;
			default:
				echo "C'est chaud patate";
				break;
		}
		return $result;
	}



	public function Execute($query)
	{
		$myData = $this->getDatabase();
		$mode = substr($query, 0, 3);

		if (strcmp($mode, "INS") == 0 or strcmp($mode, "DEL") == 0 or strcmp($mode, "UPD") == 0) {
			$myData->query($query);
			// echo "Operation completed successfully!";
		} else if ($mode == "SEL") {
			$result = $myData->query($query)->fetchAll(PDO::FETCH_ASSOC);
			if (count($result) == 1) {
				return $result[0];
			} else {
				return $result;
			}
		}
		return true;
	}



	function login($email, $password)
	{
		// Check if the email and password are valid
		if (empty($email) || empty($password)) {
			return false;
		}

		$query = "SELECT * FROM User WHERE Email = '$email' AND Pwd = '$password'";
		$result = $this->getDatabase()->query($query)->fetchAll(PDO::FETCH_ASSOC);
		if (count($result) == 1) {
			return $result[0];
		} else {
			return $result;
		}
	}


    public function Promote($userId) {
		$queryPromote = $this->All('U',"User",['Role' => 1],"UserId=$userId");
		$this->Execute($queryPromote);
	}










}
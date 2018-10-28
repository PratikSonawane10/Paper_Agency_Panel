<?php
require_once 'BaseDAO.php';

class AreaDetailsDAO
{

    private $con;
    private $msg;
    private $data;

    // Attempts to initialize the database connection using the supplied info.
    public function AreaDetailsDAO()
    {
        $baseDAO = new BaseDAO();
        $this->con = $baseDAO->getConnection();
    }

   public function AddingArea($areasDetail)
    {

        try {
            $sql = "SELECT * FROM  areadetails WHERE areaName='" .$areasDetail->getareaName(). "'";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count == 1) {
                $this->data = "Already_Added";
            } else {
                $sql = "INSERT INTO areaDetails(areaName,entryDate)
                        VALUES ('" . $areasDetail->getareaName() . "','" .$areasDetail->getentryDate() ."')";

                $isInserted = mysqli_query($this->con, $sql);

                if ($isInserted) {
                    $this->data = "AREA_DETAILS_SAVED";
                } else {
                    $this->data = "ERROR";
                }
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
    public function UpdatingArea($areaDetails)
    {
        try {

            $sql = "UPDATE areaDetails
                        SET 
                        areaName = '".$areaDetails->getareaName()."'
						WHERE areaId = '".$areaDetails->getareaId()."' ";

            $isUpdated = mysqli_query($this->con, $sql);
            if ($isUpdated) {
                $this->data = "AREA_DETAILS_SAVED";

            } else {
                $this->data = "ERROR";
            }

        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;

    }
	
	
	public function DeletingArea($areaDetails) {
		 try {            
			$sql = "DELETE FROM areaDetails WHERE areaId='".$areaDetails->getareaId()."'";
			$isDeleted = mysqli_query($this->con, $sql);
            if ($isDeleted) {
                $this->data = "Area_Deleted";                
            } else {
                $this->data = "ERROR";
            }
		} catch(Exception $e) {
            echo 'SQL Exception: ' .$e->getMessage();
        }
        return $this->data;
	}

	public function ShowAreaList($areaDetails)
    {
        try {
            $sql = "SELECT * FROM areaDetails";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count >= 1) {
                $this->data = array();
                while ($rowdata = mysqli_fetch_assoc($isValidating)) {
                    $this->data[] = $rowdata;
                }
            } else {
                $this->data = "Area list is not available";
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
}

?>
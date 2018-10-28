<?php
require_once 'BaseDAO.php';

class PaperDetailsDAO
{

    private $con;
    private $msg;
    private $data;

    // Attempts to initialize the database connection using the supplied info.
    public function PaperDetailsDAO()
    {
        $baseDAO = new BaseDAO();
        $this->con = $baseDAO->getConnection();
    }

    public function Addingpaper($papersDetail)
    {

        try {
            $sql = "SELECT * FROM  paperdetails WHERE paperName='" .$papersDetail->getpaperName(). "'";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count == 1) {
                $this->data = "Already_Added";
            } else {
                $sql = "INSERT INTO paperDetails(paperName,paperPrice,entryDate)
                        VALUES ('" . $papersDetail->getpaperName() . "','" . $papersDetail->getpaperPrice() . "','" . $papersDetail->getentryDate() . "')";

                $isInserted = mysqli_query($this->con, $sql);

                if ($isInserted) {
                    $this->data = "PAPER_DETAILS_SAVED";
                } else {
                    $this->data = "ERROR";
                }
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
    public function UpdatingPaper($paperDetails)
    {
        try {

            $sql = "UPDATE paperDetails
                        SET 
                        paperName = '".$paperDetails->getpaperName()."',
                        paperPrice = '".$paperDetails->getpaperPrice()."'
						WHERE paperId = '".$paperDetails->getpaperId()."' ";

            $isUpdated = mysqli_query($this->con, $sql);
            if ($isUpdated) {
                $this->data = "PAPER_DETAILS_SAVED";

            } else {
                $this->data = "ERROR";
            }

        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;

    }
	
	
	public function DeletingPaper($paperDetails) {
		 try {            
			$sql = "DELETE FROM paperDetails WHERE paperId='".$paperDetails->getpaperId()."'";
			$isDeleted = mysqli_query($this->con, $sql);
            if ($isDeleted) {
                $this->data = "Paper_Deleted";                
            } else {
                $this->data = "ERROR";
            }
		} catch(Exception $e) {
            echo 'SQL Exception: ' .$e->getMessage();
        }
        return $this->data;
	}
	
	public function ShowPaperList($paperDetails)
    {
        try {
            $sql = "SELECT * FROM paperDetails";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count >= 1) {
                $this->data = array();
                while ($rowdata = mysqli_fetch_assoc($isValidating)) {
                    $this->data[] = $rowdata;
                }
            } else {
                $this->data = "Paper list is not available";
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }

}

?>
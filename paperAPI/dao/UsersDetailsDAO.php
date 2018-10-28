<?php
require_once 'BaseDAO.php';

class UsersDetailsDAO
{

    private $con;
    private $msg;
    private $data;

    // Attempts to initialize the database connection using the supplied info.
    public function UsersDetailsDAO()
    {
        $baseDAO = new BaseDAO();
        $this->con = $baseDAO->getConnection();
    }

    public function AddUserDetails($UsersDetail)
    {

        try {
            $sql = "SELECT * FROM  userdetails WHERE userName='" .$UsersDetail->getuserFullName(). "' AND userMobileNo='" .$UsersDetail->getuserMobileNo(). "'";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count == 1) {
                $this->data = "Already_Registered";
            } else {
                $sql = "INSERT INTO userDetails(userName,userMobileNo,userAddress,areaId,areaName,city,paperId,paperName,userEntryDate)
                        VALUES ('" . $UsersDetail->getuserFullName() . "', '" . $UsersDetail->getuserMobileNo() . "', '" . $UsersDetail->getuserAddress() . "', '" .$UsersDetail->getareaId(). "', '" .$UsersDetail->getareaName(). "','" .$UsersDetail->getCity(). "','" .$UsersDetail->getpaperId(). "','" .$UsersDetail->getpaperName(). "','" . $UsersDetail->getUserEntryDate() . "')";

                $isInserted = mysqli_query($this->con, $sql);

                if ($isInserted) {
                    $this->data = "USER_DETAILS_SAVED";
                } else {
                    $this->data = "ERROR";
                }
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
    public function updateUserDetails($addresDetails)
    {
        try {

            $sql = "UPDATE userDetails
                        SET 
                        userName = '".$addresDetails->getuserFullName()."',
                        userMobileNo = '".$addresDetails->getuserMobileNo()."',                        
                        userAddress = '".$addresDetails->getuserAddress()."',
                        areaId = '".$addresDetails->getareaId()."',
						city = '".$addresDetails->getCity()."',
                        paperId = '".$addresDetails->getpaperId()."',                      
                        paperName = '".$addresDetails->getpaperName()."'                        
                        WHERE userId = '".$addresDetails->getUserId()."' ";

            $isUpdated = mysqli_query($this->con, $sql);
            if ($isUpdated) {
                $this->data = "USER_DETAILS_SAVED";

            } else {
                $this->data = "ERROR";
            }

        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;

    }
	
	
	public function deleteUserDetails($userDetails) {
		 try {            
			$sql = "DELETE FROM userDetails WHERE userId='".$userDetails->getUserId()."'";
			$isDeleted = mysqli_query($this->con, $sql);
            if ($isDeleted) {
                $this->data = "User_Deleted";                
            } else {
                $this->data = "ERROR";
            }
		} catch(Exception $e) {
            echo 'SQL Exception: ' .$e->getMessage();
        }
        return $this->data;
	}
	
	
	public function ShowUserList($userDetails)
    {
        try {
            $sql = "SELECT u.*, p.paperPrice FROM 
						userdetails u
						INNER JOIN paperdetails p
						ON u.paperId = p.paperId";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count >= 1) {
                $this->data = array();
                while ($rowdata = mysqli_fetch_assoc($isValidating)) {
                    $this->data[] = $rowdata;
                }
            } else {
                $this->data = "User list is not available";
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
	public function ShowUserWiseUserList($userDetails)
    {
        try {
            $sql = "SELECT u.*, p.paperPrice FROM 
						userdetails u
						INNER JOIN paperdetails p
						ON u.paperId = p.paperId WHERE u.userId= '".$userDetails->getUserId()."'";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count >= 1) {
                $this->data = array();
                while ($rowdata = mysqli_fetch_assoc($isValidating)) {
                    $this->data[] = $rowdata;
                }
            } else {
                $this->data = "User data is not available";
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
	public function ShowAreaWiseUserList($userDetails)
    {
        try {
            $sql = "SELECT u.*, p.paperPrice FROM 
						userdetails u
						INNER JOIN paperdetails p
						ON u.paperId = p.paperId WHERE u.areaId= '".$userDetails->getareaId()."'";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count >= 1) {
                $this->data = array();
                while ($rowdata = mysqli_fetch_assoc($isValidating)) {
                    $this->data[] = $rowdata;
                }
            } else {
                $this->data = "Area Wise User list is not available";
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
}



?>
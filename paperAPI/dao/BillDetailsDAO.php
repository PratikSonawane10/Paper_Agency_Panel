<?php
require_once 'BaseDAO.php';

class BillDetailsDAO
{

    private $con;
    private $msg;
    private $data;

    // Attempts to initialize the database connection using the supplied info.
    public function BillDetailsDAO()
    {
        $baseDAO = new BaseDAO();
        $this->con = $baseDAO->getConnection();
    }

    public function AddUserBillDetails($billDetails)
    {

        try {
            $sql = "SELECT * FROM  userbill WHERE userId='" .$billDetails->getuserId(). "' AND monthName='" .$billDetails->getmonthName(). "'";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count == 1) {
                $this->data = "Already_Added";
            } else {
                $sql = "INSERT INTO userbill(userId,paperName,paperPrice,monthName,year,noOfDays,deliveryCharges,monthlyBill,currentMonthBill,prevBalance,totalBillWithPrevBalance,entryDate)
                        VALUES ('".$billDetails->getuserId()."',
								'".$billDetails->getpaperName()."',
								'".$billDetails->getpaperPrice()."',
								'".$billDetails->getmonthName()."', 
								'".$billDetails->getyear()."', 
								'".$billDetails->getnoOfDays()."', 
								'".$billDetails->getdeliveryCharges()."', 
								'".$billDetails->getmonthlyBill()."',
								'".$billDetails->getcurrentMonthBill()."',
								'".$billDetails->getprevBalance()."',							
								'".$billDetails->gettotalBillWithPrevBalance()."',							
								'".$billDetails->getentryDate()."')";

                $isInserted = mysqli_query($this->con, $sql);

                if ($isInserted) {
                    $this->data = "BILL_DETAILS_SAVED";
                } else {
                    $this->data = "ERROR";
                }
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
    public function UpdateUserBillDetails($billDetails)
    {
        try {

            $sql = "UPDATE userbill
                        SET 
								noOfDays= '".$billDetails->getnoOfDays()."', 
								deliveryCharges = '".$billDetails->getdeliveryCharges()."', 
							monthlyBill = '".$billDetails->getmonthlyBill()."',
								currentMonthBill = '".$billDetails->getcurrentMonthBill()."',
							prevBalance ='".$billDetails->getprevBalance()."',							
							totalBillWithPrevBalance ='".$billDetails->gettotalBillWithPrevBalance()."',                        
							paid ='".$billDetails->getpaidAmount()."',                        
							balance ='".$billDetails->getbalance()."',                        
							entryDate ='".$billDetails->getentryDate()."'                       
                        WHERE billId = '".$billDetails->getbillId()."' ";

            $isUpdated = mysqli_query($this->con, $sql);
            if ($isUpdated) {
                $this->data = "BILL_DETAILS_SAVED";

            } else {
                $this->data = "ERROR";
            }

        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;

    }
	
	
	public function deleteBillDetails($userbill) {
		 try {            
			$sql = "DELETE FROM userbill WHERE billId='".$userbill->getbillId()."'";
			$isDeleted = mysqli_query($this->con, $sql);
            if ($isDeleted) {
                $this->data = "BILL_Deleted";                
            } else {
                $this->data = "ERROR";
            }
		} catch(Exception $e) {
            echo 'SQL Exception: ' .$e->getMessage();
        }
        return $this->data;
	}
	
	
	public function ShowAllBillList($userbill)
    {
        try {
            $sql = "SELECT b.*, u.userName,u.userMobileNo,u.userAddress, u.areaName,u.areaId,u.city FROM 
						userbill b
						INNER JOIN userdetails u
						ON b.userId = u.userId";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count >= 1) {
                $this->data = array();
                while ($rowdata = mysqli_fetch_assoc($isValidating)) {
                    $this->data[] = $rowdata;
                }
            } else {
                $this->data = "Bill list is not available";
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
	public function ShowMonthWiseBillList($userbill)
    {
        try {
            $sql = "SELECT b.*,  u.userName,u.userMobileNo,u.userAddress, u.areaName,u.areaId,u.city FROM 
						userbill b
						INNER JOIN userdetails u
						ON b.userId = u.userId WHERE b.monthName= '".$userbill->getmonthName()."'";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count >= 1) {
                $this->data = array();
                while ($rowdata = mysqli_fetch_assoc($isValidating)) {
                    $this->data[] = $rowdata;
                }
            } else {
                $this->data = "Month wise bill list is not available";
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
	public function ShowAllBillOfUser($userbill)
    {
        try {
            $sql = "SELECT b.*, u.userName,u.userMobileNo,u.userAddress, u.areaName,u.areaId,u.city FROM 
						userbill b
						INNER JOIN userdetails u
						ON b.userId = u.userId WHERE b.userId = '".$userbill->getuserId()."'";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count >= 1) {
                $this->data = array();
                while ($rowdata = mysqli_fetch_assoc($isValidating)) {
                    $this->data[] = $rowdata;
                }
            } else {
                $this->data = "Bill list is not available";
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	public function ShowBillNoWiseDetails($userbill)
    {
        try {
            $sql = "SELECT b.*, u.userName,u.userMobileNo,u.userAddress, u.areaName,u.areaId,u.city FROM 
						userbill b
						INNER JOIN userdetails u
						ON b.userId = u.userId WHERE b.billId = '".$userbill->getbillId()."'";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count >= 1) {
                $this->data = array();
                while ($rowdata = mysqli_fetch_assoc($isValidating)) {
                    $this->data[] = $rowdata;
                }
            } else {
                $this->data = "Bill list is not available";
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
	
	public function getPriviousBalance($userbill)
    {
        try {
			
            $sql = "SELECT * FROM userbill WHERE userId= '".$userbill->getUserId()."' ORDER BY `billId` DESC limit 1";

            $isValidating = mysqli_query($this->con, $sql);
            $count = mysqli_num_rows($isValidating);
            if ($count >= 1) {
                $this->data = array();
                while ($rowdata = mysqli_fetch_assoc($isValidating)) {
                    $this->data[] = $rowdata;
                }
            } else {
                $this->data = "Balance not available";
            }
        } catch (Exception $e) {
            echo 'SQL Exception: ' . $e->getMessage();
        }
        return $this->data;
    }
	
}



?>
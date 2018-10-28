<?php
require_once '../dao/BillDetailsDAO.php';
class BillDetails
{
    private $userId,$billId, $userFullName, $monthName, $year,$totalAmount,$paperId,$paperName,$paperPrice, $entryDate,$monthlyBill,$pending,$noOfDays,$deliveryCharges,$currentMonthBill,$prevBalance, $totalBillWithPrevBalance,$paidAmount,$balance;
  
//paidAmount,balance

public function setbalance($balance)
    {
        $this->balance = $balance;
    }

    public function getbalance()
    {
        return $this->balance;
    }
	
	public function setpaidAmount($paidAmount)
    {
        $this->paidAmount = $paidAmount;
    }

    public function getpaidAmount()
    {
        return $this->paidAmount;
    }
public function setdeliveryCharges($deliveryCharges)
    {
        $this->deliveryCharges = $deliveryCharges;
    }

    public function getdeliveryCharges()
    {
        return $this->deliveryCharges;
    }

	public function settotalBillWithPrevBalance($totalBillWithPrevBalance)
    {
        $this->totalBillWithPrevBalance = $totalBillWithPrevBalance;
    }

    public function gettotalBillWithPrevBalance()
    {
        return $this->totalBillWithPrevBalance;
    }

	public function setprevBalance($prevBalance)
    {
        $this->prevBalance = $prevBalance;
    }

    public function getprevBalance()
    {
        return $this->prevBalance;
    }

	public function setcurrentMonthBill($currentMonthBill)
    {
        $this->currentMonthBill = $currentMonthBill;
    }

    public function getcurrentMonthBill()
    {
        return $this->currentMonthBill;
    }

	public function setnoOfDays($noOfDays)
    {
        $this->noOfDays = $noOfDays;
    }

    public function getnoOfDays()
    {
        return $this->noOfDays;
    }

	public function setbillId($billId)
    {
        $this->billId = $billId;
    }

    public function getbillId()
    {
        return $this->billId;
    }
	
	public function setpending($pending)
    {
        $this->pending = $pending;
    }

    public function getpending()
    {
        return $this->pending;
    }
	
    public function setmonthlyBill($monthlyBill)
    {
        $this->monthlyBill = $monthlyBill;
    }

    public function getmonthlyBill()
    {
        return $this->monthlyBill;
    } 
	public function setpaperId($paperId)
    {
        $this->paperId = $paperId;
    }

    public function getpaperId()
    {
        return $this->paperId;
    } 
	
	public function setpaperName($paperName)
    {
        $this->paperName = $paperName;
    }

    public function getpaperName()
    {
        return $this->paperName;
    }
	public function setpaperPrice($paperPrice)
    {
        $this->paperPrice = $paperPrice;
    }

    public function getpaperPrice()
    {
        return $this->paperPrice;
    }
	
	
	public function setUserId($userId)
    {
        $this->userId = $userId;
    }

    public function getUserId()
    {
        return $this->userId;
    }

    public function setuserFullName($userFullName)
    {
        $this->userFullName = $userFullName;
    }

    public function getuserFullName()
    {
        return $this->userFullName;
    }

    public function setmonthName($monthName)
    {
        $this->monthName = $monthName;
    }

    public function getmonthName()
    {
        return $this->monthName;
    }

    public function setyear($year)
    {
        $this->year = $year;
    }

    public function getyear()
    {
        return $this->year;
    }

    public function settotalAmount($totalAmount)
    {
        $this->totalAmount = $totalAmount;
    }

    public function gettotalAmount()
    {
        return $this->totalAmount;
    }

    public function setentryDate($entryDate)
    {
        $this->entryDate = $entryDate;
    }

    public function getentryDate()
    {
        return $this->entryDate;
    }

    public function mapIncomingAddUserBillDetailsParams($userId,$paperName,$paperPrice, $monthName, $year,$noOfDays,$deliveryCharges,$monthlyBill,$currentMonthBill,$prevBalance, $totalBillWithPrevBalance, $entryDate)
    {
        $this->setUserId($userId);  
		$this->setpaperName($paperName);
		$this->setpaperPrice($paperPrice);		
        $this->setmonthName($monthName);
        $this->setyear($year);
        $this->setnoOfDays($noOfDays);
        $this->setdeliveryCharges($deliveryCharges);
        $this->setmonthlyBill($monthlyBill);
        $this->setcurrentMonthBill($currentMonthBill);
        $this->setprevBalance($prevBalance);               
        $this->settotalBillWithPrevBalance($totalBillWithPrevBalance);
        $this->setentryDate($entryDate);
    }

    public function mapIncomingUpdateUserBillDetailsParams($billId,$noOfDays,$deliveryCharges,$monthlyBill,$currentMonthBill,$prevBalance, $totalBillWithPrevBalance, $paidAmount,$balance,$entryDate)
    {
        $this->setbillId($billId);        
		$this->setnoOfDays($noOfDays);
        $this->setdeliveryCharges($deliveryCharges);
        $this->setmonthlyBill($monthlyBill);
        $this->setcurrentMonthBill($currentMonthBill);
        $this->setprevBalance($prevBalance);               
        $this->settotalBillWithPrevBalance($totalBillWithPrevBalance);
        $this->setpaidAmount($paidAmount);
        $this->setbalance($balance);
        $this->setentryDate($entryDate);
    }   

	public function SavingUserBillDetails()
    {
        $objDAO = new BillDetailsDAO();
        $returnMessage = $objDAO->AddUserBillDetails($this);
        return $returnMessage;
    }
	public function UpdatingUserBillDetails()
    {
        $objDAO = new BillDetailsDAO();
        $returnMessage = $objDAO->UpdateUserBillDetails($this);
        return $returnMessage;
    }
	
    

    public function deletingBillDetails($billId)
    {
        $this->setbillId($billId);
        $objDAO = new BillDetailsDAO();
        $returnMessage = $objDAO->deleteBillDetails($this);
        return $returnMessage;
    }
	
	public function ShowingAllBillList()
    {     
        $objDAO = new BillDetailsDAO();
        $returnMessage = $objDAO->ShowAllBillList($this);
        return $returnMessage;
    }
	
	public function ShowingMonthWiseBillList($monthName)
    {     	
        $objDAO = new BillDetailsDAO();
		$this->setmonthName($monthName);
        $returnMessage = $objDAO->ShowMonthWiseBillList($this);
        return $returnMessage;
    }
	
	public function ShowingAllBillOfUser($userId)
    {     	
        $objDAO = new BillDetailsDAO();
		$this->setUserId($userId);
        $returnMessage = $objDAO->ShowAllBillOfUser($this);
        return $returnMessage;
    }
	
	public function ShowingBillNoWiseDetails($billId)
    {     	
        $objDAO = new BillDetailsDAO();
		$this->setbillId($billId);
        $returnMessage = $objDAO->ShowBillNoWiseDetails($this);
        return $returnMessage;
    }
	
		
	public function gettingPriviousBalance($userId)
    {     	
        $objDAO = new BillDetailsDAO();
		$this->setUserId($userId);
        $returnMessage = $objDAO->getPriviousBalance($this);
        return $returnMessage;
    }

 


}

?>
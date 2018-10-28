<?php
require_once '../dao/UsersDetailsDAO.php';
class UsersDetails
{
    private $userId, $userFullName, $userMobileNo, $userAddress,$city,$paperId,$paperName, $userEntryDate,$areaId,$areaName;
   
  

	public function setareaName($areaName)
    {
        $this->areaName = $areaName;
    }

    public function getareaName()
    {
        return $this->areaName;
    }
	
    public function setareaId($areaId)
    {
        $this->areaId = $areaId;
    }

    public function getareaId()
    {
        return $this->areaId;
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

    public function setuserMobileNo($userMobileNo)
    {
        $this->userMobileNo = $userMobileNo;
    }

    public function getuserMobileNo()
    {
        return $this->userMobileNo;
    }

    public function setuserAddress($userAddress)
    {
        $this->userAddress = $userAddress;
    }

    public function getuserAddress()
    {
        return $this->userAddress;
    }

    public function setCity($city)
    {
        $this->city = $city;
    }

    public function getCity()
    {
        return $this->city;
    }

    public function setUserEntryDate($userEntryDate)
    {
        $this->userEntryDate = $userEntryDate;
    }

    public function getUserEntryDate()
    {
        return $this->userEntryDate;
    }

    public function mapIncomingAddUserDetailsParams ($userFullName, $userMobileNo, $userAddress,$areaName,$areaId,$paperName,$paperId, $city, $userEntryDate)
    {
        $this->setuserFullName($userFullName);       
        $this->setuserMobileNo($userMobileNo);
        $this->setuserAddress($userAddress);
        $this->setareaId($areaId);
        $this->setareaName($areaName);
        $this->setpaperId($paperId);
        $this->setpaperName($paperName);
        $this->setCity($city);
        $this->setUserEntryDate($userEntryDate);
    }

    public function mapIncomingUpdateUserDetailsParams($userId,$userFullName, $userMobileNo, $userAddress,$areaName,$areaId,$paperName,$paperId, $city)
    {
        $this->setUserId($userId);
        $this->setuserFullName($userFullName);       
        $this->setuserMobileNo($userMobileNo);
        $this->setuserAddress($userAddress);
        $this->setareaId($areaId);
        $this->setareaName($areaName);
        $this->setpaperId($paperId);
        $this->setpaperName($paperName);
        $this->setCity($city);
    }   

	public function SavingUsersDetails()
    {
        $objDAO = new UsersDetailsDAO();
        $returnMessage = $objDAO->AddUserDetails($this);
        return $returnMessage;
    }
	
    public function updatingUsersDetails()
    {
        $objDAO = new UsersDetailsDAO();
        $returnMessage = $objDAO->updateUserDetails($this);
        return $returnMessage;
    }

    public function deletingUserDetails($userId)
    {
        $this->setUserId($userId);
        $objDAO = new UsersDetailsDAO();
        $returnMessage = $objDAO->deleteUserDetails($this);
        return $returnMessage;
    }
	
	public function ShowingUserList()
    {     
        $objDAO = new UsersDetailsDAO();
        $returnMessage = $objDAO->ShowUserList($this);
        return $returnMessage;
    }
	
	public function ShowingUserWiseUserList($userId)
    {     	
        $objDAO = new UsersDetailsDAO();
		$this->setUserId($userId);
        $returnMessage = $objDAO->ShowUserWiseUserList($this);
        return $returnMessage;
    }
	
	public function ShowingAreaWiseUserList($areaId)
    {     	
        $objDAO = new UsersDetailsDAO();
		$this->setareaId($areaId);
        $returnMessage = $objDAO->ShowAreaWiseUserList($this);
        return $returnMessage;
    }

 


}

?>
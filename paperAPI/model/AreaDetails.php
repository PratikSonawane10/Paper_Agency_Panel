<?php
require_once '../dao/AreaDetailsDAO.php';
class AreaDetails
{
    private $areaId, $areaName,$entryDate;

   

    public function setareaId($areaId)
    {
        $this->areaId = $areaId;
    }

    public function getareaId()
    {
        return $this->areaId;
    }

    public function setareaName($areaName)
    {
        $this->areaName = $areaName;
    }

    public function getareaName()
    {
        return $this->areaName;
    }

  public function setentryDate($entryDate)
    {
        $this->entryDate = $entryDate;
    }

    public function getentryDate()
    {
        return $this->entryDate;
    }

  

	 public function AddArea($areaName,$entryDate)
    {
		$this->setareaName($areaName); 
		$this->setentryDate($entryDate); 
        $objDAO = new AreaDetailsDAO();
        $returnMessage = $objDAO->AddingArea($this);
        return $returnMessage;
    }
	
    public function UpdateArea($areaId,$areaName)
    {
		$this->setareaId($areaId);
		$this->setareaName($areaName); 
        $objDAO = new AreaDetailsDAO();
        $returnMessage = $objDAO->UpdatingArea($this);
        return $returnMessage;
    }


    public function DeleteArea($areaId)
    {
        $this->setareaId($areaId);
        $objDAO = new AreaDetailsDAO();
        $returnMessage = $objDAO->DeletingArea($this);
        return $returnMessage;
    }

	public function ShowingAreaList()
    {     
        $objDAO = new AreaDetailsDAO();
        $returnMessage = $objDAO->ShowAreaList($this);
        return $returnMessage;
    }
 


}

?>
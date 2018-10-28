<?php
require_once '../dao/PaperDetailsDAO.php';
class PaperDetails
{
     private $paperId, $paperFullName,$paperPrice,$entryDate;

   

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

  public function setentryDate($entryDate)
    {
        $this->entryDate = $entryDate;
    }

    public function getentryDate()
    {
        return $this->entryDate;
    }

	 public function AddPaper($paperName,$paperPrice,$entryDate)
    {
		$this->setpaperName($paperName); 
		$this->setpaperPrice($paperPrice); 
		$this->setentryDate($entryDate); 
        $objDAO = new PaperDetailsDAO();
        $returnMessage = $objDAO->AddingPaper($this);
        return $returnMessage;
    }
	
    public function UpdatePaper($paperId,$paperName,$paperPrice)
    {
		$this->setpaperId($paperId);
		$this->setpaperName($paperName); 
		$this->setpaperPrice($paperPrice); 
        $objDAO = new PaperDetailsDAO();
        $returnMessage = $objDAO->UpdatingPaper($this);
        return $returnMessage;
    }


    public function DeletePaper($paperId)
    {
        $this->setpaperId($paperId);
        $objDAO = new PaperDetailsDAO();
        $returnMessage = $objDAO->DeletingPaper($this);
        return $returnMessage;
    }

	public function ShowingPaperList()
    {     
        $objDAO = new PaperDetailsDAO();
        $returnMessage = $objDAO->ShowPaperList($this);
        return $returnMessage;
    }
}

?>
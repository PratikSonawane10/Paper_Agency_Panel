<?php
require_once '../model/PaperDetails.php';
require_once '../model/UsersDetails.php';
require_once '../model/AreaDetails.php';
require_once '../model/BillDetails.php';


function deliver_response($format, $api_response, $isSaveQuery)
{

    // Define HTTP responses
    $http_response_code = array(200 => 'OK', 400 => 'Bad Request', 401 => 'Unauthorized', 403 => 'Forbidden', 404 => 'Not Found');

    // Set HTTP Response
    header('HTTP/1.1 ' . $api_response['status'] . ' ' . $http_response_code[$api_response['status']]);
	header("Access-Control-Allow-Origin: *");

    // Process different content types
    if (strcasecmp($format, 'json') == 0) {

        ignore_user_abort();
        ob_start();

        // Set HTTP Response Content Type
        header('Content-Type: application/json; charset=utf-8');

        // Format data into a JSON response
        $json_response = json_encode($api_response);

        // Deliver formatted data
        echo $json_response;

        ob_flush();

    } elseif (strcasecmp($format, 'xml') == 0) {

        // Set HTTP Response Content Type
        header('Content-Type: application/xml; charset=utf-8');

        // Format data into an XML response (This is only good at handling string data, not arrays)
        $xml_response = '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<response>' . "\n" . "\t" . '<code>' . $api_response['code'] . '</code>' . "\n" . "\t" . '<data>' . $api_response['data'] . '</data>' . "\n" . '</response>';

        // Deliver formatted data
        echo $xml_response;

    } else {

        // Set HTTP Response Content Type (This is only good at handling string data, not arrays)
        header('Content-Type: text/html; charset=utf-8');

        // Deliver formatted data
        echo $api_response['data'];

    }

    // End script process
    exit;
}

// Define whether an HTTPS connection is required
$HTTPS_required = FALSE;

// Define whether user authentication is required
$authentication_required = FALSE;

// Define API response codes and their related HTTP response
$api_response_code = array(0 => array('HTTP Response' => 400, 'Message' => 'Unknown Error'), 1 => array('HTTP Response' => 200, 'Message' => 'Success'), 2 => array('HTTP Response' => 403, 'Message' => 'HTTPS Required'), 3 => array('HTTP Response' => 401, 'Message' => 'Authentication Required'), 4 => array('HTTP Response' => 401, 'Message' => 'Authentication Failed'), 5 => array('HTTP Response' => 404, 'Message' => 'Invalid Request'), 6 => array('HTTP Response' => 400, 'Message' => 'Invalid Response Format'));

// Set default HTTP response of 'ok'
$response['code'] = 0;
$response['status'] = 404;

// --- Step 2: Authorization

// Optionally require connections to be made via HTTPS
if ($HTTPS_required && $_SERVER['HTTPS'] != 'on') {
    $response['code'] = 2;
    $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
    $response['data'] = $api_response_code[$response['code']]['Message'];

    // Return Response to browser. This will exit the script.
    deliver_response("json", $response);
}

// Optionally require user authentication
if ($authentication_required) {

    if (empty($_POST['username']) || empty($_POST['password'])) {
        $response['code'] = 3;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $response['data'] = $api_response_code[$response['code']]['Message'];

        // Return Response to browser
        deliver_response("json", $response);

    }

    // Return an error response if user fails authentication. This is a very simplistic example
    // that should be modified for security in a production environment
    elseif ($_POST['username'] != 'foo' && $_POST['password'] != 'bar') {
        $response['code'] = 4;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $response['data'] = $api_response_code[$response['code']]['Message'];

        // Return Response to browser
        deliver_response("json", $response);
    }
}

// --- Step 3: Process Request

// Switch based on incoming method
$checkmethod = $_SERVER['REQUEST_METHOD'];
$var = file_get_contents("php://input");
$_POST = json_decode($var, TRUE);
$_POST['method'] = $_POST['method'];

if (isset($_POST['method']) || $checkmethod == 'POST') {

    if (strcasecmp($_POST['method'], 'registerFireBaseToken') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new FirebaseTokenRegister();
        $android_id = $_POST['androidId'];
        $token = $_POST['token'];
        $response['registerFireBaseTokenResponse'] = $objModel->firebaseTokenRegistration($android_id, $token);
        deliver_response($_POST['format'], $response, false);
    }
    else if (strcasecmp($_POST['method'], 'saveUserDetails') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new UsersDetails();
        $userFullName = $_POST['userFullName'];       
        $userMobileNo = $_POST['userMobileNo'];
        $userAddress = $_POST['userAddress'];
        $areaName = $_POST['areaName'];
        $areaId = $_POST['areaId'];
        $city = $_POST['city'];
        $paperName = $_POST['paperName'];
        $paperId = $_POST['paperId'];
        date_default_timezone_set('Asia/Kolkata');
        $userEntryDate = date("Y-m-d H:i:s");
        $objModel->mapIncomingAddUserDetailsParams($userFullName, $userMobileNo, $userAddress,$areaName,$areaId,$paperName,$paperId, $city, $userEntryDate);
        $response['saveUserDetailsRespons'] = $objModel->SavingUsersDetails();       
        deliver_response($_POST['format'], $response, false);
    }
	else if (strcasecmp($_POST['method'], 'updateUserDetails') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new UsersDetails();
		$userId = $_POST['userId'];        
        $userFullName = $_POST['userFullName'];       
        $userMobileNo = $_POST['userMobileNo'];
        $userAddress = $_POST['userAddress'];
        $areaName = $_POST['areaName'];
        $areaId = $_POST['areaId'];
        $city = $_POST['city'];
        $paperName = $_POST['paperName'];    
        $paperId = $_POST['paperId'];    
        $objModel->mapIncomingUpdateUserDetailsParams($userId,$userFullName, $userMobileNo, $userAddress,$areaName,$areaId,$paperName,$paperId, $city);
        $response['saveUserDetailsRespons'] = $objModel->updatingUsersDetails();       
        deliver_response($_POST['format'], $response, false);
    }
	
	else if (strcasecmp($_POST['method'], 'deleteUser') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new UsersDetails();
        $userId = $_POST['userId'];                     
        $response['saveUserDetailsRespons'] = $objModel->deletingUserDetails($userId);       
        deliver_response($_POST['format'], $response, false);
    }

    //{"method":"savePaperDetails","paperName":"abc","paperPrice":"5"}
    else if (strcasecmp($_POST['method'], 'savePaperDetails') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new PaperDetails();
        $paperName = $_POST['paperName'];
        $paperPrice = $_POST['paperPrice'];
		date_default_timezone_set('Asia/Kolkata');
        $entryDate = date("Y-m-d H:i:s");
		$response['savePaperDetailsResponse'] = $objModel->AddPaper($paperName,$paperPrice,$entryDate);
        deliver_response($_POST['format'], $response, true);
    }
	
	else if (strcasecmp($_POST['method'], 'updatePaperDetails') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new PaperDetails();
        $paperId = $_POST['paperId'];
        $paperName = $_POST['paperName'];
        $paperPrice = $_POST['paperPrice'];
		$response['savePaperDetailsResponse'] = $objModel->UpdatePaper($paperId,$paperName,$paperPrice);
        deliver_response($_POST['format'], $response, true);
    }
	
	else if (strcasecmp($_POST['method'], 'deletePaper') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new PaperDetails();
        $paperId = $_POST['paperId'];        
		$response['savePaperDetailsResponse'] = $objModel->DeletePaper($paperId);
        deliver_response($_POST['format'], $response, true);
    }
	
	else if (strcasecmp($_POST['method'], 'saveAreaDetails') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new AreaDetails();
        $areaName = $_POST['areaName'];       
		date_default_timezone_set('Asia/Kolkata');
        $entryDate = date("Y-m-d H:i:s");		
		$response['saveAreaDetailsResponse'] = $objModel->AddArea($areaName,$entryDate);
        deliver_response($_POST['format'], $response, true);
    }
	
	else if (strcasecmp($_POST['method'], 'updateAreaDetails') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new AreaDetails();
		$areaId = $_POST['areaId'];
        $areaName = $_POST['areaName'];        
		$response['saveAreaDetailsResponse'] = $objModel->UpdateArea($areaId,$areaName);
        deliver_response($_POST['format'], $response, true);
    }	
	else if (strcasecmp($_POST['method'], 'deleteAreaDetails') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new AreaDetails();
        $areaId = $_POST['areaId'];        
		$response['saveAreaDetailsResponse'] = $objModel->DeleteArea($areaId);
        deliver_response($_POST['format'], $response, true);
    }
	else if (strcasecmp($_POST['method'], 'saveUserBill') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new BillDetails();
        $userId = $_POST['userId'];       
        $monthName = $_POST['monthName'];
        $year = $_POST['year'];
        $noOfDays = $_POST['noOfDays'];
        $deliveryCharges = $_POST['deliveryCharges'];
        $monthlyBill = $_POST['monthlyBill'];
        $currentMonthBill = $_POST['currentMonthBill'];
        $prevBalance = $_POST['prevBalance'];
        $totalBillWithPrevBalance = $_POST['totalBillWithPrevBalance'];
        $paperName = $_POST['paperName'];
        $paperPrice = $_POST['paperPrice'];
        date_default_timezone_set('Asia/Kolkata');
        $entryDate = date("Y-m-d H:i:s");
        $objModel->mapIncomingAddUserBillDetailsParams($userId,$paperName,$paperPrice, $monthName, $year,$noOfDays,$deliveryCharges,$monthlyBill,$currentMonthBill,$prevBalance, $totalBillWithPrevBalance, $entryDate);
        $response['saveBillDetailsRespons'] = $objModel->SavingUserBillDetails();       
        deliver_response($_POST['format'], $response, false);
    }
	else if (strcasecmp($_POST['method'], 'UpdateUserBill') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new BillDetails();
        $billId = $_POST['billId'];       
        
        $noOfDays = $_POST['noOfDays'];
        $deliveryCharges = $_POST['deliveryCharges'];
        $monthlyBill = $_POST['monthlyBill'];
        $currentMonthBill = $_POST['currentMonthBill'];
        $prevBalance = $_POST['prevBalance'];
        $totalBillWithPrevBalance = $_POST['totalBillWithPrevBalance'];
        $paidAmount = $_POST['paidAmount'];
        $balance = $_POST['balance'];
        date_default_timezone_set('Asia/Kolkata');
        $entryDate = date("Y-m-d H:i:s");
        $objModel->mapIncomingUpdateUserBillDetailsParams($billId,$noOfDays,$deliveryCharges,$monthlyBill,$currentMonthBill,$prevBalance, $totalBillWithPrevBalance, $paidAmount,$balance,$entryDate);
        $response['saveBillDetailsRespons'] = $objModel->UpdatingUserBillDetails();       
        deliver_response($_POST['format'], $response, false);
    }
	else if (strcasecmp($_POST['method'], 'deleteBill') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new BillDetails();
        $billId = $_POST['billId'];                     
        $response['deleteuserRespons'] = $objModel->deletingBillDetails($billId);       
        deliver_response($_POST['format'], $response, false);
    }
    
//////////////////////////////////////////////////////////////////////////////////////////////////////
} else {
    //http://localhost/VBags\php\api\vbags_api.php?method=AllUserList
    if (strcasecmp($_GET['method'], 'AllUserList') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new UsersDetails();
        $response['showUserListResponse'] = $objModel->ShowingUserList();
        deliver_response("json", $response, false);
    } 
	else if (strcasecmp($_GET['method'], 'UserWiseDetails') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new UsersDetails();
		$userId = $_GET['userId']; 		
        $response['showUserListResponse'] = $objModel->ShowingUserWiseUserList($userId);
        deliver_response("json", $response, false);
    }
	else if (strcasecmp($_GET['method'], 'AreaWiseUserList') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new UsersDetails();
		$areaId = $_GET['areaId']; 
        $response['showUserListResponse'] = $objModel->ShowingAreaWiseUserList($areaId);
        deliver_response("json", $response, false);
    }
	else if (strcasecmp($_GET['method'], 'AreaList') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new AreaDetails();
        $response['showAreaListResponse'] = $objModel->ShowingAreaList();
        deliver_response("json", $response, false);
    }
	else if (strcasecmp($_GET['method'], 'PaperList') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new PaperDetails();
        $response['showPaperListResponse'] = $objModel->ShowingPaperList();
        deliver_response("json", $response, false);
    }
	
	else if (strcasecmp($_GET['method'], 'AllBillList') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new BillDetails();
        $response['showBillListResponse'] = $objModel->ShowingAllBillList();
        deliver_response("json", $response, false);
    } 
	else if (strcasecmp($_GET['method'], 'MonthWiseBillList') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new BillDetails();
		$monthName = $_GET['monthName']; 
        $response['showBillListResponse'] = $objModel->ShowingMonthWiseBillList($monthName);
        deliver_response("json", $response, false);
    }
	else if (strcasecmp($_GET['method'], 'AllBillOfUser') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new BillDetails();
		$userId = $_GET['userId']; 
        $response['showBillListResponse'] = $objModel->ShowingAllBillOfUser($userId);
        deliver_response("json", $response, false);
    }
	else if (strcasecmp($_GET['method'], 'BillNoWiseBillDetails') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new BillDetails();
		$billId = $_GET['billId']; 
        $response['showBillListResponse'] = $objModel->ShowingBillNoWiseDetails($billId);
        deliver_response("json", $response, false);
    }
	
	else if (strcasecmp($_GET['method'], 'getPriviosBalance') == 0) {
        $response['code'] = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
        $objModel = new BillDetails();
		$userId = $_GET['userId']; 	
        $response['showBillListResponse'] = $objModel->gettingPriviousBalance($userId);
        deliver_response("json", $response, false);
    }

   
}
?>

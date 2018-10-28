
 $(function() {


	var billId = "";
	var userName = "";
	var currentMonthBill = "";		
	var prevBalance = "";	
	var totalBillWithPrevBalance = "";
	
	
            billId = sessionStorage.getItem("billId");
            userName = sessionStorage.getItem("userName");
            currentMonthBill = sessionStorage.getItem("currentMonthBill");
            prevBalance = sessionStorage.getItem("prevBalance");
			totalBillWithPrevBalance = sessionStorage.getItem("totalBillWithPrevBalance");
			
			
			$("#txtBillId").html(billId);
			$("#txtUserName").html(userName);
			$("#txtCurrentAmount").html(currentMonthBill);	
			$("#txtpreviouBalance").html(prevBalance);			
			$("#txtTotalAmount").html(totalBillWithPrevBalance);
});
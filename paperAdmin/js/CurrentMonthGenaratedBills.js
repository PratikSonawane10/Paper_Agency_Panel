// if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	// sessionStorage.setItem("url",document.URL);
	// window.location.href="login.html";
// }



$(function() {
	
	var userNameArray = new Array();
	var userIdArray = new Array();
	var billNoArray = new Array();
	var areaNameArray = new Array();
	var areaIdArray = new Array();
	
	var monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	var env = environment.getEnv();
	
	var url = env+"?method=AllUserList&format=json";
	$.getJSON(url, function(response) {
		if($.isArray(response.showUserListResponse) && response.showUserListResponse.length) {
						
			$.each(response.showUserListResponse, function(i, userList) {			
				
				userNameArray.push(userList.userName);
				userIdArray.push(userList.userId);
				
			});
		}
		else {
			alert("User list is not available in the database!");
		}
	});	
	
var url = env+"?method=AreaList&format=json";
	$.getJSON(url, function(response) {
		if($.isArray(response.showAreaListResponse) && response.showAreaListResponse.length) {			
			$.each(response.showAreaListResponse, function(i, areaList) {
				areaNameArray.push(areaList.areaName);
				areaIdArray.push(areaList.areaId);							
			});
		}
		else {
			alert("Area list is not available in the database!");
		}
	});	
	
	
	$( "#txtAreaName" ).autocomplete({ 
		source: areaNameArray,
		select: function (event, ui) {
			var index = areaNameArray.indexOf(ui.item.value);
			var areaId = areaIdArray[index];
			alert(index);	
		}
	});
});
	
	var url = env+"?method=AllBillList&format=json";
	$("#listOBills tbody").html("");
	$.getJSON(url, function(response) {
		if($.isArray(response.showBillListResponse) && response.showBillListResponse.length) {
					
			var headRow = '<th style="text-align:center">Bill No</th>'+
			'<th style="text-align:center">User Name</th>'+
			'<th style="text-align:center">Mobile No</th>'+
			'<th style="text-align:center">Adddress</th>'+
			'<th style="text-align:center">Area</th>'+
			'<th style="text-align:center">City</th>'+
			'<th style="text-align:center">Paper</th>'+			
			'<th style="text-align:center">Paper Price</th>'+
			'<th style="text-align:center">Bill Of Month</th>'+
			'<th style="text-align:center">No Of Days </th>'+
			'<th style="text-align:center">Delivery Charges</th>'+
			'<th style="text-align:center">Current Bill</th>'+
			'<th style="text-align:center">Prev Balance</th>'+
			'<th style="text-align:center">Total Bill (prev bal include)</th>'+
			'<th style="text-align:center">Paid</th>'+
			'<th style="text-align:center">Balance</th>'+
			'<th style="text-align:center">Print Bill</th>'+
			'<th style="text-align:center">Update Bill</th>';
			
			$(headRow).appendTo("#listOBills thead");
			$.each(response.showBillListResponse, function(i, billList) {
				
				billNoArray.push(billList.billId);
				
				addList(billList);													
						
			});
		}
		else {
			alert("Bills are not available in the database!");
		}
	});	
	
	$( "#txtUserName" ).autocomplete({ 
		source: userNameArray,
		select: function (event, ui) {
			var index = userNameArray.indexOf(ui.item.value);
			var userId = userIdArray[index];			
		
			var url = env+"?method=AllBillOfUser&format=json&userId="+userId+"";
			$("#listOBills tbody").html("");
			$.getJSON(url, function(response) {
				if($.isArray(response.showBillListResponse) && response.showBillListResponse.length) {
						
					$.each(response.showBillListResponse, function(i, billList) {
						
						addList(billList);							
								
					});
				}
				else {
					alert("Userwise Bill list is not available in the database!");
				}
			});				
		}
	});
	
	$( "#txtMonthName" ).autocomplete({ 
		source: monthsArray,
		select: function (event, ui) {
			var index = monthsArray.indexOf(ui.item.value);
			var month = monthsArray[index];
			
			monthWiseBills(month);
			var url = env+"?method=MonthWiseBillList&format=json&monthName="+month+"";
			$("#listOBills tbody").html("");
			$.getJSON(url, function(response) {
				if($.isArray(response.showBillListResponse) && response.showBillListResponse.length) {
					$.each(response.showBillListResponse, function(i, billList) {	
								
						addList(billList);														
					});
				}
				else {
					alert("Month wise bill list is not available in the database!");
				}
			});
		}
	});	
	
	
	$( "#txtBillNo" ).autocomplete({ 
		source: billNoArray,
		select: function (event, ui) {
			var index = billNoArray.indexOf(ui.item.value);
			var billId = billNoArray[index];
			
			//monthWiseBills(month);
			var url = env+"?method=BillNoWiseBillDetails&format=json&billId="+billId+"";
			$("#listOBills tbody").html("");
			$.getJSON(url, function(response) {
				if($.isArray(response.showBillListResponse) && response.showBillListResponse.length) {
					$.each(response.showBillListResponse, function(i, billList) {	
											
						addList(billList);														
					});
				}
				else {
					alert("Month wise bill list is not available in the database!");
				}
			});
		}
	});
});

function addList(billList) {
		var newRow = "<tr>" + 
				//userId,userName,userMobileNo,userAddress,areaName,city,paperName,paperPrice
				'<td align="center" style="padding:5px">' + billList.billId + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.userName + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.userMobileNo + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.userAddress + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.areaName + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.city + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.paperName + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.paperPrice + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.monthName + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.noOfDays + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.deliveryCharges + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.currentMonthBill + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.prevBalance + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.totalBillWithPrevBalance + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.paid + '</td>' + 
				'<td align="center" style="padding:5px">' + billList.balance + '</td>' +  
				
				
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'printBill(\""+billList.billId+"\",\""+billList.userName+"\",\""+billList.userMobileNo+"\",\""+billList.userAddress+"\",\""+billList.areaName+"\",\""+billList.city+"\",\""+billList.paperName+"\",\""+billList.paperPrice+"\",\""+billList.monthName+"\",\""+billList.noOfDays+"\",\""+billList.deliveryCharges+"\",\""+billList.currentMonthBill+"\",\""+billList.prevBalance+"\",\""+billList.totalBillWithPrevBalance+"\",\""+billList.paid+"\",\""+billList.balance+"\", event, this)\'>Print</button>" + '</td>' +
								
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'updateBill(\""+billList.billId+"\",\""+billList.userName+"\",\""+billList.userMobileNo+"\",\""+billList.userAddress+"\",\""+billList.areaName+"\",\""+billList.city+"\",\""+billList.paperName+"\",\""+billList.paperPrice+"\",\""+billList.monthName+"\",\""+billList.noOfDays+"\",\""+billList.deliveryCharges+"\",\""+billList.currentMonthBill+"\",\""+billList.prevBalance+"\",\""+billList.totalBillWithPrevBalance+"\",\""+billList.paid+"\",\""+billList.balance+"\", event, this)\'>Update</button>" + '</td>' 
			  
				// '<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'deleteuser( \""+billList.userId+"\", event, this)\'>Delete</button>" + '</td>'
				"</tr>"; 
				$(newRow).appendTo("#listOBills tbody");	
				
		
				
	
}

function printBill(billId,userName,userMobileNo,userAddress,areaName,city,paperName,paperPrice,monthName,noOfDays,deliveryCharges,currentMonthBill,prevBalance,totalBillWithPrevBalance,paid,balance,event, delrow) {
	
    sessionStorage.setItem("billId",billId);
    sessionStorage.setItem("userName",userName);
    sessionStorage.setItem("currentMonthBill",currentMonthBill);
    sessionStorage.setItem("prevBalance",prevBalance);
    sessionStorage.setItem("totalBillWithPrevBalance",totalBillWithPrevBalance);
	
	window.location.href = "invoice-print.html";
	
}

function updateBill(billId,userName,userMobileNo,userAddress,areaName,city,paperName,paperPrice,monthName,noOfDays,deliveryCharges,currentMonthBill,prevBalance,totalBillWithPrevBalance,paid,balance,event, delrow) {
	var imFrom = "Update";

	sessionStorage.setItem("imFrom",imFrom);
	sessionStorage.setItem("billId",billId);
    sessionStorage.setItem("userName",userName);
    sessionStorage.setItem("userMobileNo",userMobileNo);
    sessionStorage.setItem("userAddress",userAddress);
    sessionStorage.setItem("areaName",areaName);
    sessionStorage.setItem("city",city);
    sessionStorage.setItem("paperName",paperName);
    sessionStorage.setItem("paperPrice",paperPrice);
    sessionStorage.setItem("monthName",monthName);
    sessionStorage.setItem("noOfDays",noOfDays);
    sessionStorage.setItem("deliveryCharges",deliveryCharges);
   
	   
    sessionStorage.setItem("currentMonthBill",currentMonthBill);
    sessionStorage.setItem("prevBalance",prevBalance);
    sessionStorage.setItem("totalBillWithPrevBalance",totalBillWithPrevBalance);
	
	window.location.href = "GenerateBill.html";
	
}

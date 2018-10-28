// if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	// sessionStorage.setItem("url",document.URL);
	// window.location.href="login.html";
// }



$(function() {
	$("#btnSubmit").hide();
	$("#btnPrint").hide();
	$("#txtPaidAmountTr").hide();
	$("#txtBalanceTr").hide();
	
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
	
	var billId = "";
	var userId = "";
	var userName = "";
	var userMobileNo = "";		
	var userAddress = "";	
	var city = "";
	var areaName="";
	var paperName="";
	var paperPrice="";

    var monthName = months[date.getMonth() -1 ];
	var year = date.getFullYear();	
	var noOfDays =  new Date(year, date.getMonth(), 0).getDate(); // date.getMonth()+1; to get current month days count
	var deliveryCharges=10;
	var monthlyBill="";
	var currentMonthBill="";
	var prevBalance ="";
	var totalBillWithPrevBalance = "";
	var paidAmount = "";
	var balance = "";
	
	var env = environment.getEnv();
	$("#txtDays").val(noOfDays);

	
	var fullDate = new Date();
	var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
	var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
	$("#lblDate").html(currentDate);	

	if (sessionStorage.getItem("userId") != null && sessionStorage.getItem("userName") != null && sessionStorage.getItem("userMobileNo") != null && sessionStorage.getItem("userAddress") != null && sessionStorage.getItem("city") != null && sessionStorage.getItem("areaName") != null && sessionStorage.getItem("paperName") != null && sessionStorage.getItem("paperPrice") != null) {
			userId = sessionStorage.getItem("userId");
            userName = sessionStorage.getItem("userName");
            userMobileNo = sessionStorage.getItem("userMobileNo");
            userAddress = sessionStorage.getItem("userAddress");
            city = sessionStorage.getItem("city");
            areaName = sessionStorage.getItem("areaName");
            paperName = sessionStorage.getItem("paperName");
            paperPrice = sessionStorage.getItem("paperPrice");
			imFrom = sessionStorage.getItem("imFrom");
			
			
			if(imFrom == "Add"){
				
				var url = env+"?method=getPriviosBalance&format=json&userId="+userId+"";
				$.getJSON(url, function(response) {
					if($.isArray(response.showBillListResponse) && response.showBillListResponse.length) {			
						$.each(response.showBillListResponse, function(i, billList) {
							prevBalance = billList.balance;		
							$("#txtPrevBalance").html(prevBalance);			
							totalBillWithPrevBalance = parseInt(prevBalance) + parseInt(currentMonthBill);			
							$("#txtTotal").html(totalBillWithPrevBalance);										
						});
					}
					else {
						prevBalance = 0;
						totalBillWithPrevBalance = parseInt(prevBalance) + parseInt(currentMonthBill);
						$("#txtPrevBalance").html(prevBalance);	
						$("#txtTotal").html(totalBillWithPrevBalance);											
						
					}
				});			
			
				monthlyBill = noOfDays * paperPrice;
				currentMonthBill = monthlyBill + deliveryCharges;
				totalBillWithPrevBalance = parseInt(prevBalance) + parseInt(currentMonthBill);
			}
			else if(imFrom == "Update"){
				
				$("#txtPaidAmountTr").show();
				$("#txtBalanceTr").show();
				
				billId = sessionStorage.getItem("billId");
				noOfDays = sessionStorage.getItem("noOfDays");
				deliveryCharges = sessionStorage.getItem("deliveryCharges");
				currentMonthBill = sessionStorage.getItem("currentMonthBill");
				prevBalance = sessionStorage.getItem("prevBalance");
				totalBillWithPrevBalance = sessionStorage.getItem("totalBillWithPrevBalance");
																				
			}	
				
			$("#txtName").html(userName);
			$("#txtMobileNo").html(userMobileNo);			
			$("#txtAddress").html(userAddress);
			$("#txtArea").html(areaName);
			$("#txtCity").html(city);	
			$("#txtPaperName").html(paperName);		
			$("#txtPaperPrice").html(paperPrice);
			$("#txtbillOfMonth").html(monthName + '  ' + year);		
			$("#txtDays").html(noOfDays);			
			$("#txtDeliveryCharges").html(deliveryCharges);			
			$("#txtMonthlyBill").html(monthlyBill);			
			$("#txtCurrentMonthBill").html(currentMonthBill);				
			$("#txtTotal").html(totalBillWithPrevBalance);
						
	}
	
	$('#btnCalculate').click(function(){
		noOfDays = $("#txtDays").val();		
		deliveryCharges = $("#txtDeliveryCharges").val();		
		
		monthlyBill = noOfDays * paperPrice;		
		currentMonthBill = parseInt(monthlyBill) + parseInt(deliveryCharges);
		totalBillWithPrevBalance = parseInt(prevBalance) + parseInt(currentMonthBill);
		
		$("#txtMonthlyBill").html(monthlyBill);		
		$("#txtCurrentMonthBill").html(currentMonthBill);	
		$("#txtTotal").html(totalBillWithPrevBalance);	

			if(imFrom == "Update"){
				
				var paidAmount = $("#txtPaidAmount").val();
				var balance = totalBillWithPrevBalance - parseInt(paidAmount);
				$("#txtBalance").html(balance);
																				
			}	
						
			
		$("#btnSubmit").show();
		
		
	});
	
	$('#btnSubmit').click(function(){
		
		if(imFrom == "Add"){
			var data={
				"userId" : userId,			
				"paperName" : paperName,
				"paperPrice" : paperPrice,		
				"monthName" : monthName,
				"year" : year,
				"noOfDays" : noOfDays,				
				"deliveryCharges" : deliveryCharges,				
				"monthlyBill" : monthlyBill,
				"currentMonthBill" : currentMonthBill,
				"prevBalance" : prevBalance,
				"totalBillWithPrevBalance" : totalBillWithPrevBalance,						
				"method"  : "saveUserBill",
				"format" : "json"
			};
		}else
		{
			var data={
				"billId" : billId,				
				"noOfDays" : noOfDays,				
				"deliveryCharges" : deliveryCharges,				
				"monthlyBill" : monthlyBill,
				"currentMonthBill" : currentMonthBill,
				"prevBalance" : prevBalance,
				"totalBillWithPrevBalance" : totalBillWithPrevBalance,						
				"paidAmount" : paidAmount,						
				"balance" : balance,						
				"method"  : "UpdateUserBill",
				"format" : "json"
			};
				
		}
			
			
			var env = environment.getEnv();
			
			$.ajax({
				type: "POST",
				url: env,
				async:false,
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8",
				success: function (response) {
					if(response.saveBillDetailsRespons==="BILL_DETAILS_SAVED") {
						
						if(imFrom == "Add"){
							alert('Bill is successfully Saved!');											
						}else{
							alert('Bill is successfully Updated');	
						}
					  
						
						$("#btnPrint").show();
						var billId = "101";
					
						sessionStorage.setItem("billId",billId);
						sessionStorage.setItem("userName",userName);
						sessionStorage.setItem("currentMonthBill",currentMonthBill);
						sessionStorage.setItem("prevBalance",prevBalance);
						sessionStorage.setItem("totalBillWithPrevBalance",totalBillWithPrevBalance);
						
					}
					else if(response.saveBillDetailsRespons==="Already_Added") {
					  alert('Bill is already added for this month!');										
					}
					else {
						if(imFrom == "Add"){
							 alert('Bill is not saved! Please try again.');									
						}else{
							 alert('Bill is not updated! Please try again.');
						}
					  
					 
					}
				},
				error: function (textStatus, errorThrown) {
					alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
				}
			});
			// $.post(""+env+"",data)
			// .done(function (response){
				// if(response.saveBillDetailsRespons==="BILL_DETAILS_SAVED") {
				  // alert('Bill is successfully Saved!');
						  
				// }
				// else {
				  // alert('Bill is not saved! Please try again.');
				// }
			// })
			// .fail(function(){
				// alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			// });
		
	});
	
	
});


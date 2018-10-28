// if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	// sessionStorage.setItem("url",document.URL);
	// window.location.href="login.html";
// }



$(function() {	

	
	var userNameArray = new Array();
	var userIdArray = new Array();
	var billNoArray = new Array();
	
	var billList;
	
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
			$(".abc").html("");
			
			$.each(response.showBillListResponse, function(i, billList) {
				
				billNoArray.push(billList.billId);
				
				addList(billList);	
				PrintAll(billList);	
					
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
						PrintAll(billList);							
								
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
			
			//monthWiseBills(month); monthName
			var url = env+"?method=MonthWiseBillList&format=json&monthName="+month+"";
			$("#listOBills tbody").html("");
			$.getJSON(url, function(response) {
				if($.isArray(response.showBillListResponse) && response.showBillListResponse.length) {
					$.each(response.showBillListResponse, function(i, billList) {	

						billNoArray.push(billList.billId);					
						addList(billList);
						PrintAll(billList);							
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
						PrintAll(billList);							
					});
				}
				else {
					alert("Month wise bill list is not available in the database!");
				}
			});
		}
	});
});

function PrintAll(billList) {
	
	//$("#printData tbody").html("");
	
	 var billId = billList.billId;
	 var userName = billList.userName;
	 var currentMonthBill = billList.currentMonthBill;
	 var prevBalance = billList.prevBalance;
	 var totalBillWithPrevBalance = billList.totalBillWithPrevBalance;

		var newRow2 =  '<table style="width:49.7%;float:left;margin-bottom: 5px;"> <thead>'+
		'<tr>'+
							'<th colspan="12">'+
                                            '<div class="logo">'+
                                                '<div>'+
												
													'<img src="images/ganesha.jpg" style="height: 70px;width: 49px;">'+                                                  
                                                '</div>'+
                                            '</div>'+
                                            '<div class="events">'+
                                                '<div>'+
                                                    '<p class="hederData" style="  margin: -0px 0px 6px 0px;font-size: 12px;">|| श्रीं  गणेशाय  नमः ||   || जय  मातादी ||</p>'+
                                                '</div>'+
                                                '<div>'+
                                                    '<p style=""><span class="hederHeading" style="font-size:17px !important">गणेश न्यूज  एजन्सी </span></p>'+
                                                '</div>'+
                                                '<div>'+
                                                    '<p class="hederData">डॉ  बाबा साहेब  चौक  नांदगाव  जि  नाशिक </p>'+
                                                '</div>'+
                                                '<div>'+
                                                    '<p class="hederData">प्रो  प्रा  बी  एम आलमचंदानी </p>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="ScndLogo">'+
                                                '<div>'+
                                                    '<p class="rightData" style=" margin: -0px 0px 0px 0px;font-size: 12px;">मो . 8149335303</p>'+
                                                '</div>'+
                                                '<div style="text-align:center !important;">'+
													'<img src="images/saraswati.jpg" style="height: 66px;width: 49px;">'+	                                                   
                                                '</div>'+
                                            '</div>'+
                                        '</th>'+
                                    '</tr>'+
									'</thead>'+
									'<tbody>'+
									'<tr>'+
                                        '<th colspan="12">'+
                                            '<div class="number">'+
                                                '<div class="HeadinPart">'+
                                                    '<p class="numHeading">नंबर.</p>'+
                                                '</div>'+
                                                '<div class="ColonMain">'+
                                                    '<p class="numColon">:</p>'+
                                                '</div>'+
                                                '<div class="Datamain">'+
                                                    '<p id="txtBillId" class="mainData">'+billId+'</p>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="number">'+
                                                '<div class="HeadinPart">'+
                                                    '<p class="numHeading">दिनांक</p>'+
                                                '</div>'+
                                                '<div class="ColonMain">'+
                                                    '<p class="numColon">:</p>'+
                                                '</div>'+
                                                '<div class="Datamain">'+
                                                    '<p class="mainData"><span><span style="visibility:hidden;">101</span>  /   <span style="visibility:hidden;">101</span>   / 20</span></p>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="ShriNamemain">'+
                                                '<div class="ShriName">'+
                                                    '<p class="ShriNameData">श्री /रा. रा .</p>'+
                                                '</div>'+
                                                '<div class="ShriNamecol">'+
                                                    '<p class="ShriNamecolon">:</p>'+
                                                '</div>'+
                                                '<div class="ShriNameDt">'+
                                                    '<p id="txtUserName" class="ShriNameuser">'+userName+'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</th>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<th colspan="9">'+
                                            '<div class="pratache">'+
                                                '<p class="pratacheHd"><span class="Nawpratache">वृतपत्राचे  नाव </span></p>'+
                                            '</div>'+
                                            '<div class="DeatilMain">'+
                                                '<p class="detailHeading">गावकरी / देशदूत / सकाळ / लोकमत /जनश्रद्धा / महाराष्ट्र टाइम्स / लोकसत्ता / सामना / सम्राट / नवभारत टाइम्स  / पुण्यनगरी / वार्ताहर  / बिजनेस  / नवाकाळ  / पुढारी / यशोभुमी / आग्रोवन / मुंबई चौफेर / उर्दू  सहारा / संध्यानंद  / दिव्यमराठी / Indian Express / The Times Of India / Economics Times</p>'+
                                            '</div>'+
                                        '</th>'+
                                        '<th colspan="2"><span style="visibility:hidden;">गावकरी / देशदूत / सकाळ /</span> </th>'+
                                        '<th colspan="2"><span style="visibility:hidden;">गावकरी / देशदूत / सकाळ</span> </th>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<th colspan="9" rowspan="3" style="padding:0px;">'+
                                            '<div style="padding:2px 5px;">'+
                                                '<div class="rupeeSec">'+
                                                    '<p class="userName">पैसे जमा करणाऱ्याचे नाव  </p>'+
                                                '</div>'+
                                                '<div class="rupeeSeccol">'+
                                                    '<p class="rscolon">:</p>'+
                                                '</div>'+
                                                '<div class="rupeeSecdt">'+
                                                    '<p class="rupeeSecdata"></p>'+
                                                '</div>'+

                                                '<div class="correct">'+
                                                    '<p class="correctData">सही </p>'+
                                                '</div>	'+
                                                '<div class="DateSection">'+
                                                    '<p class="correctData">पैसे जमा करण्याची  तारिख  : <span><span style="visibility:hidden;">10</span>  /   <span style="visibility:hidden;">10</span>   / 20</span></p>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="topbrd1"></div>'+
                                            '<div class="topbrd2"></div>'+
                                            '<div class="rateHeading">'+
                                                '<p class="rateHeadingData"><span class="rathed">वृत्तपत्र  व्यवसायाचे  ७६  वे  वर्ष </span></p>'+
                                            '</div>'+
                                            '<div style="padding:2px 5px;">'+
                                                '<div class="ratesection">'+
                                                    '<p class="rateData">दर महिन्याला पैसे  जमा करणे चांगल्या  व्यवहाराचे  लक्षण  आहे .</p>'+
                                                    '<p class="rateData">फर्म :-   प्यारिस  वॉच  कं. अँड  ऑप्टिकल्स,  म.  फुले चौक,  नांदगाव .</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</th>'+
                                        '<th colspan="2" style="font-size: 12px;">चालू बिल - </th>'+
                                        '<th colspan="2" id="txtCurrentAmount" style="font-size: 12px;">'+currentMonthBill+'</th>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<th colspan="2" style="font-size: 12px;">मागील बाकी  - </th>'+
                                        '<th colspan="2" id="txtpreviouBalance" style="font-size: 12px;">'+prevBalance+'</th>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<th colspan="2" style="font-size: 12px;">एकुण बिल -  </th>'+
                                        '<th colspan="2" id="txtTotalAmount" style="font-size: 12px;">'+totalBillWithPrevBalance+'</th>'+
                                    '</tr>'+
									'</tbody>'+
									'</table>';				

		//$(newRow2).appendTo("#printData thead");	
		$(newRow2).appendTo(".abc");
	
				
}

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


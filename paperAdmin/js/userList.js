// if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	// sessionStorage.setItem("url",document.URL);
	// window.location.href="login.html";
// }

$(function() {
	
	var userNameArray = new Array();
	var userIdArray = new Array();
	
	var areaNameArray = new Array();
	var areaIdArray = new Array();
	
	var env = environment.getEnv();
	
	var url = env+"?method=AllUserList&format=json";
	$("#listOfuser tbody").html("");
	
	$.getJSON(url, function(response) {
		if($.isArray(response.showUserListResponse) && response.showUserListResponse.length) {
			
			var headRow = '<th style="text-align:center">User Name</th>'+
			'<th style="text-align:center">Mobile No</th>'+
			'<th style="text-align:center">Adddress</th>'+
			'<th style="text-align:center">Area Name</th>'+
			'<th style="text-align:center">City</th>'+
			'<th style="text-align:center">Paper Name</th>'+				
			'<th style="text-align:center">Paper Price</th>'+				
			'<th style="text-align:center">Generate Bill</th>'+				
			'<th style="text-align:center">Update User</th>'+				
			'<th style="text-align:center">Delete User</th>';
			
			$(headRow).appendTo("#listOfuser thead");
			$.each(response.showUserListResponse, function(i, userList) {
				userNameArray.push(userList.userName);
				userIdArray.push(userList.userId);	
				addList(userList);
										
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
	
	$( "#txtUserName" ).autocomplete({ 
		source: userNameArray,
		select: function (event, ui) {
			var index = userNameArray.indexOf(ui.item.value);
			var userId = userIdArray[index];
			  		
			var url = env+"?method=UserWiseDetails&format=json&userId="+userId+"";
			$("#listOfuser tbody").html("");
			$.getJSON(url, function(response) {
				if($.isArray(response.showUserListResponse) && response.showUserListResponse.length) {
							
					$.each(response.showUserListResponse, function(i, userList) {						
					
						addList(userList);	
						
					});
				}
				else {
					alert("User is not available in  this area!");
				}
			});
			
		}
	});
	
	$( "#txtAreaName" ).autocomplete({ 
		source: areaNameArray,
		select: function (event, ui) {
			var index = areaNameArray.indexOf(ui.item.value);
			var areaId = areaIdArray[index];
					
			var url = env+"?method=AreaWiseUserList&format=json&areaId="+areaId+"";
			$("#listOfuser tbody").html("");
			$.getJSON(url, function(response) {
				if($.isArray(response.showUserListResponse) && response.showUserListResponse.length) {
					
				
					$.each(response.showUserListResponse, function(i, userList) {
						
						addList(userList);										
					});
				}
				else {
					alert("User is not available in  this area!");
				}
			});	
		}
	});
});

function addList(userList) {
		var newRow = "<tr>" + 
				//userId,userName,userMobileNo,userAddress,areaName,city,paperName,paperPrice
				'<td align="center" style="padding:5px">' + userList.userName + '</td>' + 
				'<td align="center" style="padding:5px">' + userList.userMobileNo + '</td>' + 
				'<td align="center" style="padding:5px">' + userList.userAddress + '</td>' + 
				'<td align="center" style="padding:5px">' + userList.areaName + '</td>' + 
				'<td align="center" style="padding:5px">' + userList.city + '</td>' + 
				'<td align="center" style="padding:5px">' + userList.paperName + '</td>' + 
				'<td align="center" style="padding:5px">' + userList.paperPrice + '</td>' + 
				
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'generateBill( \""+userList.userId+"\",\""+userList.userName+"\",\""+userList.userMobileNo+"\",\""+userList.userAddress+"\",\""+userList.areaName+"\",\""+userList.areaId+"\",\""+userList.city+"\",\""+userList.paperName+"\",\""+userList.paperId+"\",\""+userList.paperPrice+"\", event, this)\'>Generate</button>" + '</td>' +				
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'updateuser( \""+userList.userId+"\",\""+userList.userName+"\",\""+userList.userMobileNo+"\",\""+userList.userAddress+"\",\""+userList.areaName+"\",\""+userList.areaId+"\",\""+userList.city+"\",\""+userList.paperName+"\",\""+userList.paperId+"\",\""+userList.paperPrice+"\", event, this)\'>Update</button>" + '</td>' +																
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'deleteuser(\""+userList.userName+"\", \""+userList.userId+"\", event, this)\'>Delete</button>" + '</td>'
				"</tr>"; 
				$(newRow).appendTo("#listOfuser tbody");
	
}

function generateBill(userId,userName,userMobileNo,userAddress,areaName,areaId,city,paperName,paperId,paperPrice,event, delrow) {
	var imFrom = "Add";
	sessionStorage.setItem("imFrom",imFrom);
	sessionStorage.setItem("userId",userId);
    sessionStorage.setItem("userName",userName);
    sessionStorage.setItem("userMobileNo",userMobileNo);
    sessionStorage.setItem("userAddress",userAddress);
    sessionStorage.setItem("areaName",areaName);
    sessionStorage.setItem("city",city);
    sessionStorage.setItem("paperName",paperName);
    sessionStorage.setItem("paperPrice",paperPrice);
    sessionStorage.setItem("areaId",areaId);
    sessionStorage.setItem("paperId",paperId);
	
	window.location.href = "GenerateBill.html";
	
}
function updateuser(userId,userName,userMobileNo,userAddress,areaName,areaId,city,paperName,paperId,paperPrice,event, delrow) {
	var imFrom = "Update";
	sessionStorage.setItem("imFrom",imFrom);
	sessionStorage.setItem("userId",userId);
    sessionStorage.setItem("userName",userName);
    sessionStorage.setItem("userMobileNo",userMobileNo);
    sessionStorage.setItem("userAddress",userAddress);
    sessionStorage.setItem("areaName",areaName);
    sessionStorage.setItem("city",city);
    sessionStorage.setItem("paperName",paperName);
    sessionStorage.setItem("paperPrice",paperPrice);
    sessionStorage.setItem("areaId",areaId);
    sessionStorage.setItem("paperId",paperId);
	
	window.location.href = "AddUserDetails.html";
	
}

function deleteuser(userName, userId, event, delrow) {
		var env = environment.getEnv();
		var data = {
			"userName" : userName,
			"userId" : userId,
			"method" : 'deleteUser',
			"format" : 'json'
		};	
		$.ajax({
				type: "POST",
				url: env,
				async:false,
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8",
				success: function (response) {
					if(response.saveUserDetailsRespons==="User_Deleted") {
							
						alert('User is deleted successfully');
						$(delrow).parent().parent().remove();						
					  //window.location.href = "AreaList.html";
					}				
					else {
					  alert('User is not deleted! Please try again.');
					}
				},
				error: function (textStatus, errorThrown) {
					alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
				}
			});
}
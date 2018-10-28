// if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	// sessionStorage.setItem("url",document.URL);
	// window.location.href="login.html";
// }

$(function() {
	var env = environment.getEnv();
	var url = env+"?method=AreaList&format=json";
	$("#listOfAreas tbody").html("");
	
	$.getJSON(url, function(response) {
		if($.isArray(response.showAreaListResponse) && response.showAreaListResponse.length) {
			var headRow ='<th style="text-align:center">Area Name</th>'+
						'<th style="text-align:center">Update Area</th>'+
						'<th style="text-align:center">Delete Area</th>';
			
			$(headRow).appendTo("#listOfAreas thead");
			$.each(response.showAreaListResponse, function(i, areaList) {
				
				var newRow = "<tr>" + 
				
				'<td align="center" style="padding:5px">' + areaList.areaName + '</td>' + 				
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'updateArea(\""+areaList.areaName+"\", \""+areaList.areaId+"\", event, this)\'>Update</button>" + '</td>' +				
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'deleteArea(\""+areaList.areaName+"\", \""+areaList.areaId+"\", event, this)\'>Delete</button>" + '</td>'
				"</tr>"; 
				$(newRow).appendTo("#listOfAreas tbody");
			});
		}
		else {
			alert("Area list is not available in the database!");
		}
	});
});

	function updateArea(areaName,areaId, event, delrow) {
		var imFrom = "Update";
		sessionStorage.setItem("imFrom",imFrom);		
		sessionStorage.setItem("areaId",areaId);
		sessionStorage.setItem("areaName",areaName);
		
		window.location.href = "AddArea.html";
	}

function deleteArea(areaName, areaId, event, delrow) {
		var env = environment.getEnv();
		var data = {
			"areaName" : areaName,
			"areaId" : areaId,
			"method" : 'deleteAreaDetails',
			"format" : 'json'
		};
	
		$.ajax({
				type: "POST",
				url: env,
				async:false,
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8",
				success: function (response) {
					if(response.saveAreaDetailsResponse==="Area_Deleted") {
							
						alert('Area is deleted successfully');
						$(delrow).parent().parent().remove();						
					  //window.location.href = "AreaList.html";
					}					
					else {
					  alert('Area details is not added! Please try again.');
					}
				},
				error: function (textStatus, errorThrown) {
					alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
				}
			});
}
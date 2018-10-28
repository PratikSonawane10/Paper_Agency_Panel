// if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	// sessionStorage.setItem("url",document.URL);
	// window.location.href="login.html";
// }

$(function() {
	var env = environment.getEnv();
	var url = env+"?method=PaperList&format=json";
	$("#listOfPaper tbody").html("");
	$.getJSON(url, function(response) {
		if($.isArray(response.showPaperListResponse) && response.showPaperListResponse.length) {
			var headRow = '<th style="text-align:center">Paper Name</th>'+
				'<th style="text-align:center">Paper Price</th>'+
				'<th style="text-align:center">Update Paper</th>'+
				'<th style="text-align:center">Delete Paper</th>';
			
			$(headRow).appendTo("#listOfPaper thead");
			$.each(response.showPaperListResponse, function(i, paperList) {
				
				var newRow = "<tr>" + 
				
				'<td align="center" style="padding:5px">' + paperList.paperName + '</td>' + 
				'<td align="center" style="padding:5px">' + paperList.paperPrice + '</td>' + 
				
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'updatePaper(\""+paperList.paperName+"\",\""+paperList.paperId+"\", \""+paperList.paperPrice+"\", event, this)\'>Update</button>" + '</td>' +
				
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'deletePaper(\""+paperList.paperName+"\", \""+paperList.paperId+"\", event, this)\'>Delete</button>" + '</td>'
				"</tr>"; 
				$(newRow).appendTo("#listOfPaper tbody");
			});
		}
		else {
			alert("Paper list is not available in the database!");
		}
	});
});

function updatePaper(paperName,paperId,paperPrice, event, delrow) {
	var imFrom = "Update";
		sessionStorage.setItem("imFrom",imFrom);		
		sessionStorage.setItem("paperName",paperName);
		sessionStorage.setItem("paperId",paperId);
		sessionStorage.setItem("paperPrice",paperPrice);
		
		window.location.href = "AddPaperDetails.html";
}

function deletePaper(paperName, paperId, event, delrow) {
	var env = environment.getEnv();
	var data = {
		"paperName" : paperName,
		"paperId" : paperId,
		"method" : 'deletePaper',
		"format" : 'json'
	};
	$.ajax({
				type: "POST",
				url: env,
				async:false,
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8",
				success: function (response) {
					if(response.savePaperDetailsResponse==="Paper_Deleted") {
							
						alert('Paper is deleted successfully');
						$(delrow).parent().parent().remove();						
					  //window.location.href = "AreaList.html";
					}				
					else {
					  alert('Paper is not deleted! Please try again.');
					}
				},
				error: function (textStatus, errorThrown) {
					alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
				}
			});
}
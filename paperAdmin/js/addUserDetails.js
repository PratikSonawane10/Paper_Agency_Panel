$(function (){
	

	
	var areaName = "";
	var paperName = "";
	var paperId="";
	var areaId="";
	
	var userId = "";
	var userName = "";
	var userMobileNo = "";		
	var userAddress = "";	
	var city = "";
	var paperPrice="";
	
	var userFullName = "";
	var userMobileNo = "";
		
	var userAddress = "";	
	var city = "";
	var imFrom = "Add";
	
	
	
	if (sessionStorage.getItem("userId") != null && sessionStorage.getItem("userName") != null && sessionStorage.getItem("userMobileNo") != null && sessionStorage.getItem("userAddress") != null && sessionStorage.getItem("city") != null && sessionStorage.getItem("areaName") != null && sessionStorage.getItem("paperName") != null && sessionStorage.getItem("paperPrice") != null) {
			userId = sessionStorage.getItem("userId");
            userName = sessionStorage.getItem("userName");
            userMobileNo = sessionStorage.getItem("userMobileNo");
            userAddress = sessionStorage.getItem("userAddress");
            city = sessionStorage.getItem("city");
            areaName = sessionStorage.getItem("areaName");
            paperName = sessionStorage.getItem("paperName");
            paperPrice = sessionStorage.getItem("paperPrice");
            areaId = sessionStorage.getItem("areaId");
            paperId = sessionStorage.getItem("paperId");
            imFrom = sessionStorage.getItem("imFrom");
			
			$("#txtuserFullName").val(userName);
			$("#txtuserMobileNo").val(userMobileNo);			
			$("#txtuserAddress").val(userAddress);
			$("#txtcity").val(city);						
			
			var select = document.getElementById("selectArea");
			var option = document.createElement('option');
			option.text = areaName;
			option.value = areaId;
			select.add(option);
						
			var select = document.getElementById("selectPaper");
			var option = document.createElement('option');
			option.text = paperName;
			option.value = paperId;
			select.add(option);
									
			sessionStorage.clear();			
	}
	
	var env = environment.getEnv();
	var url = env+"?method=AreaList&format=json";
	
	$.get(""+env+"?method=AreaList&format=json")
	.done(function (response){
		var select = document.getElementById("selectArea");
		$.each(response.showAreaListResponse,function (index,loadAreas){
			var loadAreasObj = loadAreas;
			var userArea = loadAreas.areaName
			var idOfArea = loadAreas.areaId
			var option = document.createElement('option');
			option.text = userArea;
			option.value = idOfArea;
			select.add(option);
		});
	})
	.fail(function (){
		alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
	});

	$("#selectArea").on("change",function(){
		
		areaName = $("#selectArea").find("option:selected").text();
		areaId = $("#selectArea").val();
		// alert("Selected Text: " + areaName + " Value: " + areaId);
	});
	
	$.get(""+env+"?method=PaperList&format=json")
	.done(function (response){
		var select = document.getElementById("selectPaper");
		$.each(response.showPaperListResponse,function (index,loadPaper){
			var loadPaperObj=loadPaper;
			var paper=loadPaper.paperName;
			var idOfPaper = loadPaper.paperId;
			var option = document.createElement('option');
			
			option.text = paper;			
			option.value = idOfPaper;
			select.add(option);
		});
	})
	.fail(function (){
		alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
	});

	$("#selectPaper").on("change",function(){
		
		 paperName = $("#selectPaper").find("option:selected").text();
		paperId = $("#selectPaper").val();
		//alert("Selected Text: " + paperName + " Value: " + paperId);
	});

	

	jQuery.validator.setDefaults({
    debug: true,      //Avoids form submit. Comment when in production.
    success: "valid",
    submitHandler: function() {

			userFullName = $("#txtuserFullName").val();
			userMobileNo = $("#txtuserMobileNo").val();	
			userAddress = $("#txtuserAddress").val();
			city = $("#txtcity").val();
			
			if(imFrom == "Add"){				
				var data={
					"areaName" : areaName,
					"paperName" : paperName,
					"areaId" : areaId,
					"paperId" : paperId,				
					"userFullName" : userFullName,
					"userMobileNo" : userMobileNo,	
					"userAddress" : userAddress,		
					"city" : city,
					
					"method"  : "saveUserDetails",
					"format" : "json"
				};
			}else{
				
				var data={
					"userId" : userId,
					"areaName" : areaName,
					"paperName" : paperName,
					"areaId" : areaId,
					"paperId" : paperId,				
					"userFullName" : userFullName,
					"userMobileNo" : userMobileNo,	
					"userAddress" : userAddress,		
					"city" : city,
					
					"method"  : "updateUserDetails",
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
					if(response.saveUserDetailsRespons==="USER_DETAILS_SAVED") {
						if(imFrom == "Add"){	
							alert('User details is successfully added!');
						}
						else{
							 alert('User details is successfully Updated!');
						}					 
					  window.location.href = "UserList.html";
					}
					else if(response.saveUserDetailsRespons==="Already_Registered") {
					  alert('User details is Already Added!');				  
					}
					else {
					  alert('User details is not added! Please try again.');
					}
				},
				error: function (textStatus, errorThrown) {
					alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
				}
			});
			
			// $.post(""+env+"",data)
			// .done(function (response){
				// if(response.saveUserDetailsRespons==="USER_DETAILS_SAVED") {
				  // alert('User details is successfully added!');
				  // window.location.href = "UserList.html";
				// }
				// else {
				  // alert('User details is not added! Please try again.');
				// }
			// })
			// .fail(function(){
				// alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			// });
		}
	});

	$("#userDetailsForm").validate({
     rules: {
        selectArea: {
           required: true,
        },
        selectPaper: {
           required: true,
        }, 
		userFullName: {
           required: true,
        },
        userMobileNo: {
           required: true,
        },
		 userAddress: {
           required: true,
        },
        city: {
           required: true,
        }
     },
     messages: {
        selectArea: {
           required: "Please select area!",
        },
        selectPaper: {
           required: "Please select paper!",
        },
		userFullName: {
           required: "Please enter users full name!",
        },
		userMobileNo: {
           required: "Please enter mobile no!",
        },
		userAddress: {
           required: "Please enter address!",
        },
		city: {
           required: "Please enter city!",
        },
      },
			errorPlacement: function(error, element) {
				if (element.attr('type') === 'radio') {
					error.insertBefore(element);
				}
				else {
					error.insertAfter(element);
				}
	    }
  });

  function getDate() {
    var currentdate = new Date();
    var year    = currentdate.getFullYear();
    var month   = currentdate.getMonth()+1;
    var day     = currentdate.getDate();
    var hour    = currentdate.getHours();
    var minute  = currentdate.getMinutes();
    var second  = currentdate.getSeconds();
    if(month.toString().length == 1) {
      var month = '0' + month;
    }
    if(day.toString().length == 1) {
        var day = '0' + day;
    }
    if(hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if(second.toString().length == 1) {
        var second = '0' + second;
    }
    var datetime = year + "" + month + "" + day + "_" + hour + "" + minute + "" + second;
    return datetime;
  }
});

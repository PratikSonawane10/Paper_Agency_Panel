$(function (){

	var areaName = "";
	var areaId="";
	var imFrom = "Add";

	if (sessionStorage.getItem("areaName") != null && sessionStorage.getItem("areaId") != null ) {
	
            areaName = sessionStorage.getItem("areaName");
            areaId = sessionStorage.getItem("areaId");
            imFrom = sessionStorage.getItem("imFrom");
			
			$("#txtareaName").val(areaName);						
						
			sessionStorage.clear();			
	}
	
	jQuery.validator.setDefaults({
    debug: true,      //Avoids form submit. Comment when in production.
    success: "valid",
    submitHandler: function() {	
		areaName = $("#txtareaName").val();  
			if(imFrom == "Add"){	
				var data = {
					"areaName" : areaName,						
					"method"  : "saveAreaDetails",
					"format" : "json"
				};
			}else{
				var data = {
					"areaId" : areaId,						
					"areaName" : areaName,						
					"method"  : "updateAreaDetails",
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
					if(response.saveAreaDetailsResponse==="AREA_DETAILS_SAVED") {
					  if(imFrom == "Add"){	
							alert('Area is successfully added!');
						}
						else{
							 alert('Area is successfully Updated!');
						}	
					  					
					  window.location.href = "AreaList.html";
					}
					else if(response.saveAreaDetailsResponse==="Already_Added") {
					  alert('Area is Already Added!');					  
					}
					else {
					  alert('Area is not added! Please try again.');
					}
				},
				error: function (textStatus, errorThrown) {
					alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
				}
			});
			
			// $.post(""+env+"",data)
			// .done(function (response){
				// if(response.saveAreaDetailsResponse==="AREA_DETAILS_SAVED") {
				  // alert('Area is successfully added!');
				  // window.location.href = "AreaList.html";
				// }
				// else {
				  // alert('Area is not added! Please try again.');
				// }
			// })
			// .fail(function(){
				// alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			// });
		}
	});

	$("#areaDetailsForm").validate({
     rules: {
        areaName: {
           required: true,
        }
        
     },
     messages: {
        areaName: {
           required: "Please provide Area name!",
        }
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

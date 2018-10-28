$(function (){


	var paperName = "";
	var paperPrice = "";
	var paperId = "";

	var imFrom = "Add";

	if (sessionStorage.getItem("paperName") != null && sessionStorage.getItem("paperId") != null && sessionStorage.getItem("paperPrice") != null ) {
	
            paperName = sessionStorage.getItem("paperName");
            paperId = sessionStorage.getItem("paperId");
            paperPrice = sessionStorage.getItem("paperPrice");
            imFrom = sessionStorage.getItem("imFrom");
			
			$("#txtpaperName").val(paperName);						
			$("#txtpaperPrice").val(paperPrice);						
						
			sessionStorage.clear();			
	}
	

	jQuery.validator.setDefaults({
    debug: true,      //Avoids form submit. Comment when in production.
    success: "valid",
    submitHandler: function() {

			
      paperName = $("#txtpaperName").val();
      paperPrice = $("#txtpaperPrice").val();
     
			if(imFrom == "Add"){	
				var data={
					"paperName" : paperName,
					"paperPrice" : paperPrice,				
					"method"  : "savePaperDetails",
					"format" : "json"
				};
			}else{
				var data={
					"paperId" : paperId,
					"paperName" : paperName,
					"paperPrice" : paperPrice,				
					"method"  : "updatePaperDetails",
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
					if(response.savePaperDetailsResponse==="PAPER_DETAILS_SAVED") {
						
						if(imFrom == "Add"){	
							alert('Paper is successfully added!');
						}
						else{
							 alert('Paper is successfully Updated!');
						}
												
						window.location.href = "PaperList.html";
					}
					else if(response.savePaperDetailsResponse==="Already_Added") {
					  alert('Paper is Already Added!');					  
					}
					else {
						alert('Paper is not added! Please try again.');
					}
				},
				error: function (textStatus, errorThrown) {
					alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
				}
			});
			/*$.post(""+env+"",data, 'json')
			.done(function (response){
				if(response.savePaperDetailsResponse==="PAPER_DETAILS_SAVED") {
				  alert('Paper is successfully added!');
				  window.location.href = "PaperList.html";
				}
				else {
				  alert('Paper is not added! Please try again.');
				}
			})
			.fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});*/
		}
	});

	$("#paperDetailsForm").validate({
     rules: {
        paperName: {
           required: true,
        },
        paperPrice: {
           required: true,
        }
     },
     messages: {
        paperName: {
           required: "Please provide paper name!",
        },
        clinicAddress: {
           paperPrice: "Please provide paper price!",
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

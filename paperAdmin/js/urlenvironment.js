var environment = (function() {
	function setEnv(){
		//var env = "http://petoandme.com/API/api/petappapi.php"
		//var env = "http://localhost/Paper_agency/paperAPI/api/paper.php";
		var env = "http://192.168.0.102/Paper_agency/paperAPI/api/paper.php";
		return env;
	}
	function setImageEnv() {
		var env = "http://petoandme.com/API/"
		return env;
	}
	return {
		getImageEnv : setImageEnv,
		getEnv : setEnv
	}
})()

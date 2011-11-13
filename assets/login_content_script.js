chrome.extension.sendRequest({command: "getSelectedAccount"}, function(response) {
	if (response) {
		console.log(response);
		
		$('#loginname').val(response.loginname);
		$('#password').val(response.password);
		$("#login_submit_btn").click();
	}
});
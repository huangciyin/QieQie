chrome.extension.sendRequest({
	command : "getSelectedAccount"
}, function(response) {
	if (response && response.loginname) {
		$('<div />').html('正在登录....某些奇怪的情况下此页面会无法正常跳转，请点击登录按钮！').css({
			'position' : 'absolute',
			'top' : 0,
			'right' : 0,
			'background' : ' #fff6bf',
			'color' : '#514721',
			'border' : '1px solid #ffd324',
			'padding' : '0.8em',
		}).appendTo($('body'));

		$('#loginname').focus();
		$('#loginname').val(response.loginname);
		$('#password').focus();
		$('#password').val(response.password);
		$("#login_submit_btn").click();
	}
});
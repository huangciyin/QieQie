chrome.extension.sendRequest({
	command : "getSelectedAccount"
}, function(response) {
	console.log(response);
	if (response && response.account.username) {
		$('<div />').html('正在登录....如页面长时间不跳转，请点击登录按钮！').css({
			'position' : 'absolute',
			'top' : 0,
			'right' : 0,
			'background' : ' #fff6bf',
			'color' : '#514721',
			'border' : '1px solid #ffd324',
			'padding' : '0.8em',
		}).appendTo($('body'));
		
		var username = response.account.username;
		var password = response.account.password;
		
		eval(response.site.loginScript);

	}
});



$(function(){
	
	var accounts = JSON.parse(localStorage.getItem('accounts')) || [];
	
	if (accounts.length == 0) {
		$('#accounts').html('<div style="color:red;">请先设置网站帐号！</div>');
	} else {
		$.each(accounts, function(i, account) {
			$('<li />').data('account', account).html( '新浪微博 - ' + account.loginname).appendTo($('#accounts'));
		});
	}
	
	$("#accounts li").click(function(){
		
		var account = $(this).data('account');
		localStorage.setItem('toAccount', JSON.stringify(account));
		
		_gaq.push(['_trackEvent', 'Sites', 'Qie', 'Qie to ' + account.site + '.']);
		
		$.getScript('http://weibo.com/logout.php', function(){
			chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.update(tab.id, {url:'http://weibo.com'});
				window.close();
			});
		});
		
	});
	
	$("#options").click(function(){
		chrome.tabs.create({ url: 'options.html'});
		window.close();
	});
	
});
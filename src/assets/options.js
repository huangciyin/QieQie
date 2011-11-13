var AccountList = {
	init : function() {
		var accounts = JSON.parse(localStorage.getItem('accounts') || "[]");

		$.each(accounts, function(index, account) {
			var html = AccountList.getItemHtml(account);
			$("#accounts table tbody").append(html);
		});

	},
	getItemHtml : function(account) {
		var html = '';
		html += '<tr>';
		html += '<td><select class="site" name="site"><option value="weibo.com">新浪微博</option></select></td>';

		html += '<td><input type="text" class="loginname" name="loginname" value="' + (account ?  account.loginname : '') + '" /></td>';
		html += '<td><input type="password" class="password" name="password" value="' + (account ?  account.password : '') + '"/></td>';

		html += '<td><a href="javascript:;" class="delete" title="删除该帐号">X</a></td>';
		html += '</tr>';

		return html;
	}
};

$(function() {

	AccountList.init();

	$("#add-account").click(function() {
		var html = AccountList.getItemHtml(null);
		$("#accounts table tbody").append(html);
	});

	$("#accounts").on('click', '.delete', function() {
		$(this).parents('tr').remove();
	});

	$("#save").click(function() {

		var accounts = [];
		$("#accounts table tbody tr").each(function(index, tr) {
			var $this = $(this);
			var site = $this.find('.site').val();
			var loginname = $this.find('.loginname').val();
			var password = $this.find('.password').val();
			accounts.push({
				site : site,
				loginname : loginname,
				password : password
			});
		});
		
		localStorage.setItem('accounts', JSON.stringify(accounts));
		
		$("#message").hide().html('<div class="success">保存成功!</div>').fadeIn();
		
		setTimeout(function(){
			$("#message").fadeOut();
		}, 2000);

	});

});
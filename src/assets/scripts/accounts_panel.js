var AccountsPanel = {
	init : function() {
		var self = this;
		
		Accounts.connect('reload', function(e, data) {
			var html = [];
			
			if (data.length == 0) {
				$(".account-options").find('.message').removeAttr('hidden').html('空空的...');
			} else {
				$(".account-options").find('.message').attr('hidden', '');
			}
			
			$.each(data, function(i, item) {
				html.push(self.getItemHtml(item));
			});
			$("#account-options-list").html(html.join(''));
		});
		
		Accounts.connect('add', function(e, account){
			$("#account-options-list").append(self.getItemHtml(account));
			$(".account-options").find('.message').attr('hidden', '');
		});
		
		Accounts.connect('update', function(e, account){
			$("#account-options-list").find('li').each(function(){
				if ($(this).data('username') == account.username) {
					$(this).replaceWith(self.getItemHtml(account));
					return false;
				}
				return true;
			});
		});
		
		Accounts.connect('delete', function(e, account){
			$("#account-options-list").find('li').each(function(){
				if ($(this).data('username') == account.username) {
					$(this).remove();
					return false;
				}
				return true;
			});
			
		});
		
		SitesPanel.connect('selected', function(e, site) {
			$('.account-options h3').html(site.name + '的帐号');
			Accounts.reload(site);
		});
		
		
		$("#account-options-list").on('dblclick', 'li', function(){
			AccountFormPage.open(Accounts.get($(this).data('username')));
		});
		
		$("#account-options-list").on('click', '.edit-btn', function(){
			var username = $(this).parents('li').data('username');
			AccountFormPage.open(Accounts.get(username));
		});
		
		$("#account-options-list").on('click', '.close-btn', function(){
			if (!confirm('您真的要删除该帐号吗？')) {
				return true;
			}
			
			var username = $(this).parents('li').data('username');
			Accounts.del(Accounts.get(username));
		});
		
		$("#account-options-list").on('click', 'li', function(){
			if ($(this).hasClass('selected')) {
				return true;
			}
			$("#account-options-list").find('li.selected').removeClass('selected');
			$(this).addClass('selected');
		});
		
		
	},
	getItemHtml : function(account) {
		var html = '<li data-username="' + account.username + '">';
		
		if (account.alias) {
			html += '<div class="account">' + account.alias + ' &lt;' + account.username +  '&gt;</div>';
		} else {
			html += '<div class="account">' + account.username + '</div>';
		}
		
		html += '<div class="btns">';
		html += '<div class="edit-btn" title="编辑"></div><div class="close-btn" title="删除"></div>';
		html += '</div>';
		html += '</li>';
		return html;
	},
	
	reset: function() {
		$(".account-options").find('h3').html('帐号');
		$("#account-options-list").empty();
		$(".account-options").find('.message').removeAttr('hidden').html('尚未选定站点！');
	}
	
};
var DefaultSitesPage = {
	pageName : 'default-sites-page',
	init : function() {
		var self = this;
		var $page = $("#" + this.pageName);

		$.each(this.getDefaultSites(), function(i, site) {
			$page.find('#default-sites-box').append(self.getSiteHtml(site));
		});

		$page.find('button[type=reset]').click(function() {
			localStorage.setItem('initialized', true);
			closeAllOverlay();
		});

		$page.find('button[type=submit]').click(function() {
			

			var checkedSites = [], existSiteNames = [];
			$page.find('input[type=checkbox]:checked').each(function() {
				var site = $(this).parents('label').data();
				
				checkedSites.push(site);

				if (Sites.exist(site)) {
					existSiteNames.push(site.name);
				}

			});

			if (checkedSites.length == 0) {
				alert('请选一个站点吧！');
				return true;
			}
			
			if (existSiteNames.length >0) {
				if (!confirm(existSiteNames.join(', ')+' 已经存在于现有的站点列表中，此操作会覆盖已有的站点配置信息，是否要继续？' )) {
					return true;
				}
			}
			
			$.each(checkedSites, function(i, site) {
				Sites.save(site);
			});
			
			localStorage.setItem('initialized', true);
			closeAllOverlay();
			
		});

	},

	open : function(account) {
		var $page = $("#" + this.pageName);
		showOverlay(this.pageName);
	},

	getDefaultSites : function() {
		var sites = [], site = null;

		site = {};
		site.name = '新浪微博';
		site.domain = 'weibo.com';
		site.loginUrl = 'http://weibo.com/logout.php';
		site.logoutUrl = 'http://weibo.com/login.php';
		site.loginScript = '$("#loginname").val(username); $("#password").val(password); $("#login_submit_btn").click();';
		sites.push(site);

		site = {};
		site.name = '好知网';
		site.domain = 'howzhi.com';
		site.loginUrl = 'http://www.howzhi.com/signin';
		site.logoutUrl = 'http://www.howzhi.com/signout';
		site.loginScript = '';
		sites.push(site);

		return sites;
	},

	getSiteHtml : function(site) {
		var html = [];
		html.push('<label>');
		html.push('<input type="checkbox" name="sites[]" value="' + site.domain + '" data-name="' + site.name + '" />');
		html.push(site.name);
		html.push('</label>');
		
		return $(html.join('')).data(site);
		
	}

};
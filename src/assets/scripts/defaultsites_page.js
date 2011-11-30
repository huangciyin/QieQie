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

			if (existSiteNames.length > 0) {
				if (!confirm(existSiteNames.join(', ') + ' 已经存在于现有的站点列表中，此操作会覆盖已有的站点配置信息，是否要继续？')) {
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
		site.loginUrl = 'http://weibo.com/';
		site.logoutUrl = 'http://weibo.com/logout.php';
		var script = [];
		script.push('$("#loginname").val(username);');
		script.push('$("#password").val(password);');
		script.push('$("#login_submit_btn").click();');
		site.loginScript = script.join("\n");
		sites.push(site);
		
		site = {};
		site.name = '19楼空间';
		site.domain = '19lou.com';
		site.loginUrl = 'http://www.19lou.com/login';
		site.logoutUrl = 'http://www.19lou.com/logout';
		var script = [];
		script.push('$("#userName").val(username);');
		script.push('$("#userPass").val(password);');
		script.push('$("#loginForm").submit();');
		site.loginScript = script.join("\n");
		sites.push(site);
		
		site = {};
		site.name = 'ITEYE';
		site.domain = 'iteye.com';
		site.loginUrl = 'http://www.iteye.com/login';
		site.logoutUrl = 'http://www.iteye.com/logout';
		var script = [];
		script.push('$("#login_form input[name=name]").val(username);');
		script.push('$("#login_form input[name=password]").val(password);');
		script.push('$("$("#login_form").submit();');
		site.loginScript = script.join("\n");
		sites.push(site);

		site = {};
		site.name = '好知网';
		site.domain = 'howzhi.com';
		site.loginUrl = 'http://www.howzhi.com/signin';
		site.logoutUrl = 'http://www.howzhi.com/signout';
		var script = [];
		script.push('$("#signin_username").val(username);');
		script.push('$("#signin_password").val(password);');
		script.push('$("#signin-form input[type=submit]").click();');
		site.loginScript = script.join("\n");
		
		
		
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
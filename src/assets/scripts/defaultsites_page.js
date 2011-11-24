var DefaultSitesPage = {
	pageName : 'default-sites-page',
	init : function() {
		var self = this;
		var $page = $("#" + this.pageName);

		$.each(this.getDefaultSites(), function(i, site) {
			$page.find('#default-sites-box').append(self.getSiteHtml(site));
		});

		$page.find('button[type=reset]').click(function() {
			closeAllOverlay();
		});

		$page.find('button[type=submit]').click(function() {
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
		site.loginScript = '';
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
		html.push('<input type="checkbox" value="' + site.domain + '" />');
		html.push(site.name);
		html.push('</label>');
		return html.join('');
	}

};
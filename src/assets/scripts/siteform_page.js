var SiteFormPage = {
	pageName : 'site-form-page',
	init : function() {
		var self = this;
		var $page = $("#" + this.pageName);

		$page.find('button[type=reset]').click(function() {
			closeAllOverlay();
		});

		$page.find('button[type=submit]').click(function() {
			var site = {};
			site.name = $page.find('[name=name]').val();
			site.domain = $page.find('[name=domain]').val();
			site.loginUrl = $page.find('[name=login_url]').val();
			site.logoutUrl = $page.find('[name=logout_url]').val();
			site.jumpUrl = $page.find('[name=jump_url]').val();
			site.loginScript = $page.find('[name=login_script]').val();

			Sites.save(site);

			closeAllOverlay();
		});

		$page.find('input, textarea').keydown(function() {
			self.checkInputFields();
		});

	},

	open : function(site) {
		var $page = $("#" + this.pageName);

		if (site == undefined) {
			site = {};
			$page.find('h1').html('新增网站');
			$page.find('[name=domain]').removeAttr('readonly');
		} else {
			$page.find('h1').html('编辑网站');
			$page.find('[name=domain]').attr('readonly', 'readonly');
		}

		$page.find('[name=name]').val(site.name);
		$page.find('[name=domain]').val(site.domain);
		$page.find('[name=login_url]').val(site.loginUrl);
		$page.find('[name=logout_url]').val(site.logoutUrl);
		$page.find('[name=jump_url]').val(site.jumpUrl);
		$page.find('[name=login_script]').val(site.loginScript);
		
		this.checkInputFields();

		showOverlay(this.pageName);
	},

	checkInputFields : function() {
		var $page = $("#" + this.pageName);

		var success = true;

		setTimeout(function() {
			$page.find('input[required], textarea[required]').each(function() {
				if ($(this).val() == '') {
					success = false;
					return false;
				}
				return true;
			});

			if (success) {
				$page.find('button[type=submit]').removeAttr('disabled');
			} else {
				$page.find('button[type=submit]').attr('disabled', 'disabled');
			}
		});

	}

};
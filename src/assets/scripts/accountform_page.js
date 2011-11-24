var AccountFormPage = {
	pageName : 'account-form-page',
	init : function() {
		var self = this;
		var $page = $("#" + this.pageName);

		$page.find('button[type=reset]').click(function() {
			closeAllOverlay();
		});

		$page.find('button[type=submit]').click(function() {
			var account = {};
			account.username = $page.find('[name=username]').val();
			account.password = $page.find('[name=password]').val();
			account.alias = $page.find('[name=alias]').val();
			
			if (Accounts.exist(account)) {
				alert('该帐号已存在！');
				return true;
			}

			Accounts.save(account);

			closeAllOverlay();
		});

		$page.find('input').keydown(function() {
			self.checkInputFields();
		});

	},

	open : function(account) {
		var $page = $("#" + this.pageName);

		if (account == undefined) {
			account = {};
			$page.find('h1').html('新增帐号');
		} else {
			$page.find('h1').html('编辑帐号');
		}

		$page.find('[name=username]').val(account.username);
		$page.find('[name=password]').val(account.password);
		$page.find('[name=alias]').val(account.alias);
		
		this.checkInputFields();
		
		showOverlay(this.pageName);
	},

	checkInputFields : function() {
		var $page = $("#" + this.pageName);

		var success = true;

		setTimeout(function() {
			$page.find('input[required]').each(function() {
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
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
			
			Accounts.save(account);

			closeAllOverlay();
		});

		$page.find('input').keydown(function() {
			self.checkInputFields();
		});

	},

	open : function(account) {
		var $page = $("#" + this.pageName);
		
		$page.find("#edit-usernmae-hint").remove();

		if (account == undefined) {
			account = {};
			$page.find('h1').html('新增帐号');
			$page.find('[name=username]').removeAttr('readonly');
		} else {
			$page.find('h1').html('编辑帐号');
			$page.find('[name=username]').after('<div id="edit-usernmae-hint" class="hint">编辑模式下用户名不能修改</div>');
			$page.find('[name=username]').attr('readonly', 'readonly');
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
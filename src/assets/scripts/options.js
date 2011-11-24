var OptionsPage = {
	init : function() {
		$("#account-options-add-site-button").click(function() {
			SiteFormPage.open();
		});

		$("#add-account-button").click(function() {
			if (Accounts.site == undefined) {
				alert('您还没选择要添加帐号的网站!');
				return true;
			}
			AccountFormPage.open();
		});
	}
};

$(function() {
	SitesPanel.init();
	AccountsPanel.init();

	SiteFormPage.init();
	AccountFormPage.init();

	OptionsPage.init();

});
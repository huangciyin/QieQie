function makeSiteSelect(sites) {
	var html = '<select id="site-select">';
	html += '<option value="">---</option>';
	$.each(sites, function(i, site) {
		html += '<option value="' + site.domain + '">' + site.name + '</option>';
	});
	html += '</select>';
	return html;
}

function makeAccountMenus(accounts) {
	var html = '';
	$.each(accounts, function(i, account){
		if (account.alias) {
			html += '<li data-username="' + account.username + '">' + account.alias + '&lt;' + account.username +  '&gt;</li>'; 
		} else {
			html += '<li data-username="' + account.username + '">' + account.username + '</li>'; 
		}
	});
	return html;
}

var getHost = function(url) {
	var host = null;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if (typeof match != "undefined" && null != match)
		host = match[1];
	return host;
};

$(function() {

	chrome.tabs.getSelected(null, function(tab) {
		
		Sites.connect('reload', function(e, sites) {
			$("#jump-wrapper").attr('hidden', 'hidden');
			if (sites.length == 0) {
				$("#no-sites-wrapper").attr('hidden', 'hidden');
			} else {
				$("#sites-wrapper").removeAttr('hidden');
				$("#sites-wrapper").append(makeSiteSelect(sites));
				$("#accounts-wrapper").removeAttr('hidden');
			}
		});
		
		Accounts.connect('reload', function(e, accounts){
			$("#account-menus").attr('hidden', 'hidden');
			if (accounts.length == 0) {
				$("#accounts-wrapper").find('.info').html('该站点尚未设置帐号！').removeAttr('hidden');
			} else {
				$("#accounts-wrapper").find('.info').attr('hidden', 'hidden');
				$("#account-menus").html(makeAccountMenus(accounts)).removeAttr('hidden');
			}
		});
		
		$("#sites-wrapper").on('change', 'select', function(e){
			var site = Sites.get($(this).val());
			
			if (site) {
				Accounts.reload(site);
			} else {
				$("#account-menus").attr('hidden', 'hidden');
				$("#accounts-wrapper").find('.info').html('请选择站点').removeAttr('hidden');
			}
			
		});

		Sites.reload();
		
		var selectedSite = Sites.getByHost(getHost(tab.url));
		if (selectedSite) {
			$("#sites-wrapper select").find("[value=\"" + selectedSite.domain + "\"]").attr('selected', 'selected');
			$("#sites-wrapper select").change();
		}
		
		$("#account-menus").on('click', 'li', function(){
			
			$("#sites-wrapper").attr('hidden', 'hidden');
			$("#accounts-wrapper").attr('hidden', 'hidden');
			$("#jump-wrapper").removeAttr('hidden');
			
			var username = $(this).data('username');
			var account = Accounts.get(username);
			var site = Accounts.site;
			
			localStorage.setItem('toAccount', JSON.stringify(account));
			localStorage.setItem('toSite', JSON.stringify(site));
			
			_gaq.push(['_trackEvent', 'Sites', 'Qie', 'Qie to ' + site.domain + '.']);
			
			$.getScript(site.logoutUrl, function(){
				chrome.tabs.getSelected(null, function(tab) {
					chrome.tabs.update(tab.id, {url:site.loginUrl});
					window.close();
				});
			});
			
		});
		
	});
	
	
	$("#options").click(function(){
		chrome.tabs.create({ url: 'options.html'});
		window.close();
	});


});
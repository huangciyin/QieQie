var SiteListPanel = {
	init : function() {
		var self = this;

		SiteList.connect('reload', function(e, data) {
			console.log('reload');
			
			var html = [];
			$.each(data, function(i, item) {
				html.push(self.getItemHtml(item));
			});
			
			$("#site-options-list").html(html.join(''));
			
		});
		
		SiteList.connect('add', function(e, site){
			$("#site-options-list").append(self.getItemHtml(site));
		});
		
		SiteList.connect('update', function(e, site){
			$("#site-options-list").find('li').each(function(){
				if ($(this).data('domain') == site.domain) {
					$(this).replaceWith(self.getItemHtml(site));
					return false;
				}
				return true;
			});
		});

		SiteList.reload();
		
		$("#site-options-list").on('dblclick', 'li', function(){
			console.log(SiteList.get($(this).data('domain')));
			AddSitePage.open(SiteList.get($(this).data('domain')));
		});

	},

	addItem : function(item) {

	},

	getItemHtml : function(site) {
		var html = '<li data-domain="' + site.domain + '">';
		html += '<div class="site-name">' + site.name + '</div>';
		html += '<div class="btns">';
		html += '<div class="edit-btn" title="编辑"></div><div class="close-btn" title="删除"></div>';
		html += '</div>';
		html += '</li>';
		return html;
	}
};
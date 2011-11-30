var SitesPanel = {
	init : function() {
		var self = this;

		Sites.connect('reload', function(e, data) {
			var html = [];
			$.each(data, function(i, item) {
				html.push(self.getItemHtml(item));
			});

			$("#site-options-list").html(html.join(''));

		});

		Sites.connect('add', function(e, site) {
			$("#site-options-list").append(self.getItemHtml(site));
		});

		Sites.connect('update', function(e, site) {
			$("#site-options-list").find('li').each(function() {
				if ($(this).data('domain') == site.domain) {
					var selected = $(this).hasClass('selected');
					$(this).replaceWith(self.getItemHtml(site));
					if (selected) {
						$("#site-options-list").find('li').each(function() {
							if ($(this).data('domain') == site.domain) {
								$(this).click();
								return false;
							}
							return true;
						});
					}
					return false;
				}
				return true;
			});
		});

		Sites.connect('delete', function(e, site) {
			console.log('delete');
			$("#site-options-list").find('li').each(function() {
				if ($(this).data('domain') == site.domain) {
					$(this).remove();
					return false;
				}
				return true;
			});

			AccountsPanel.reset();

		});

		Sites.reload();

		$("#site-options-list").on('dblclick', 'li', function() {
			SiteFormPage.open(Sites.get($(this).data('domain')));
		});

		$("#site-options-list").on('click', '.edit-btn', function() {
			var domain = $(this).parents('li').data('domain');
			SiteFormPage.open(Sites.get(domain));
		});

		$("#site-options-list").on('click', '.close-btn', function() {
			if (!confirm('您真的要删除该网站及下属的所有帐号吗？')) {
				return true;
			}

			var domain = $(this).parents('li').data('domain');
			Sites.del(Sites.get(domain));
		});

		$("#site-options-list").on('click', 'li', function() {
			if ($(this).hasClass('selected')) {
				return true;
			}

			$("#site-options-list").find('li.selected').removeClass('selected');
			$(this).addClass('selected');
			self.notify('selected', Sites.get($(this).data('domain')));
		});

		$("#use-default-site-button").click(function() {
			DefaultSitesPage.open();
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
	},
	notify : function(eventName, eventData) {
		$('body').trigger('qieqie.sites_panel.' + eventName, [ eventData ]);
	},

	connect : function(eventName, callback) {
		$('body').bind('qieqie.sites_panel.' + eventName, callback);
	}
};
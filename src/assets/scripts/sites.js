var Sites = {
	data : null,

	get : function(domain) {
		var site = null;
		$.each(this.data, function(i, item) {
			if (item.domain == domain) {
				site = item;
				return false;
			}
			return true;
		});
		return site;
	},
	
	getByHost: function(host) {
		var site = null;
		$.each(this.data, function(i, item){
			if (host.lastIndexOf(item.domain) >=0) {
				site = item;
				return false;
			}
			return true;
		});
		return site;
	},
	
	all: function() {
		return this.data;
	},

	reload : function() {
		this.data = JSON.parse(localStorage.getItem('sites') || "[]");
		this.notify('reload', this.data);
	},
	save : function(site) {
		var self = this;
		if (self.exist(site)) {
			self.update(site);
		} else {
			self.add(site);
		}
	},
	del : function(site) {
		if (!this.exist(site)) {
			return;
		}

		var sitelist = [];
		$.each(this.data, function(i, item) {
			if (site.domain == item.domain) {
				return true;
			}
			sitelist.push(item);
		});
		this.data = sitelist;
		this._persist();
		
		Accounts.delall(site);
		
		this.notify('delete', site);
	},
	update : function(site) {
		var self = this;

		$.each(self.data, function(i, item) {
			if (item.domain == site.domain) {
				self.data[i] = site;
				self._persist();
				self.notify('update', site);
				return false;
			}
			return true;
		});
	},
	add : function(site) {
		this.data.push(site);
		this._persist();
		this.notify('add', site);
	},

	exist : function(site) {
		var self = this;
		if (typeof (site) == 'string') {
			return self._exist(site);
		}

		if (typeof (site) == 'object') {
			return self._exist(site.domain);
		}
		return false;
	},
	_exist : function(domain) {
		var exist = false;
		$.each(this.data, function(i, item) {
			if (item.domain == domain) {
				exist = true;
				return false;
			}
			return true;
		});
		return exist;
	},
	_persist : function() {
		localStorage.setItem('sites', JSON.stringify(this.data));
	},

	notify : function(eventName, eventData) {
		$('body').trigger('qieqie.sites.' + eventName, [ eventData ]);
	},

	connect : function(eventName, callback) {
		$('body').bind('qieqie.sites.' + eventName, callback);
	}

};
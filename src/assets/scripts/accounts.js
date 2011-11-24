var Accounts = {
	data : null,
	site : null,

	get : function(username) {
		var account = null;
		$.each(this.data, function(i, item) {
			if (item.username == username) {
				account = item;
				return false;
			}
			return true;
		});
		return account;
	},

	reload : function(site) {
		this.data = JSON.parse(localStorage.getItem('accounts_' + site.domain) || "[]");
		this.site = site;
		this.notify('reload', this.data);
	},
	save : function(account) {
		var self = this;
		if (self.exist(account)) {
			self.update(account);
		} else {
			self.add(account);
		}
	},
	update : function(account) {
		var self = this;

		$.each(self.data, function(i, item) {
			if (item.username == account.username) {
				self.data[i] = account;
				self._persist();
				self.notify('update', account);
				return false;
			}
			return true;
		});
	},
	add : function(account) {
		this.data.push(account);
		this._persist();
		this.notify('add', account);
	},
	del : function(account) {
		if (!this.exist(account)) {
			return;
		}

		var accountlist = [];
		$.each(this.data, function(i, item) {
			if (account.username == item.username) {
				return true;
			}
			accountlist.push(item);
		});
		this.data = accountlist;
		this._persist();
		this.notify('delete', account);
	},
	
	delall: function(site) {
		localStorage.removeItem('accounts_' + site.domain);
		this.site = null;
		this.data = null;
		this.notify('delall', this.data);
	},
	
	exist : function(account) {
		var self = this;
		if (typeof (account) == 'string') {
			return self._exist(account);
		}

		if (typeof (account) == 'object') {
			return self._exist(account.username);
		}
		return false;
	},
	_exist : function(username) {
		var exist = false;
		$.each(this.data, function(i, item) {
			if (item.username == username) {
				exist = true;
				return false;
			}
			return true;
		});
		return exist;
	},
	_persist : function() {
		localStorage.setItem('accounts_' + this.site.domain, JSON.stringify(this.data));
	},

	notify : function(eventName, eventData) {
		$('body').trigger('qieqie.accounts.' + eventName, [ eventData ]);
	},

	connect : function(eventName, callback) {
		$('body').bind('qieqie.accounts.' + eventName, callback);
	}

};
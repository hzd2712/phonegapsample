var HomeView = function(store) {
	
	this.initialize = function() {
		console.log("initialize....");
		var self = this;
		this.el = $('<div/>');
		this.el.on('keyup', '.search-key', function() {
			self.findByName();
		});
	}

	this.initialize();

	this.render = function() {
		this.el.html(HomeView.template());
		return this;
	};

	this.findByName = function() {
		console.log($('.search-key').val());
		var self = this;
        store.findByName($('.search-key').val(), function(employees) {
	        $('.employee-list').html(HomeView.liTemplate(employees));
	        if (self.iscroll) {
	            console.log('Refresh iScroll');
	            self.iscroll.refresh();
	        } else {
	            console.log('New iScroll');
	            self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
	        }
	    });
    };


};

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());
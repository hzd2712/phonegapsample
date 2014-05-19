var EmployeeView = function(employee) {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', function(event) {
			self.addLocation(event);
		});
	};
	this.initialize();

	this.render = function() {
		this.el.html(EmployeeView.template(employee));
		return this;
	};


	this.addLocation = function(event) {
		event.preventDefault();
		console.log("addLocation");

		navigator.geolocation.getCurrentPosition(
			function(position) {
				$('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
			},
			function() {
				alert('Error getting location');
			});
		return false;
	};
};

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());
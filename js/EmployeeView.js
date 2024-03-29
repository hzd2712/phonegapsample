var EmployeeView = function(employee) {

	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', function(event) {
			self.addLocation(event);
		});
		this.el.on('click', '.add-contact-btn', function(event) {
			self.addToContacts(event);
		});
		this.el.on('click', '.change-pic-btn', function(event) {
			self.changePicture(event);
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

	this.addToContacts = function(event) {
	    event.preventDefault();
	    console.log('addToContacts');
	    if (!navigator.contacts) {
	        alert("Contacts API not supported");
	        return;
	    }
	    var contact = navigator.contacts.create();
	    contact.name = {givenName: employee.firstName, familyName: employee.lastName};
	    var phoneNumbers = [];
	    phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
	    phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
	    contact.phoneNumbers = phoneNumbers;
	    contact.save();
	    return false;
	};

	this.changePicture = function(event) {
		event.preventDefault();
		if (!navigator.camera) {
			alert("Camera API not supported");
			return;
		}
		var options = {
					quality: 50,
					destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                    encodingType: 0     // 0=JPG 1=PNG 
					  };
	    navigator.camera.getPicture(
	    	function(imageData) {
            	$('.employee-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
	        },
	        function() {
	            alert('Error taking picture', 'Error');
	        },
	        options);

	    return false;
	};
};

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());
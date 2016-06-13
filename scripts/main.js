/* ----------------------------

	Navigation
	
---------------------------- */

var navigation = document.getElementsByClassName('site-nav')[0];
var openNavButton = document.getElementsByClassName('nav-open')[0];
var closeNavButton = document.getElementsByClassName('nav-close')[0];

openNavButton.addEventListener('click', function(e) {
	navigation.classList.add('open');
	e.preventDefault();
	return false;
});
closeNavButton.addEventListener('click', function(e) {
	navigation.classList.remove('open');
	e.preventDefault();
	return false; 
});


/* ----------------------------

	Geolocate
	
---------------------------- */


var placeSearch, autocomplete;

function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete( 
		(document.getElementById('location') 
	), {types: ['geocode']} );
}

function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			var circle = new google.maps.Circle({
				center: geolocation,
				radius: position.coords.accuracy
			});
			autocomplete.setBounds(circle.getBounds());
		});
	}
}



/* ----------------------------

	CustomValidation prototype
	
---------------------------- */

function CustomValidation() {
	this.invalidities = [];
	this.validityChecks = [];
}

CustomValidation.prototype = {
	addInvalidity: function(message) {
		this.invalidities.push(message);
	},
	getInvalidities: function() {
		return this.invalidities.join('. \n');
	},
	checkValidity: function(input) {

		for ( var i = 0; i < this.validityChecks.length; i++ ) {

			var isInvalid = this.validityChecks[i].isInvalid(input);
			if (isInvalid) {
				this.addInvalidity(this.validityChecks[i].invalidityMessage);
			} 

			var requirementElement = this.validityChecks[i].element;
			if (requirementElement) {
				if (!isInvalid) {
					requirementElement.classList.add('valid');
				} else {
					requirementElement.classList.remove('valid');
				}
			} // end if requirementElement

		}

	}
};

function checkInput(input) {
	if ( input.CustomValidation ) {

		input.CustomValidation.invalidities = [];
		input.CustomValidation.checkValidity(input);

		if ( input.CustomValidation.invalidities.length == 0 && input.value != '' ) {
			input.setCustomValidity('');
		} else {
			var message = input.CustomValidation.getInvalidities();
			input.setCustomValidity(message);
		}

	}	
}
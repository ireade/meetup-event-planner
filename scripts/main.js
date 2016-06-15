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
	this.displayInvaliditiesOnBlur = true;
}

CustomValidation.prototype = {
	addInvalidity: function(message) {
		this.invalidities.push(message);
	},
	getInvalidities: function() {
		return this.invalidities.join('. \n');
	},
	displayInvalidities: function(input) {

		this.checkValidity(input);

		if ( this.displayInvaliditiesOnBlur ) {

			if ( this.invalidities.length > 0 ) {
				input.classList.add('invalid');
			} else {
				input.classList.remove('invalid');
			}

			var invaliditiesArray = [];
			for ( var i = 0; i < this.invalidities.length; i++ ) {
				invaliditiesArray.push('<li>'+this.invalidities[i]+'</li>');
			}
			invaliditiesArray = invaliditiesArray.join();

			var inputID = input.getAttribute('id');
			var inputRequirements = document.querySelector('#'+inputID+' + ul');
			inputRequirements.innerHTML = invaliditiesArray;

			
		} else {

			if ( this.invalidities.length > 0 ) {
				input.classList.add('invalid');
			} else {
				input.classList.remove('invalid');
			}
		}

	},
	checkValidity: function(input) {

		this.invalidities = [];

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
		
		input.CustomValidation.checkValidity(input);

		input.CustomValidation.displayInvalidities(input);

		if ( input.CustomValidation.invalidities.length == 0 && input.value != '' ) {
			input.setCustomValidity('');
		} else {
			var message = input.CustomValidation.getInvalidities();
			input.setCustomValidity(message);
		}
	}
}
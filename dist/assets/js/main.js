'use strict';

/* ----------------------------

	CustomValidation prototype
	
---------------------------- */

function CustomValidation() {
	this.invalidities = [];
	this.validityChecks = [];
}

CustomValidation.prototype = {
	addInvalidity: function addInvalidity(message) {
		this.invalidities.push(message);
	},
	getInvalidities: function getInvalidities() {
		return this.invalidities.join('. \n');
	},
	checkValidity: function checkValidity(input) {

		for (var i = 0; i < this.validityChecks.length; i++) {

			var isInvalid = this.validityChecks[i].isInvalid(input);
			if (isInvalid) {
				this.addInvalidity(this.validityChecks[i].invalidityMessage);
			}

			var requirementElement = this.validityChecks[i].element;
			if (requirementElement) {
				if (isInvalid) {
					requirementElement.classList.add('invalid');
					requirementElement.classList.remove('valid');
				} else {
					requirementElement.classList.remove('invalid');
					requirementElement.classList.add('valid');
				}
			} // end if requirementElement
		}
	}
};

/* ----------------------------

	Validity Checks
	
---------------------------- */

var full_name_validityChecks = [{
	isInvalid: function isInvalid(input) {
		return input.value.length < 3;
	},
	invalidityMessage: 'This input needs to be at least 3 characters'
}, {
	isInvalid: function isInvalid(input) {
		var illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
		return illegalCharacters ? true : false;
	},
	invalidityMessage: 'Only letters and numbers are allowed'
}];

/* ----------------------------

	Setup CustomValidation

---------------------------- */

var full_name = document.getElementById('full_name');
if (full_name) {
	full_name.CustomValidation = new CustomValidation();
	full_name.CustomValidation.validityChecks = full_name_validityChecks;
}

/* ----------------------------

	Check this input

---------------------------- */

function checkInput(input) {

	if (input.CustomValidation) {

		input.CustomValidation.invalidities = [];
		input.CustomValidation.checkValidity(input);

		if (input.CustomValidation.invalidities.length == 0 && input.value != '') {
			input.setCustomValidity('');
		} else {
			var message = input.CustomValidation.getInvalidities();
			input.setCustomValidity(message);
		}
	}
}

/* ----------------------------

	Event Listeners

---------------------------- */

var inputs = document.querySelectorAll('input');
var submit = document.querySelector('button[type="submit"]');

if (inputs) {
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('keyup', function () {
			checkInput(this);
		});
	}
}

if (submit) {
	submit.addEventListener('click', function () {
		document.querySelector('form').classList.add('show-errors');
		for (var i = 0; i < inputs.length; i++) {
			checkInput(inputs[i]);
		}
	});
}
'use strict';

var navigation = document.getElementsByClassName('site-nav')[0];
var openNavButton = document.getElementsByClassName('nav-open')[0];
var closeNavButton = document.getElementsByClassName('nav-close')[0];

openNavButton.addEventListener('click', function (e) {
	navigation.classList.add('open');
	e.preventDefault();
	return false;
});
closeNavButton.addEventListener('click', function (e) {
	navigation.classList.remove('open');
	e.preventDefault();
	return false;
});
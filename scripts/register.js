/* ----------------------------

	CustomValidation - Register

---------------------------- */

var full_name_input = document.getElementById('full_name');
if ( full_name_input ) {
	full_name_input.CustomValidation = new CustomValidation();
	full_name_input.CustomValidation.validityChecks = [
		{
			isInvalid: function(input) {
				return input.value.length < 3;
			},
			invalidityMessage: 'This input needs to be at least 3 characters'
		}
	];
}


var email_input = document.getElementById('email');
if ( email_input ) {
	email_input.CustomValidation = new CustomValidation();
	email_input.CustomValidation.validityChecks = [
		{
			isInvalid: function(input) {
				return !input.value.match(/[\@]/g) | !input.value.match(/[\.]/g);
			},
			invalidityMessage: 'This needs to be a valid email address'
		}
	];
}

var password_input = document.getElementById('password');
if ( password_input ) {
	password_input.CustomValidation = new CustomValidation();
	password_input.CustomValidation.displayInvaliditiesOnBlur = false;
	password_input.CustomValidation.validityChecks = [
		{
			isInvalid: function(input) {
				return input.value.length < 8 | input.value.length > 100;
			},
			invalidityMessage: 'Your password needs to be between 8 and 100 characters',
			element: document.querySelector('#password + ul li:nth-child(1)')
		},
		{
			isInvalid: function(input) {
				return !input.value.match(/[0-9]/g);
			},
			invalidityMessage: 'You need at least one number',
			element: document.querySelector('#password + ul li:nth-child(2)')
		},
		{
			isInvalid: function(input) {
				return !input.value.match(/[a-z]/g);
			},
			invalidityMessage: 'You need at least one lowercase letter',
			element: document.querySelector('#password + ul li:nth-child(3)')
		},
		{
			isInvalid: function(input) {
				return !input.value.match(/[A-Z]/g);
			},
			invalidityMessage: 'You need at least one uppercase letter',
			element: document.querySelector('#password + ul li:nth-child(4)')
		}
	];
}

var password_repeat_input = document.getElementById('password_repeat');
if ( password_repeat_input ) {
	password_repeat_input.CustomValidation = new CustomValidation();
	password_repeat_input.CustomValidation.validityChecks = [
		{
			isInvalid: function() {
				return (password_repeat_input.value != password_input.value) && password_repeat_input.value.value != '';
			},
			invalidityMessage: 'This password needs to be the same as the first one.'
		}
	];
}


/* ----------------------------

	Event Listeners

---------------------------- */


var inputs = document.querySelectorAll('input');
var submit = document.querySelector('button[type="submit"]');

if ( inputs ) {
	for (var i = 0; i < inputs.length; i++) {

		var input = inputs[i];

		if ( input.CustomValidation ) {
			input.addEventListener('keyup', function() {
				checkInput(this);
			});
			input.addEventListener('blur', function() {
				this.CustomValidation.displayInvalidities(this);
			});
		}
		
	}
}

if ( submit ) {
	submit.addEventListener('click', function() {
		document.querySelector('form').classList.add('show-errors');
		for (var i = 0; i < inputs.length; i++) {
			checkInput(inputs[i]);
		}
	});
}
/* ----------------------------

	CustomValidation - Create

---------------------------- */
//

var requiredInputs = document.querySelectorAll('[required]');
for ( var i = 0; i < requiredInputs.length; i++ ) {

	requiredInputs[i].CustomValidation = new CustomValidation();
	requiredInputs[i].CustomValidation.validityChecks = [
		{
			isInvalid: function(input) {
				return input.value.length < 1;
			},
			invalidityMessage: 'This input is required'
		}
	];

}



//


var event_end_input = document.getElementById('end');
if ( event_end_input ) {
	event_end_input.CustomValidation = new CustomValidation();
	event_end_input.CustomValidation.validityChecks = [
		{
			isInvalid: function(input) {

				var end = event_end_input.value;
				var endDate = end.split('T')[0];
				var endYear = endDate.split('-')[0];
				var endMonth = endDate.split('-')[1];
				var endDay = endDate.split('-')[2];
				var endTime = end.split('T')[1];
				var endHour = endTime.split(':')[0];
				var endMin = endTime.split(':')[1];
				var endMoment = moment().year(endYear).month(endMonth).date(endDay).hours(endHour).minutes(endMin);

				var start = document.getElementById('start').value;
				var startDate = start.split('T')[0];
				var startYear = startDate.split('-')[0];
				var startMonth = startDate.split('-')[1];
				var startDay = startDate.split('-')[2];
				var startTime = start.split('T')[1];
				var startHour = startTime.split(':')[0];
				var startMin = startTime.split(':')[1];
				var startMoment = moment().year(startYear).month(startMonth).date(startDay).hours(startHour).minutes(startMin);

				return !moment(endMoment).isAfter(startMoment);
			},
			invalidityMessage: 'The end date needs to be after the start date'
		}
	];
}








//	Event Listeners

var inputs = document.querySelectorAll('input');
var submit = document.querySelector('button[type="submit"]');

if ( inputs ) {
	for (var i = 0; i < inputs.length; i++) {

		var input = inputs[i];

		if ( input.CustomValidation ) {
			input.addEventListener('keyup', function() {
				input(this);
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


/* ----------------------------

	Autofill End Date and Time

---------------------------- */

var start_date_input = document.getElementById('start');
var end_date_input = document.getElementById('end');

function setEndDate() {
	if ( start_date_input.validity.valid ) {

		var startDatetime = start_date_input.value;

		var startDate = startDatetime.split('T')[0];
		var startTime = startDatetime.split('T')[1];
		var startHour = startTime.split(':')[0];
		var startMin = startTime.split(':')[1];

		var endHour = startHour == '22' ? '0' : parseInt(startHour) + 2;
		endHour < 10 ? endHour = '0'+endHour : true;
		var endTime = startDate + 'T' + endHour + ':' + startMin;

		end_date_input.value = endTime;

	}
}

start_date_input.addEventListener('keyup', function() {
	setEndDate();
});
start_date_input.addEventListener('click', function() {
	setEndDate();
});


/* ----------------------------

	Progress Bar

---------------------------- */

var inputs = document.querySelectorAll('input, textarea');
var progressBar = document.getElementsByClassName('progress-bar')[0];

var checkProgress = function() {

	var validRequired = 0;

	for ( var i = 0; i < inputs.length; i++ ) {
		if ( inputs[i].validity.valid ) { validRequired++; }
	}

	var percentage = Math.round( (validRequired / inputs.length) * 100);
	percentage = percentage + '%';

	progressBar.style.width = percentage;
	progressBar.innerHTML = percentage;
};

checkProgress();

for ( var i = 0; i < inputs.length; i++ ) {
	inputs[i].addEventListener('change', function() {
		checkProgress();
	});
}












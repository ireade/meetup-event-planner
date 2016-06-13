
/* ----------------------------

	CustomValidation - Create

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

	CustomValidation - Create

---------------------------- */


var inputs = document.querySelectorAll('input, textarea');
var totalReuqired = document.querySelectorAll('[required]');
var progressBar = document.getElementsByClassName('progress-bar')[0];

var checkProgress = function() {

	var validRequired = 0;

	for ( var i = 0; i < inputs.length; i++ ) {
		if ( inputs[i].validity.valid ) {
			validRequired++;
		}
	}

	var percentage = Math.round( (validRequired / inputs.length) * 100);
	percentage = percentage + '%';
	progressBar.style.width = percentage;
	progressBar.innerHTML = percentage;


};

checkProgress();

for ( var i = 0; i < totalReuqired.length; i++ ) {
	totalReuqired[i].addEventListener('change', function() {
		checkProgress();
	});
}












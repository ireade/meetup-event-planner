
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

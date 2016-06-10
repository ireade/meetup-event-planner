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
var nav = document.querySelector('.nav');
nav.addEventListener('toggle', function (event) {

	// Only run if the dropdown is open
	if (!event.target.open) return;

	// Get all other open dropdowns and close them
	var dropdowns = nav.querySelectorAll('.dropdown[open]');
	Array.prototype.forEach.call(dropdowns, function (dropdown) {
		if (dropdown === event.target) return;
		dropdown.removeAttribute('open');
	});

}, true);
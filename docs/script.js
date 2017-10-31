require('bootstrap');
require('sticky-kit/dist/sticky-kit.js');
require('../jquery.inifinite-scroll-up-n-down.js');

$(function(){
	$("#sidenav").stick_in_parent()

	$('#page').infiniteScrollUND({
		upNav: '.previous a',
		downNav: '.next a',
		container: '#page'
	});
});


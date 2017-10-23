require('bootstrap');
require('../jquery.inifinite-scroll-up-n-down.js');

$(function(){
	$('#page').infiniteScrollUND({
		upNav: '.previous a',
		downNav: '.next a',
		container: '#page'
	});
});


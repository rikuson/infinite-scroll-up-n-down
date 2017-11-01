require('bootstrap');
require('sticky-kit/dist/sticky-kit.js');
require('../jquery.inifinite-scroll-up-n-down.js');

$(function(){
	$("#sidenav").stick_in_parent()

	$('#page').infiniteScrollUND({
		upNav: '.previous a',
		downNav: '.next a',
		container: '#page',
		top: 80,
		acrossPage: function($page){
			$('.navbar-nav li').removeClass('active');
			$('.navbar-nav a').each(function(){
				if(this.innerHTML == $page.find('h2').html()){
					$(this).parent().addClass('active');
				}
			});
		}
	});
});


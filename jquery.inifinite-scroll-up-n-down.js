
/*========================================
 * infinite-scroll-up-n-down
 *========================================
This plugin makes you enable to infinite scroll up and down.

--------------------*/

(function($){
	$.fn.infiniteScrollUND = function(option){
		var defaultOption = {
			downNav: '',
			upNav: '',
			threshold: $(window).height(),
			prefill: true,
			container: $(this).selector,
			headline: null,
			timeout: 1000,
			history: true,
			top: 0,
			append: function(children){},
			prepend: function(children){}
		};
		var option = $.extend(defaultOption, option);

		if (option.downNav === '') console.error('downNav(option) is required');
		if (option.upNav === '') console.error('upNav(option) is required');

		var pageBorders = [];
		var $downNav = $(option.downNav);
		var $upNav = $(option.upNav);
		var pages = [{
			contents: $(option.container).children(),
			currentUrl: location.href,
			nextUrl: $downNav.attr('href')
		}];

		function distance(direction) {
			switch (direction) {
				case 'bottom':
					return $(option.container).height() - $(window).scrollTop() - $(window).height();
				case 'top':
					var containerOffset = $(option.container).offset();
					return $(window).scrollTop();
			}
		}

		function setPageBorders() {
			pageBorders = [];
			for (var i = 0; i < pages.length; i++) {
				var $lastChild = pages[i].contents.last();
				pageBorders[i] = {
					offsetTop: $lastChild.offset().top + $lastChild.outerHeight(),
					above: pages[i].currentUrl,
					below: pages[i].nextUrl
				};
			}
		}

		function prependContents(){
			if ($upNav.length > 0) {
				$.ajax({
					dataType: 'html',
					url: $upNav.attr('href'),
					type: 'GET',
					timeout: option.timeout,
					success: function(data){
						$contents = $(data).find(option.container).children();
						var beforeContainerHeight = $(option.container).height();
						$(option.container).prepend($contents);
						var afterContainerHeight = $(option.container).height();
						var contentsHeight = afterContainerHeight - beforeContainerHeight;
						scrollBy(0, contentsHeight);

						var page = {
							contents: $contents,
							currentUrl: $upNav.attr('href')
						};
						$upNav = $(data).find(option.upNav);
						page.nextUrl = $upNav.attr('href');
						pages.unshift(page);
						setPageBorders();

						// callback function
						option.prepend($contents);
					},
					error: function(err){
						console.error(err);
					}
				});
			}
		}

		function appendContents(){
			if ($downNav.length > 0) {
				$.ajax({
					dataType: 'html',
					url: $downNav.attr('href'),
					type: 'GET',
					timeout: option.timeout,
					success: function(data){
						$contents = $(data).find(option.container).children();
						$(option.container).append($contents);

						var page = {
							contents: $contents,
							currentUrl: $downNav.attr('href')
						};
						$downNav = $(data).find(option.downNav);
						page.nextUrl = $downNav.attr('href');
						pages.push(page);
						setPageBorders();

						// callback function
						option.append($contents);
					},
					error: function(err){
						console.error(err);
					}
				});
			}
		}

		function fillTheTop(){
			var prependTimerId = setInterval(function(){
				if ($upNav.length > 0 && distance('top') <= option.threshold) {
					prependContents();
				} else {
					clearInterval(prependTimerId);
				}
			}, option.timeout + 1);
		}

		function fillTheBtm(){
			var appendTimerId = setInterval(function(){
				if ($downNav.length > 0 && distance('bottom') <= option.threshold) {
					appendContents();
				} else {
					clearInterval(appendTimerId);
				}
			}, option.timeout + 1);
		}

		// Initial Rendering
		// If I use while, it doesn't wait ajax
		$(window).scrollTop(0);
		setPageBorders();
		fillTheTop();
		fillTheBtm();

		var nextPosFromTop = prevPosFromTop = distance('top');
		var nextPosFromBtm = prevPosFromBtm = distance('bottom');
		$(window).on('scroll', function(){
			nextPosFromTop = distance('top');
			nextPosFromBtm = distance('bottom');

			// When the position over the line
			if (prevPosFromTop > option.threshold && nextPosFromTop <= option.threshold) {
				fillTheTop();
			}
			if (prevPosFromBtm > option.threshold && nextPosFromBtm <= option.threshold) {
				fillTheBtm();
			}

			if (option.history) {
				for (var i = 0; i < pageBorders.length; i++) {
					var pageBorder = pageBorders[i];
					// Scrolling Down
					if (pageBorder.offsetTop - option.top > prevPosFromTop && pageBorder.offsetTop - option.top <= nextPosFromTop) {
						history.pushState(null, $(option.headline).text(), pageBorder.below);
						break;
					}
					// Scrolling Up
					if (pageBorder.offsetTop - option.top < prevPosFromTop && pageBorder.offsetTop - option.top >= nextPosFromTop) {
						history.pushState(null, $(option.headline).text(), pageBorder.above);
						break;
					}
				}
			}

			prevPosFromTop = nextPosFromTop;
			prevPosFromBtm = nextPosFromBtm;
		});

		return this;
	}
})(jQuery);


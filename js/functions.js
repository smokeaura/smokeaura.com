(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		$('.slider-primary .slides').owlCarousel({
			loop: true,
			items: 1,
			nav: true,
			dots: true,
		})

		$('.slider-timeline .slides').owlCarousel({
			loop: true,
			items: 1,
			nav: true,
			dots: true,
			startPosition: 5,
		})

		var tryUpdateClasses = function(){
		  if ($('.ico-prev')[0]) {
		    return
		  }

          $('.slider .owl-prev').addClass('ico-prev')
          $('.slider .owl-next').addClass('ico-next')

          requestAnimationFrame(tryUpdateClasses)
		}

        requestAnimationFrame(tryUpdateClasses)

		//Mobile Menu
		$('.nav-trigger').on('click', function (event) {
			event.preventDefault();

			$(this).toggleClass('active');

			$('.nav').toggleClass('visible');
		});
	});
})(jQuery, window, document);

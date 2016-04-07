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

		//Video
		var $playButton = $('#play-button'),
			videoPlayer = document.getElementById('background-video');
			$video = $(videoPlayer);

		$playButton.on('click touchend', function(event) {
			event.stopPropagation();
			event.preventDefault();

			$playButton.hide();
			videoPlayer.play();
		});

		$video.on('click touchend', function() {
			$playButton.show();
 			videoPlayer.pause();
		});
	});
})(jQuery, window, document);

$(document).ready(function(){
	$(".scroll").on("click","a", function (event) {

		event.preventDefault();


		var id  = $(this).attr('href'),


			top = $(id).offset().top;
		

		$('body,html').animate({scrollTop: top-55}, 1500);
	});
});





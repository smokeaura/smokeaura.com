(function($, window, document, undefined) {
    var $win = $(window);
    var $doc = $(document);

    $doc.ready(function() {
        $('.slider-about .slides').owlCarousel({
            loop: false,
            items: 1,
            nav: false,
            dots: false,
            mouseDrag:false,
            touchDrag:false
        })
        $('.slider-info .slides').owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            dots: true,
            startPosition: 2
        })
        $('.slider-timeline .slides').owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            dots: true,
            startPosition: 5
        })


        var tryUpdateClasses = function() {
            if ($('.ico-prev')[0]) {
                return
            }

            $('.slider .owl-prev').addClass('ico-prev')
            $('.slider .owl-next').addClass('ico-next')

            requestAnimationFrame(tryUpdateClasses)
        }

        requestAnimationFrame(tryUpdateClasses)

        //PopUp Age Menu
        $('.entr-yes').on('click', function(event) {
            event.preventDefault();
            $('.age_form').toggleClass('hidden');
            $('#background-video').attr('autoplay', 'play');
            document.getElementById('background-video').play();
        });






        //Mobile Menu
        $('.nav-trigger').on('click', function(event) {
            event.preventDefault();

            $(this).toggleClass('active');
            $('.nav').toggleClass('visible');
        });

        //Video
       var $playButton = $('.watch-video'),
            $bgVideo = $('.bg-video-box'),
            videoPlayer = document.getElementById('full-video');
        	$video = $(videoPlayer);


        $playButton.on('click touchend', function(event) {
            event.stopPropagation();
            event.preventDefault();
            $bgVideo.hide();
            $video.removeClass("hidden");
            videoPlayer.play();
            enterFullscreen(videoPlayer);
        });

        //Email Menu
        $('form').on('submit', function(event) {
            $('.email-box').removeClass('hidden');
        });

        $('.close').on('click', function(event) {
            event.preventDefault();
            $('.email-box').addClass('hidden');
        });

        $("body").click(function (event) {
            if ($(event.target).closest(".preord").length === 0) {
            $('.email_box').addClass('hidden');
            }
        });

    });


})(jQuery, window, document);

$(document).ready(function() {
    // Respond to AURA UPDATES span click
    $('.aura-updates').on('click', function(event) {
        // Focus input on form in header
        $('input.email-text')[0].focus();
        // Scroll back to top (to draw eye's attention to form
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        // Show menu on mobile (that is where form is)
        $('nav').addClass('visible');
    })

    $(".scroll").on("click", "a", function(event) {

        event.preventDefault();


        var id = $(this).attr('href'),


            top = $(id).offset().top;


        $('body,html').animate({ scrollTop: top - 55 }, 1500);
    });
});



function enterFullscreen(el) {
  var onfullscreenchange =  function(e){
    var fullscreenElement = document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement;
    var fullscreenEnabled = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled;
    console.log( 'fullscreenEnabled = ' + fullscreenEnabled, ',  fullscreenElement = ', fullscreenElement, ',  e = ', e);
  }

  el.addEventListener("webkitfullscreenchange", onfullscreenchange);
  el.addEventListener("mozfullscreenchange",     onfullscreenchange);
  el.addEventListener("fullscreenchange",             onfullscreenchange);

  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    el.mozRequestFullScreen();
  }
  document.querySelector('#'+id + ' button').onclick = function(){
    exitFullscreen(id);
  }
}

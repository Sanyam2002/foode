(function ($) {
	"use strict";



$(window).on('load', function () {
});

/*=============================================
	=    	   Toggle Active  	         =
=============================================*/

$('.cat-toggle').on('click', function () {
	$('.category-menu').slideToggle(500);
	return false;
});


/*=============================================
	=    		Mobile Menu			      =
=============================================*/

if ($('.mobile-menu').length) {

	//Menu Toggle Btn
	$('.mobile-nav-toggler').on('click', function () {
		$('body').addClass('mobile-menu-visible');
	});

	//Menu Toggle Btn
	$('.menu-backdrop, .mobile-menu .close-btn').on('click', function () {
		$('body').removeClass('mobile-menu-visible');
	});
};


/*=============================================
	=     Menu sticky & Scroll to top      =
=============================================*/
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$("#sticky-header").removeClass("sticky-menu");
		$('.scroll-to-target').removeClass('open');

	} else {
		$("#sticky-header").addClass("sticky-menu");
		$('.scroll-to-target').addClass('open');
	}
});


/*=============================================
	=    		 Scroll Up  	         =
=============================================*/
if ($('.scroll-to-target').length) {
  $(".scroll-to-target").on('click', function () {
    var target = $(this).attr('data-target');
    // animate
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000);

  });
};


/*=============================================
	=          Data Background               =
=============================================*/
$("[data-background]").each(function () {
	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
});


/*=============================================
	=    		 Cart Active  	         =
=============================================*/
$(".cart-plus-minus").append('<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>');
$(".qtybutton").on("click", function () {
	var $button = $(this);
	var oldValue = $button.parent().find("input").val();
	if ($button.text() == "+") {
		var newVal = parseFloat(oldValue) + 1;
	} else {
		// Don't allow decrementing below zero
		if (oldValue > 0) {
			var newVal = parseFloat(oldValue) - 1;
		} else {
			newVal = 0;
		}
	}
	$button.parent().find("input").val(newVal);
});

/*=============================================
	=    	  Countdown Active  	         =
=============================================*/
function getTimeRemaining(endtime) {
	const total = Date.parse(endtime) - Date.parse(new Date());
	const seconds = Math.floor((total / 1000) % 60);
	const minutes = Math.floor((total / 1000 / 60) % 60);
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
	const days = Math.floor(total / (1000 * 60 * 60 * 24));
	
	return {
	  total,
	  days,
	  hours,
	  minutes,
	  seconds
	};
  }
  
  function initializeClock(id, endtime) {
	const clock = document.getElementById(id);
	const daysSpan = clock.querySelector('.days');
	const hoursSpan = clock.querySelector('.hours');
	const minutesSpan = clock.querySelector('.minutes');
	const secondsSpan = clock.querySelector('.seconds');
  
	function updateClock() {
	  const t = getTimeRemaining(endtime);
  
	  daysSpan.innerHTML = t.days;
	  hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
	  minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
	  secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
	  if (t.total <= 0) {
		clearInterval(timeinterval);
	  }
	}
  
	updateClock();
	const timeinterval = setInterval(updateClock, 1000);
  }
  
  const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
  initializeClock('clockdiv', deadline);
/*=============================================
	=    		 Main Slider		      =
=============================================*/
// function mainSlider() {
// 	var BasicSlider = ('.slider-active');
// 	BasicSlider.on('init', function () {
// 		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
// 		doAnimations($firstAnimatingElements);
// 	});
// 	BasicSlider.on('beforeChange', function (nextSlide) {
// 		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
// 		doAnimations($animatingElements);
// 	});
// 	var BasicSlider = ()=>{BasicSlider.slick({
// 		autoplay: true,
// 		autoplaySpeed: 2000,
// 		dots: true,
// 		fade: true,
// 		arrows: false,
// 		responsive: [
// 			{ breakpoint: 767, settings: { dots: true, arrows: false } }
// 		]
// 	});
// }

// 	function doAnimations(elements) {
// 		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
// 		elements.each(function () {
// 			var $this = $(this);
// 			var $animationDelay = $this.data('delay');
// 			var $animationType = 'animated ' + $this.data('animation');
// 			$this.css({
// 				'animation-delay': $animationDelay,
// 				'-webkit-animation-delay': $animationDelay
// 			});
// 			$this.addClass($animationType).one(animationEndEvents, function () {
// 				$this.removeClass($animationType);
// 			});
// 		});
// 	}
// };



/*=============================================
	=    		Cart Active Two 	        =
=============================================*/
$('.qtybutton-box span').on("click", function () {
	var $input = $(this).parents('.num-block').find('input.in-num');
	if ($(this).hasClass('minus')) {
		var count = parseFloat($input.val()) - 1;
		count = count < 1 ? 1 : count;
		if (count < 2) {
			$(this).addClass('dis');
		}
		else {
			$(this).removeClass('dis');
		}
		$input.val(count);
	}
	else {
		var count = parseFloat($input.val()) + 1
		$input.val(count);
		if (count > 1) {
			$(this).parents('.num-block').find(('.minus')).removeClass('dis');
		}
	}
	$input.change();
	return false;
});




})(jQuery);
(function ($) {
  'use strict';

  // Global variables
  let ua = window.navigator.userAgent,
    msie = ua.indexOf("MSIE "),
    $window = $(window),
    $body = $('body'),
    $html = $('html'),
    openedMobileMenuClass = 'mobile-main-menu-active',
    disableBodyScrollClass = 'no-scroll',

    isMobile = function () {
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent);
    },
    htmlClass = isMobile() ? 'mobile' : 'desktop';

  $html.addClass(htmlClass);

  if (msie > 0) {
    $body.addClass('ie ie' + parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
  } else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    $body.addClass('ie ie11');
  }

  // Detect Safari browser.
  if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
    $('body').addClass('safari');
  }

  // Scroll to target function
  let scrollAnimate = function (scrollToItem, duration, callback) {
    $('html, body').stop().animate(
      {scrollTop: scrollToItem || 0},
      {
        duration: duration || 1000,
        complete: function () {
          if (typeof callback === 'function') {
            $window.bind('scroll', callback);
          }
        }
      });
  };

  /**
   * Disable body scroll.
   */
  function disableBodyScroll(disable = true) {
    if (disable) {
      $body.addClass(disableBodyScrollClass);
    } else {
      $body.removeClass(disableBodyScrollClass);
    }
  }

  // Set the date we're counting down to
  var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("hero-timer").innerHTML =
  '<span>' + minutes + "m" + "</span>:<span>" +seconds + "s" +"</span>";

  // If the count down is over, write some text
  if (distance < 0) {
  clearInterval(x);
  document.getElementById("hero-timer").innerHTML = "EXPIRED";
}
}, 1000);

  //  toggle menu


  (function toggleCatalogMenu() {
    var $openMobMenu = $('.open-main-menu');
    $openMobMenu.on('click', function (event) {
      event.preventDefault();
      $html.toggleClass('opened-mobile-main-menu');
      $(this).toggleClass('active');
    });
  })();

})(jQuery);

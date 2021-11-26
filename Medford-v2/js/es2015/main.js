"use strict";

(function ($) {
  'use strict'; // Global variables

  var ua = window.navigator.userAgent,
      customClick = ua.match(/iPad/i) || ua.match(/iPhone/) ? "touchstart" : "click",
      msie = ua.indexOf("MSIE "),
      $window = $(window),
      $body = $('body'),
      $html = $('html'),
      disableBodyScrollClass = 'no-scroll',
      isMobile = function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  },
      htmlClass = isMobile() ? 'mobile' : 'desktop';

  $html.addClass(htmlClass);
  /**
   * Disable body scroll.
   */

  function disableBodyScroll() {
    var disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (disable) {
      $body.addClass(disableBodyScrollClass);
    } else {
      $body.removeClass(disableBodyScrollClass);
    }
  }
  /**
   * Toggle mobile menu.
   */


  (function toggleMobileMenu() {
    var activeMenuClass = 'active-mobile-menu';
    $('.header__menu-icon, .close-menu').on('click', function () {
      $body.toggleClass(activeMenuClass);
      disableBodyScroll($body.hasClass(activeMenuClass));
    });
  })();
  /**
   * Toggle tabs.
   */


  (function toggleTabs() {
    $('.js-tabs__nav-item').on('click', function (event) {
      var $this = $(this);
      var $wrapper = $this.closest('.js-tabs');
      var $content = $wrapper.find('.js-tabs__content');
      var $controlNav = $wrapper.find('.js-tabs__nav');
      var $controlLink = $wrapper.find('.js-tabs__nav-item');
      var $index = $this.index();
      var activeClass = 'active';
      var activeNavClass = 'active-nav';
      event.preventDefault();

      if ($this.hasClass(activeClass)) {
        $controlNav.addClass(activeNavClass);
      } else {
        $controlNav.removeClass(activeNavClass);
      }

      $controlLink.removeClass(activeClass);
      $this.addClass(activeClass);
      $content.removeClass(activeClass);
      var $activeContent = $content.filter(':eq(' + $index + ')');
      $activeContent.addClass(activeClass);
    });
  })();
})(jQuery);
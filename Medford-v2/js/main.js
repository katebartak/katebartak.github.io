(function ($) {
  'use strict';


  // Global variables
  let ua = window.navigator.userAgent,
    customClick = (ua.match(/iPad/i) || ua.match(/iPhone/)) ? "touchstart" : "click",
    msie = ua.indexOf("MSIE "),
    $window = $(window),
    $body = $('body'),
    $html = $('html'),
    disableBodyScrollClass = 'no-scroll',

    isMobile = function () {
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent);
    },
    htmlClass = isMobile() ? 'mobile' : 'desktop';

  $html.addClass(htmlClass);

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

  /**
   * Toggle mobile menu.
   */
  (function toggleMobileMenu() {
    const activeMenuClass = 'active-mobile-menu';

    $('.header__menu-icon, .close-menu').on('click', () => {
      $body.toggleClass(activeMenuClass);
      disableBodyScroll($body.hasClass(activeMenuClass))
    });
  })();

  /**
   * Toggle tabs.
   */
  (function toggleTabs() {
    $('.js-tabs__nav-item').on('click', function (event) {
      const $this = $(this);

      const $wrapper = $this.closest('.js-tabs');

      const $content = $wrapper.find('.js-tabs__content');
      const $controlNav = $wrapper.find('.js-tabs__nav');
      const $controlLink = $wrapper.find('.js-tabs__nav-item');

      const $index = $this.index();
      const activeClass = 'active';
      const activeNavClass = 'active-nav';

      event.preventDefault();

      if ($this.hasClass(activeClass)) {
        $controlNav.addClass(activeNavClass);
      } else {
        $controlNav.removeClass(activeNavClass);
      }

      $controlLink.removeClass(activeClass);
      $this.addClass(activeClass);

      $content.removeClass(activeClass);

      const $activeContent = $content.filter(':eq(' + $index + ')');
      $activeContent.addClass(activeClass);
    });
  })();

})(jQuery);

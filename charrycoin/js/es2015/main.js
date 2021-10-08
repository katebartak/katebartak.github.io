"use strict";

(function ($) {
  'use strict'; // Global variables

  var ua = window.navigator.userAgent,
      msie = ua.indexOf("MSIE "),
      $window = $(window),
      $body = $('body'),
      $html = $('html'),
      openedMobileMenuClass = 'opened-mobile-main-menu',
      disableBodyScrollClass = 'no-scroll',
      isMobile = function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  },
      htmlClass = isMobile() ? 'mobile' : 'desktop';

  $html.addClass(htmlClass);

  if (msie > 0) {
    $body.addClass('ie ie' + parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
  } else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    $body.addClass('ie ie11');
  } // Detect Safari browser.


  if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
    $('body').addClass('safari');
  } // Scroll to target function


  var scrollAnimate = function scrollAnimate(scrollToItem, duration, callback) {
    $('html, body').stop().animate({
      scrollTop: scrollToItem || 0
    }, {
      duration: duration || 1000,
      complete: function complete() {
        if (typeof callback === 'function') {
          $window.bind('scroll', callback);
        }
      }
    });
  };
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
   * Header nav scroll.
   */


  (function heroNavScroll() {
    $('.h-nav__item').on('click', function (event) {
      var $item = $($(this).attr('href'));

      if ($item.length) {
        event.preventDefault();
        closeMenu();
        scrollAnimate($item.offset().top - $('.site-header').outerHeight(true));
      }
    });
  })();
  /**
   * Project slider.
   */


  var projectSliderClass = 'project-info-slider';

  function projectSliderInit($slider) {
    if ($slider.find('.project-info-slider__item').length < 2) return;
    $slider.slick({
      dots: true,
      adaptiveHeight: true
    });
  }

  function projectSliderDestroy($slider) {
    if ($slider.hasClass('slick-initialized')) {
      $slider.slick('destroy');
    }
  }
  /**
   * Toggle tabs.
   */


  (function toggleTabs() {
    var $controlLink = $('.project-tabs__item');
    var $content = $('.project-content');
    $controlLink.on('click', function (event) {
      var $this = $(this);
      var $index = $this.index();
      var activeClass = 'active';
      event.preventDefault();
      $controlLink.removeClass(activeClass);
      $this.addClass(activeClass);
      projectSliderDestroy($content.filter(activeClass).find("." + projectSliderClass));
      $content.removeClass(activeClass);
      $content.filter(':eq(' + $index + ')').addClass(activeClass);
      projectSliderInit($content.filter(':eq(' + $index + ')').find("." + projectSliderClass));
    });
  })();
  /**
   * Hidden team members.
   */


  (function hiddenTeamMembers() {
    var $moreButton = $(".our-team__other");

    if ($('.our-team__item').length < 7) {
      $moreButton.remove();
    }

    $moreButton.on('click', function (event) {
      event.preventDefault();
      var $this = $(this);
      $this.closest('.our-team').addClass('show-all');
      $this.remove();
    });
  })();
  /**
   * Toggle menu.
   */


  function openMenu() {
    $body.addClass(openedMobileMenuClass);
    disableBodyScroll();
  }

  function closeMenu() {
    $body.removeClass(openedMobileMenuClass);
    disableBodyScroll(false);
  }

  (function toggleCatalogMenu() {
    $('.open-main-menu').on('click', function (event) {
      event.preventDefault();

      if (!$body.hasClass(openedMobileMenuClass)) {
        openMenu();
      } else {
        closeMenu();
      }
    });
  })();
  /**
   * Sticky header.
   */


  (function stickyHeader() {
    $window.on('scroll', function () {
      if (window.scrollY) {
        $body.addClass('sticky-header');
      } else {
        $body.removeClass('sticky-header');
      }
    });
  })();
  /**
   * How it works mobile slider.
   */


  (function howItWorksSlider() {
    $('.mobile-slick').slick({
      dots: true,
      arrows: false,
      mobileFirst: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 768,
        settings: 'unslick'
      }]
    });
  })();
  /**
   * Language switcher.
   */
  // (function languageSwitcher() {
  //   const path = window.location.pathname;
  //   const $link = $(`.lang-switcher__item[href="${path}"]`);
  //   if ($link.length) {
  //     $link.addClass('active');
  //   }
  // })();

})(jQuery);
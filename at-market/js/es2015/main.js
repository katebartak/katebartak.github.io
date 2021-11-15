"use strict";

(function ($) {
  'use strict'; // Global variables

  var ua = window.navigator.userAgent,
      msie = ua.indexOf("MSIE "),
      $window = $(window),
      $body = $('body'),
      $html = $('html'),
      openedMobileMenuClass = 'mobile-main-menu-active',
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
   * Show search area.
   */


  (function showSearch() {
    $('.form-type-search a').on('click', function () {
      $('.form-type-search').toggleClass('active');
    });
  })();
  /**
   * Toggle mobile menu.
   */


  (function toggleMobileMenu() {
    var activeMenuClass = 'active-mobile-menu';
    $('.header__menu-icon, .close-menu').on('click', function () {
      $body.toggleClass(activeMenuClass); // disableBodyScroll($body.hasClass(activeMenuClass))
    });
  })();
  /**
   * Show catalog.
   */


  (function showSearch() {
    $('.header__nav-catalog-item').on('click', function (event) {
      event.preventDefault();
      $('.header__nav-catalog').toggleClass('active');
    });
  })();
  /**
   * Home page hero slider.
   */


  $('.hero-section-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  });
  /**
   * Product list slider.
   */

  function productListSlider($slider) {
    $slider.slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: true,
      dots: true,
      responsive: [{
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      }]
    });
  }

  productListSlider($('.product-list'));
  /**
   * Toggle tabs.
   */

  (function toggleTabs() {
    $('.js-tabs__nav-item').on('click', function (event) {
      var $this = $(this);
      var $wrapper = $this.closest('.js-tabs');
      var $content = $wrapper.find('.js-tabs__content');
      var $controlNav = $wrapper.find('.js-tabs__nav');
      var $controlLink = $wrapper.find('.js-tabs__nav-item'); //
      // const $wrapper = $this.closest('.tabs-wrapper');
      //
      // const $content = $wrapper.find('.section-tabs__content');
      // const $controlNav = $wrapper.find('.section-tabs');
      // const $controlLink = $wrapper.find('.section-tabs-item');

      var $index = $this.index();
      var activeClass = 'active';
      var activeNavClass = 'active-nav';
      event.preventDefault();
      $content.find('.slick-initialized').slick('destroy');

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
      productListSlider($activeContent.find('.product-list'));
      brandsSlider($activeContent.find('.brands__slider'));
      reviewSlider($activeContent.find('.product-tabs__reviews-slider'));
    });
  })();
  /**
   * Brands slider.
   */


  function brandsSlider($slider) {
    $slider.slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: false,
      dots: true,
      responsive: [{
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }]
    });
  }

  brandsSlider($('.brands__slider'));
  /**
   * Show mobile catalog.
   */

  (function showMobileCatalog() {
    var activeClass = 'active';
    $('.header__nav-catalog-title').on('click', function (event) {
      if (window.innerWidth < 1279) {
        event.preventDefault();
        $(this).toggleClass(activeClass);
        $(this).next('.header__nav-catalog-group').toggleClass(activeClass);
      }
    });
  })();
  /**
   * Show catalog list item.
   */


  (function showCatalogListItem() {
    var activeClass = 'active';
    $('.sidebar-item__title').on('click', function (event) {
      event.preventDefault();
      $(this).toggleClass(activeClass);
      $(this).next('.sidebar-group').toggleClass(activeClass);
    });
  })();
  /**
   * Show main catalog list item.
   */


  (function showMainCatalogListItem() {
    var activeClass = 'active';
    $('.main-catalog .sidebar-title').on('click', function (event) {
      if (window.innerWidth < 1199) {
        event.preventDefault();
        $(this).toggleClass(activeClass);
        $(this).next('.sidebar-filters-wrap').toggleClass(activeClass);
      }
    });
  })();

  function reviewSlider($slider) {
    $slider.slick({
      slidesToShow: 1,
      centerMode: true,
      arrows: false,
      dots: true,
      responsive: [{
        breakpoint: 1920,
        settings: {
          centerMode: false
        }
      }]
    });
  }
  /**
   * Sticky tabs
   */


  (function stickyTabs() {
    $window.on('scroll', function () {
      var $stickyTabs = $('.product-tabs__sticky');
      var $description = $('.product-tabs');
      var fixedClass = 'fixed';
      if (!$stickyTabs.length) return;
      if (!$description.length) return;
      var st = window.scrollY;
      var topPosition = $stickyTabs.offset().top;
      var bottomPosition = $description.offset().top + $description.outerHeight();

      if (st >= topPosition && st <= bottomPosition) {
        $stickyTabs.height($stickyTabs.height()).addClass(fixedClass);
      } else {
        $stickyTabs.removeAttr('style').removeClass(fixedClass);
      }
    });
  })(); // show popup form


  (function showPopupForm() {
    var $showPopup = $('[data-show-popup]');
    var $hidePopup = $('.section-popup, .section-popup-thanks').find('.popup-close-icon, .popup-overlay');
    var activeClass = 'active';
    $showPopup.on('click', function (event) {
      event.preventDefault();
      var $this = $(this);
      $('.' + $this.data('show-popup')).addClass(activeClass);
      disableBodyScroll();
    });
    $hidePopup.on('click', function (event) {
      event.preventDefault();
      $(this).closest('.section-popup').removeClass(activeClass);
      disableBodyScroll(false);
    });
  })();
  /**
   * About company slider.
   */


  $('.about-content__slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  });
  /**
   * Show order in ordering page.
   */

  (function showOrderOrderingPage() {
    var activeClass = 'active';
    $('.ordering-page__order-title').on('click', function (event) {
      if (window.innerWidth < 767) {
        event.preventDefault();
        $(this).toggleClass(activeClass);
        $(this).next('.ordering-page__order-content').toggleClass(activeClass);
      }
    });
  })();
  /**
   * Toggle catalog active class.
   */


  (function toggleCatalogActiveClass() {
    var activeClass = 'active';
    $('.standart-hero__item').on('click', function (event) {
      event.preventDefault();
      $('.standart-hero__item').toggleClass(activeClass);
    });
  })();

  function setCookie(name, value, days) {
    var expires = "";

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  }

  function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  (function cookieConsent() {
    $(".cookies-popup .popup-close-icon").on('click', function () {
      setCookie('cookie_consent', 1, 30);
    });

    if (!getCookie('cookie_consent')) {
      $(".cookies-popup").addClass('active');
    }
  })();
})(jQuery);
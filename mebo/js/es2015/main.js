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
   * New items slider
   */


  $('.product-gallery__slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    row: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        rows: 2,
        slidesPerRow: 1,
        adaptiveHeight: true
      }
    }]
  });
  /**
   * Colors slider
   */

  $('.product-gallery__item .product-gallery__colors-slider').slick({
    infinite: true,
    slidesToShow: 11,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 8
      }
    }]
  });
  /**
   * Product page colors slider
   */

  $('.product-description .product-gallery__colors-slider').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 7
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    }]
  });
  /**
   * Show Catalog Menu
   */

  (function showNavList() {
    $('.header__nav-catalog-item').on('click', function () {
      $('body').toggleClass('active-catalog-menu');
    });
  })();
  /**
   * Show more product variant
   */


  (function showMoreProductVariant() {
    $('.product-description__show-more').on('click', function () {
      $('.product-gallery__colors').removeClass('additionally-variant');
      $(window).trigger('resize');
    });
  })();
  /**
   * Show Filters
   */


  (function showFilters() {
    $('.filters-btn').on('click', function () {
      $('.filters-wrap').toggleClass('active');
    });
  })();
  /**
   * Toggle mobile menu.
   */


  (function toggleMobileMenu() {
    var activeMenuClass = 'active-mobile-menu';
    $('.toggle-mobile-menu').on('click', function () {
      $body.toggleClass(activeMenuClass); // disableBodyScroll($body.hasClass(activeMenuClass))
    });
  })();

  (function priceFilter() {
    var mySlider = document.querySelector('.noUiSlider');
    if (!mySlider) return;
    var dateValues = [document.getElementById('event-start'), document.getElementById('event-end')];
    noUiSlider.create(mySlider, {
      range: {
        min: 100,
        max: 10000
      },
      orientation: 'horizontal',
      start: [100, 10000],
      connect: true
    }).on('update', function (values, handle) {
      dateValues[handle].innerHTML = (+values[handle]).toFixed();
    });
  })();
  /**
   * Product hero slider.
   */


  $('.product-hero__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.product-hero__slider-nav'
  });
  $('.product-hero__slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-hero__slider',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    vertical: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        vertical: false
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        vertical: false
      }
    }]
  });
  /**
   * Toggle tabs.
   */

  (function toggleTabs() {
    var $controlNav = $('.product-tabs__nav');
    var $controlLink = $('.product-tabs__nav-item');
    var $content = $('.product-tabs__content-item');
    $controlLink.on('click', function (event) {
      var $this = $(this);
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
      if ($this.closest('.section-ordering__wrap').length && screen.width < 1024) return;
      $content.filter(':eq(' + $index + ')').addClass(activeClass);
    });
  })();
  /**
   * Toggle map.
   */


  (function toggleMap() {
    var $mapSelect = $('.contact-addresses .form-select');
    var $mapSelectItem = $('.contact-addresses .form-type-select');
    var $contentMap = $('.contact-addresses__content');
    var activeClass = 'active';
    $mapSelect.change(function () {
      var choose = $(this).find(':selected').val();
      $contentMap.removeClass(activeClass);
      var $activeContent = $contentMap.filter("[data-content=\"" + choose + "\"]");

      if ($activeContent.length) {
        $activeContent.addClass(activeClass);
      }

      $mapSelectItem.removeClass(activeClass);
      var $activeChildSelect = $mapSelectItem.filter("[data-parent-select=\"" + choose + "\"]");

      if ($activeChildSelect.length) {
        $activeChildSelect.addClass(activeClass);
      }
    });
  })(); // var productShortName = $('.product-gallery__item-name');
  // if(productShortName.length > 25) {
  //   productShortName = productShortName.substring(0,24)+"...";
  // }
  // show popup form


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
      $('.section-popup').removeClass(activeClass);
      disableBodyScroll(false);
    });
  })();
  /**
   * Detect small items in category listing.
   */


  (function smallItemsCategory() {
    if (!$('.catalog-list').length) return;
    if (screen.width < 1024) return;
    var $sidebar = $('.category-page__sidebar');
    var $sidebarTop = $sidebar.offset().top;
    var $sidebarBottom = $sidebarTop + $sidebar.outerHeight(true);
    var smallClass = 'item-small';
    var $containerBigItems = $('.product-gallery__big-list');
    $('.product-gallery__item').each(function () {
      var $this = $(this);
      $this.addClass(smallClass);
      var $thisTop = $this.offset().top;
      var $difference = $thisTop - $sidebarBottom;

      if ($difference > -100) {
        $this.removeClass(smallClass);
        $containerBigItems.append($this.detach());
      }
    });
  })();
})(jQuery);
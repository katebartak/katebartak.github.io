"use strict";

(function ($) {
  'use strict'; // Global variables

  var ua = window.navigator.userAgent,
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
   * Home full page scroll.
   */

  (function homeFullPageScroll() {
    // apply only on desktop
    if (window.innerWidth < 1024) return;
    if (typeof $.fn.fullpage === 'undefined') return;
    var $wrapper = $('.hero-section__fullpage');
    if (!$wrapper.length) return; // docs https://github.com/alvarotrigo/fullPage.js/tree/2.9.7

    $wrapper.fullpage({
      menu: '.hero-section__menu',
      sectionSelector: '.hero-section__content',
      lockAnchors: true,
      // do not write hash in url
      controlArrows: false
    });
    $('.hero-section__arrow').on('click', function () {
      $.fn.fullpage.moveSectionDown();
    });
    $('.hero-section__sidebar .main-logo').on('click', function (event) {
      event.preventDefault();
      $.fn.fullpage.moveTo('product');
    });
    $('[data-menuanchor]').on('click', function (event) {
      event.preventDefault();
      $.fn.fullpage.moveTo($(this).data('menuanchor'));
    });
  })();

  $('.hero-section__arrow').on('click', function () {
    if (window.innerWidth < 1023) {
      var target = $('[data-anchor="about"]').offset().top;
      window.scrollTo({
        top: target,
        behavior: "smooth"
      });
    }
  });
  /**
   * Home hero section slider
   */

  (function homeHeroSectionSlider() {
    $('.hero-section__slider').slick({
      autoplay: true,
      dots: true,
      arrows: false,
      pauseOnHover: false,
      responsive: [{
        breakpoint: 1024,
        settings: {
          dots: false
        }
      }]
    });
  })();
  /**
   * brands slider
   */


  (function brandsSLider() {
    var slidesToShow = $('.category-page').length ? 3 : 4;
    $('.brands-slider').slick({
      autoplay: false,
      dots: true,
      arrows: false,
      pauseOnHover: false,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1024,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });
  })();
  /**
   * partners slider
   */


  (function partnersSLider() {
    $('.partners-slider').slick({
      autoplay: false,
      dots: true,
      arrows: false,
      pauseOnHover: false,
      variableWidth: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1024,
        settings: "unslick"
      }]
    });
  })();

  (function aboutImagesSLider() {
    $('.about-images__slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      mobileFirst: true,
      responsive: [{
        breakpoint: 1024,
        settings: "unslick"
      }]
    });
  })();

  (function productSlider() {
    $('.product-hero__for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      asNavFor: '.product-hero__nav'
    });
    $('.product-hero__nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      asNavFor: '.product-hero__for',
      focusOnSelect: true
    });
  })(); // toggle tabs


  (function toggleTabs() {
    var $controlLink = $('.product-description__tabs-item'),
        $content = $('.product-description__item');
    $controlLink.on('click', function (event) {
      var $index = $(this).index();
      event.preventDefault();
      $controlLink.removeClass('active');
      $(this).addClass('active');
      $content.removeClass('active');
      $content.filter(':eq(' + $index + ')').addClass('active');
    });
  })();

  (function productSimilarSlider() {
    $('.product-similar-slider').slick({
      autoplay: false,
      dots: true,
      arrows: false,
      pauseOnHover: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      row: 1,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
          slidesPerRow: 2,
          adaptiveHeight: true
        }
      }]
    });
  })();
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
    $('.toggle-mobile-menu, .close-mobile-menu').on('click', function () {
      $body.toggleClass(activeMenuClass);
      disableBodyScroll($body.hasClass(activeMenuClass));
    });
    $('.menu-item-has-children').on('click', function (event) {
      if (window.innerWidth > 1023) return;
      event.preventDefault();
      $(this).toggleClass('show-children');
    });
  })();
  /**
   * Back to top button.
   */


  (function backToTop() {
    var $button = $('.back-to-top');
    var activeClass = 'active';
    if (!$button.length) return;
    $button.on('click', function () {
      return window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
    $window.on('scroll', function () {
      window.scrollY > 100 ? $button.addClass(activeClass) : $button.removeClass(activeClass);
    });
  })();
  /**
   * Category sidebar filters.
   */


  (function categorySidebarFilters() {
    $('.sidebar-group__title, .sidebar-item__title').on('click', function () {
      $(this).toggleClass('active');
    });
  })();
  /**
   * Visible items count.
   *
   * Hide items and add show more button
   */


  (function visibleItemsCount() {
    var hiddenClass = 'hidden';
    $('[data-visible-items-count]').each(function () {
      var $this = $(this);
      var minBreakpoint = $this.data('visible-items-min-breakpoint') || false;
      var maxBreakpoint = $this.data('visible-items-max-breakpoint') || false;
      if (minBreakpoint && window.innerWidth < minBreakpoint) return;
      if (maxBreakpoint && window.innerWidth > maxBreakpoint) return;
      var visibleCount = $this.data('visible-items-count');
      var showMoreText = $this.data('visible-items-textmore') || 'Показать все';
      var $children = $this.children();
      var $childrenLength = $children.length;

      if ($childrenLength > visibleCount) {
        for (var i = visibleCount; i <= $childrenLength; i++) {
          $($children[i]).addClass(hiddenClass);
        }
      }

      var $showMoreButton = "<button class=\"visible-items-show\">" + showMoreText + "</button>";
      $this.append($showMoreButton);
    });
    $('.visible-items-show').on('click', function () {
      var $this = $(this);
      $this.siblings("." + hiddenClass).removeClass(hiddenClass);
      $this.remove();
    });
  })();
  /**
   * Show-hide popup.
   */


  (function showHidePopup() {
    var activePopupClass = 'active-request-popup';
    var activePopupMarker = 'popup-can-be-closed';
    $('.write-to-us').on('click', function () {
      $body.addClass(activePopupClass + " " + activePopupMarker);
      disableBodyScroll();
    });
    $('.request-hero__link').on('click', function (event) {
      if ($body.hasClass(activePopupMarker)) {
        event.preventDefault();
        $body.removeClass(activePopupClass + " " + activePopupMarker);
        disableBodyScroll(false);
      }
    });
  })();
  /**
   * Sticky tabs
   */


  (function stickyTabs() {
    $window.on('scroll', function () {
      var $stickyTabs = $('.product-description__tabs-wrap');
      var $description = $('.product-description');
      var fixedClass = 'fixed';
      if (!$stickyTabs.length) return;
      if (!$description.length) return;
      var st = window.scrollY;
      var topPosition = $stickyTabs.offset().top;
      var bottomPosition = $description.offset().top + $description.outerHeight(true);

      if (st >= topPosition && st <= bottomPosition) {
        $stickyTabs.height($stickyTabs.height()).addClass(fixedClass);
      } else {
        $stickyTabs.removeAttr('style').removeClass(fixedClass);
      }
    });
  })();
})(jQuery);
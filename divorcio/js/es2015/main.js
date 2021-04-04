"use strict";

(function ($) {
  var $html = $('html');
  /**
   * Toggle menu
   */

  (function toggleCatalogMenu() {
    $('.open-main-menu').on('click', function (event) {
      event.preventDefault();
      $html.removeClass('catalog-menu-opened');
      $html.toggleClass('opened-mobile-main-menu');
      $(this).toggleClass('active');
    });
  })();
  /**
   * Slider reviews
   */


  (function reviewsSlider() {
    var $slider = $('.reviews-slider');
    if (!$slider.length) return;
    $slider.slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow: '<div class="slick-prev"></div>',
      nextArrow: '<div class="slick-next"></div>',
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false
        }
      }]
    });
  })();
})(jQuery);
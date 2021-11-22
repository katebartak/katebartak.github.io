(function ($) {
  'use strict';


  // Global variables
  let ua = window.navigator.userAgent,
    customClick = (ua.match(/iPad/i) || ua.match(/iPhone/)) ? "touchstart" : "click",
    msie = ua.indexOf("MSIE "),
    $window = $(window),
    $body = $('body'),
    $html = $('html'),

    isMobile = function () {
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent);
    },
    htmlClass = isMobile() ? 'mobile' : 'desktop';

  $html.addClass(htmlClass);

  if (msie > 0) {
    $body.addClass('ie ie' + parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
  }
  else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    $body.addClass('ie ie11');
  }

  // Detect Safari browser.
  if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
    $('body').addClass('safari');
  }

  /**
   * Headline slider.
   */

  $('.autoplay').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 6000,
    cssEase: 'linear',
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  });

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

      $content.find('.slick-initialized').slick('destroy');

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

      portfolioSlider($activeContent.find('.portfolio-slider'));
    });
  })();

  function portfolioSlider($slider) {
    $slider.slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    });
  }

  portfolioSlider($('.portfolio-slider'));

})(jQuery);

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

  function disableBodyScroll($true = true) {
    if ($true) {
      $html.addClass('scroll-prevented');
    } else {
      $html.removeClass('scroll-prevented');
    }
  }

  // Init home top slider
  (function initHomeTopSlider() {
    var $homeSlider = $('.home-top-slick-slider');

    if (!$homeSlider.length) return;

    $homeSlider.slick({});
  })();

  // init phone mask
  (function initPhoneMask() {
    var $mask = $('.init-mask');

    if (!$mask.length) return;

    $mask.mask('+7 (999) 999-9999');
  })();

  // init home objects slider
  (function initHomeObjectsSlider() {
    var $slider = $('.home-objects-slider');

    if (!$slider.length) return;

    $slider.slick({
      dots: true
    });

    if ($slider.find('.slick-slide-wrap[data-caption]').length) {
      $slider.slickLightbox({
        itemSelector: '.slick-slide-wrap',
        caption: 'caption',
        lazy: true,
      });
    } else
    if ($slider.find('.object-link').length) {
      $slider.find('.object-link[title]').each( function() {
        const $this = $(this);
        $this.attr('data-caption', $this.attr('title'));
      });

      $slider.slickLightbox({
        itemSelector: '.object-link',
        caption: 'caption',
        lazy: true,
      });
    }
  })();

  // init home rewiews slider with lightbox
  (function initHomeReviewsSliderWithLightbox() {
    var $slider = $('.home-reviews-slider');

    if (!$slider.length) return;

    $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    }).slick('resize').slickLightbox({
      itemSelector: '.slick-slide-content',
      caption: 'caption',
      lazy: true,

    });
  })();

  // init objects lightbox
  (function initObjectsLightbox() {
    $('.objects-main-wrap').slickLightbox({
      itemSelector: '.slick-slide-wrap',
      caption: 'caption',
      lazy: true,
    });
  })();

  // init home certificate slider with lightbox
  (function initHomeCertificateSliderWithLightbox() {
    var $slider = $('.home-certificate-slider');

    if (!$slider.length) return;

    $slider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    }).slick('resize').slickLightbox({
      itemSelector: '.slick-slide-content',
      lazy: true,
    });
  })();

  // init home rewiews page lightbox
  (function initHomeReviewsSliderWithLightbox() {
    var $lightbox = $('.reviews-main-wrap');

    if (!$lightbox.length) return;

    $lightbox.slickLightbox({
      itemSelector: '.slick-slide-content',
      caption: 'caption',
      lazy: true,
    });
  })();

  // init products slider
  (function initProductsSlider() {
    var $slider = $('.products-slick-slider'),
        $sliderSlideClount = $slider.find('.products-slider-item').length;

    if (!$slider.length || $slider.hasClass('slider-two-items')) return;

    if ($sliderSlideClount < 4) {
      $slider.addClass('slider-tree-items');
    } else {
      $slider.addClass('more-then-tree-items');
    }

    $slider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 0,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            centerMode: false
          }
        },
      ]
    }).slick('resize');
  })();

  // toggle mobile menu
  (function toggleMobileMenu() {
    var $openMobMenu = $('.header-open-mobile-menu, .header-nav-close');
    $openMobMenu.on('click', function (event) {
      event.preventDefault();
      $body.toggleClass('opened-header-nav');

      if ($body.hasClass('opened-header-nav')) {
        disableBodyScroll();
      } else {
        disableBodyScroll(false);
      }
    });
  })();

  // popup choose city
  (function toggleChooseCityPopup() {
    var $toggleButton = $('.header-topline-city, .choose-popup-close, .choose-popup-overlay'),
        $popup = $('.popup-choose-city'),
        activeClass = 'popup-choose-city-active';

    if (!$popup.length) return;

    var siteUrl = window.location.hostname,
      regex = /^([a-z0-9]{1,})./gi,
      res = regex.exec(siteUrl);

    var $actialCity = $('.choose-popup-link[data-city="' + res[1] + '"]');

    if ($actialCity.length) {
      $actialCity.addClass('actual');
      $('.header-topline-city span').text($actialCity.text());
    }

    $toggleButton.on('click', function() {
      $body.toggleClass(activeClass);

      if ($body.hasClass(activeClass)) {
        disableBodyScroll();
      } else {
        disableBodyScroll(false);
      }
    });
  })();

  // choose city links
  (function ChooseCityLinks() {
    var $chooseLink = $('.choose-popup-link');
    $chooseLink.on('click', function(event) {
      event.preventDefault();
      // var siteUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      var siteUrl = window.location.hostname,
          regex = /^([a-z0-9]{1,})./gi,
          res = regex.exec(siteUrl),
          newUrl = siteUrl.replace(res[1] + '.' , $(this).data('city') + '.');
      window.location.href = window.location.protocol + "//" + newUrl + window.location.pathname;
    });
  })();

  // popup product info
  (function toggleProductProductInfoPopup() {
    var $popup = $('.popup-product-info'),
        $closeButton = $('.productinfo-popup-overlay, .productinfo-popup-close'),
        $openButton = $('.products-slider-item-more[data-product]');

    if (!$popup.length) return;

    $openButton.on('click', function() {
      var $productId = $(this).data('product'),
          $popupToShow = $popup.filter('[data-product=' + $productId + ']');

      if (!$popupToShow.length) return;

      $popupToShow.addClass('active');
      disableBodyScroll();
    });

    $closeButton.on('click', function() {
      $popup.removeClass('active');
      disableBodyScroll(false);
    });

  })();

  // product detail page image sliders
  (function productThumbSliders() {
    var $sliderPreviewClass = '.infotabs-info-preview',
        $sliderPictureClass = '.infotabs-info-picture',
        $sliderPreview = $($sliderPreviewClass),
        $sliderPicture = $($sliderPictureClass);

    if (!$sliderPreview.length || !$sliderPicture.length) return;

    $sliderPreview.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: $sliderPictureClass,
      dots: false,
      arrows: false,
      focusOnSelect: true,
      variableWidth: true,
      vertical: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            vertical: false,
          }
        },
      ]
    });

    $sliderPicture.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: $sliderPreviewClass,
      dots: false,
      arrows: false,
    }).slick('resize');

  })();

  (function productExpandedText() {
    var $text = $('.infotabs-infodata-text'),
        $expandButton = $('.infotabs-expand-button');

    if (!$text.length || $text.height() < 245) return;

    $text.attr('data-height', $text.height())
         .addClass('expand-active')
         .animate({'height': 245}, 100);

    $expandButton.on('click', function() {
      var $this = $(this),
          $targetText = $this.parent('.infotabs-expand-button-wrap').prev('.infotabs-infodata-text');
      $targetText.animate({'height': $targetText.data('height')}, 500, function() {
        $targetText.removeAttr('style')
                   .removeClass('expand-active');
      });
    });
  })();

  (function productInfotabs() {
    var $tabsControl = $('.infotabs-controls-item'),
        $tabsContent = $('.infotabs-content-item');

    $tabsControl.on('click', function() {
      const $this = $(this);
      var $tabToShow = $this.data('tabs');

      $tabsControl.removeClass('active');
      $this.addClass('active');
      $tabsContent.removeClass('active');
      $tabsContent.filter('[data-tabs=' + $tabToShow + ']').addClass('active')
    })
  })();

  (function firstscreenExpandText() {
    var $firstscreenText = $('.firstscreen-note'),
        $expandButton = $('.expand-firstscreen-note');

    if (!$firstscreenText.length || !$expandButton.length || $firstscreenText.children().length < 3) return;

    $firstscreenText.children(':eq(1)').append($expandButton.detach());
    $firstscreenText.addClass('collapsed-text');

    $expandButton.on('click', function() {
      $(this).parents('.firstscreen-note').removeClass('collapsed-text')
                                          .addClass('expanded-text');
    });
  })();

  (function toggleFormPopup() {
    var $popup = $('.section-form-popup'),
        $openPopupButton = $('.open-form-popup'),
        $closePopupButton = $popup.find('.general-popup-overlay, .general-popup-close');

    $openPopupButton.on('click', function() {
      if (!$popup.length) return;
      $body.addClass('popup-form-opened');
    });

    $closePopupButton.on('click', function () {
      $body.removeClass('popup-form-opened');
    });
  })();

  // lazy loading images
  (function lazyLoadingImages() {
    var MSIE8 = (/msie|trident/i).test(navigator.userAgent);
    // var MSIE8 = (jQuery.browser.msie) && (jQuery.browser.version == 8);
    $('img[data-src]').bind('load', img_load_complete);
    $(window).bind('resize', img_loader).bind('scroll', img_loader).trigger('scroll');

    function img_loader(){
      var get_img = $('img[data-src]').eq(0);

      if(get_img[0]){
        var visible_height = $(window).scrollTop() + ($(window).height() * 2),
          img_top_position = get_img.offset().top;

        if(img_top_position < visible_height){
          get_img.attr({'src':get_img.attr('data-src')}).removeAttr('data-src');
          if(!MSIE8){
            get_img.fadeOut(0)
          }
        }
      } else {
        $(window).unbind('resize', img_loader).unbind('scroll', img_loader);
      }
    }
    function img_load_complete(){
      $(this).unbind('load');
      if(!MSIE8){
        $(this).fadeIn(500)
      }
      img_loader();
    }
  })();

})(jQuery);

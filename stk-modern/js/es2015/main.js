"use strict";

(function ($) {
  'use strict'; // Global variables

  var ua = window.navigator.userAgent,
      customClick = ua.match(/iPad/i) || ua.match(/iPhone/) ? "touchstart" : "click",
      msie = ua.indexOf("MSIE "),
      $window = $(window),
      $body = $('body'),
      $html = $('html'),
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
  }; // Toggle items display


  var toggleState = {
    enable: function enable(el, target) {
      el.addClass('enabled');
      target.addClass('activated');
    },
    disable: function disable(el, target) {
      if (el === undefined) {
        var current = $('.enabled'),
            visTarget = $('.activated');
        current.removeClass('enabled');
        visTarget.removeClass('activated');
      } else {
        el.removeClass('enabled');
        target.removeClass('activated');
      }
    },
    // If current element doesn't have an enabled class
    // call disable method to reset all possible active items in DOM
    // set current item as active
    // in other case just disable current active element
    toggle: function toggle(el, target, single) {
      if (!el.hasClass('enabled')) {
        if (single) {
          this.disable();
        }

        this.enable(el, target);
      } else {
        if (target !== undefined) {
          this.disable(el, target);
        }
      }
    }
  }; // --------------------------------------------------------------------------
  //adaptation

  var metaStandart = document.getElementById("viewport_standart");
  metaStandart.parentNode.removeChild(metaStandart);

  if (jQuery(window).width() < jQuery(window).height() && screen.width < 767) {
    var viewPortTag = document.createElement('meta');
    viewPortTag.id = "viewport_small";
    viewPortTag.name = "viewport";
    viewPortTag.content = "width=375, user-scalable=no";
    document.getElementsByTagName('head')[0].appendChild(viewPortTag);
  } else {
    var viewPortTag = document.createElement('meta');
    viewPortTag.id = "viewport_big";
    viewPortTag.name = "viewport";
    viewPortTag.content = "width=1280";
    document.getElementsByTagName('head')[0].appendChild(viewPortTag);
  }

  if (screen.width < 767) {
    window.addEventListener("orientationchange", function () {
      if (document.getElementById("viewport_small")) {
        var metaSmall = document.getElementById("viewport_small");
        metaSmall.parentNode.removeChild(metaSmall);
        var viewPortTag = document.createElement('meta');
        viewPortTag.id = "viewport_big";
        viewPortTag.name = "viewport";
        viewPortTag.content = "width=1280, initial-scale=1;";
        document.getElementsByTagName('head')[0].appendChild(viewPortTag);
      } else {
        var metaSmall = document.getElementById("viewport_big");
        metaSmall.parentNode.removeChild(metaSmall);
        var viewPortTag = document.createElement('meta');
        viewPortTag.id = "viewport_small";
        viewPortTag.name = "viewport";
        viewPortTag.content = "width=375, user-scalable=no";
        document.getElementsByTagName('head')[0].appendChild(viewPortTag);
      }
    });
  } //  toggle menu


  (function toggleCatalogMenu() {
    var $openMobMenu = $('.open-main-menu');
    $openMobMenu.on('click', function (event) {
      event.preventDefault();
      $html.removeClass('catalog-menu-opened');
      $html.toggleClass('opened-mobile-main-menu');
      $(this).toggleClass('active');
    });
  })(); // sticky menu


  (function stickyMenu() {
    var $menuWrap = $('.menu-wrap'),
        $menuPosition = $menuWrap.offset().top;
    $window.on('scroll', function () {
      if ($body.width() > 767) return;

      if ($window.scrollTop() > $menuPosition) {
        $html.addClass('fixed-menu');
      } else {
        $html.removeClass('fixed-menu');
      }
    });
  })(); // scroll anchor link


  (function scrollAnchorLink() {
    $('a[data-anchor]').on('click', function (event) {
      var $anchor = $(this),
          $target = $('#' + $anchor.data('anchor'));

      if (!$target.length) {
        return;
      }

      var $targetOffes = $target.offset().top;

      if ($('.open-main-menu').length) {
        var $targetOffes = $target.offset().top - $('.open-main-menu').height();
      }

      event.preventDefault();
      $('html,body').animate({
        scrollTop: $targetOffes
      }, 500);
    });
  })(); //slider-portfolio


  (function initPortfolioSlider() {
    var $slider = $('.section-portfolio-slider');

    if (!$slider.length) {
      return;
    }

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow: '<div class="slick-prev"></div>',
      nextArrow: '<div class="slick-next"></div>'
    });
  })(); //portfolio change image


  (function portfolioChangeImage() {
    var $portfolioItem = $('.portfolio-photo-item');
    $portfolioItem.on('click', function (event) {
      var $this = $(this);
      var $image = $this.attr('href');
      event.preventDefault();
      $portfolioItem.removeClass('active');
      $this.addClass('active');
      $this.parents('.portfolio-item').find('.portfolio-photo').attr('href', $image).css('background-image', 'url(' + $image + ')');
    });
  })(); //   slider video


  (function initVideoSlider() {
    var $slider = $('.video-slider');

    if (!$slider.length) {
      return;
    }

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true
    });
  })(); //slider-reviews


  (function initReviewsSlider() {
    var $slider = $('.section-reviews-slider');

    if (!$slider.length) {
      return;
    }

    $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow: '<div class="slick-prev"></div>',
      nextArrow: '<div class="slick-next"></div>',
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }]
    }).slickLightbox({
      itemSelector: '.reviews-item-wrap',
      slick: {
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>'
      }
    });
  })(); //slider-certificates


  (function initCertificatesSlider() {
    var $slider = $('.section-certificates-slider');

    if (!$slider.length) {
      return;
    }

    $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow: '<div class="slick-prev"></div>',
      nextArrow: '<div class="slick-next"></div>',
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }]
    }).slickLightbox({
      itemSelector: '.certificates-item-wrap',
      slick: {
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>'
      }
    });
  })();

  (function closePopup() {
    var $closeButton = $('.popup-overlay, .section-thanks-icon');
    $closeButton.on('click', function (event) {
      event.preventDefault();
      $body.removeClass('opened-form-popup').removeClass('opened-thanks-popup');
      $html.removeClass('scroll-prevented');
    });
  })(); // show popup form


  (function showPopupForm() {
    var $showPopup = $('.js-show-popup-form'),
        $showPopupSubmit = $('.js-show-popup-submit'),
        $hidePopup = $('.section-popup-form, .section-popup-thanks').find('.popup-close-icon, .popup-overlay');
    $showPopup.on('click', openPopup);
    $showPopupSubmit.on('submit', openPopup);

    function openPopup(event) {
      var $this = $(this);
      if ($this.find('[required]').length && $this.find('[required]').val() == '') return;
      event.preventDefault();
      var $popupToShow = $('.' + $(this).data('open'));

      if ($this.hasClass('equipment-group__item')) {
        var $titleVal = $this.find('.equipment-title').text(),
            $priceVal = $this.find('.equipment-cost span').text(),
            $textVal = $this.find('.equipment-hide-text').text(),
            $imgVal = $this.find('.equipment-img-wrap').html(),
            $characteristicsVal = $this.find('.characteristics-wrap-hide').html();

        $popupToShow.find('.equipment-popup__title').text($titleVal);
        $popupToShow.find('[name="tariff_title"]').val($titleVal);
        $popupToShow.find('.equipment-popup__cost span').text($priceVal);
        $popupToShow.find('.equipment-popup__text').text($textVal);
        $popupToShow.find('.equipment-popup-img').html($imgVal);
        $popupToShow.find('.equipment-characteristics-wrap').html($characteristicsVal);
        $popupToShow.find('[name="equipment_title"]').val($titleVal);
      }

      if ($this.find('.input-address').length) {
        var $val = $this.find('.input-address').val(),
            $input = '<input type="hidden" class="input-address" value="' + $val + '">';
        $('.' + $(this).data('open')).find('form').prepend($input);
      }

      $popupToShow.show();
      $html.addClass('scroll-prevented');
    }

    $hidePopup.on('click', function (event) {
      event.preventDefault();
      $('.section-popup-form').hide();
      $body.removeClass('opened-popup-thanks');
      $html.removeClass('scroll-prevented');
    });
  })();// show popup thanks


  function openPopupThanks() {
    $body.addClass('opened-popup-thanks');
    $html.addClass('scroll-prevented');
  }


  $(".input-phone").mask("+7 (999) 999 99 99");

  //yandex-metrika

  $('.yandex-metrika-event').on('click', function () {
    var $goal = $(this).data('goal');
    ym(61678437, 'reachGoal', $goal);
    return true;
  });

  (function maintenanceSendMail() {
    var $formMail = $('.js-form-submit'),
        $formSuccess = $('.section-popup-thanks');
    // form submit

    $formMail.on('submit', function (event) {
      event.preventDefault();
      var $this = $(this);
      var $nameInput = $this.find('.input-name'),
          $nameVal = $nameInput.val(),
          $phoneInput = $this.find('.input-phone'),
          $phoneVal = $phoneInput.val(),
          $tariffInput = $this.find('[name="equipment_title"]'),
          $tariffInputVal = '',
          $recaptcha = $('#recaptchaResponse').first().val(),
          $errorCont = $this.find('.form-errors-cont');
      $errorCont.html("");

      if ($tariffInput.length) {
        $tariffInputVal = $tariffInput.val();
      }

      if ($phoneInput.length && $phoneVal.length < 1) {
        $errorCont.html('Ошибка. Необходимо заполнить телефон.');
        $errorCont.show();
        return false;
      }

      $.ajax({
        type: "POST",
        url: "ajax/form_cpc.php",
        data: {
          contact_name: $nameVal,
          contact_tel: $phoneVal,
          contact_tariff: $tariffInputVal,
          recaptcha_response: $recaptcha
        },
        success: function success(data) {
          // $formSuccess.fadeIn();
          ym(61678437, 'reachGoal', 'spasibo');
          openPopupThanks();
          $this.find('input[type="submit"]').css('visibility', 'hidden');
        },
        error: function error(response) {
          $errorCont.html("Ошибка отправки");
        }
      });
    });
  })();
})(jQuery);
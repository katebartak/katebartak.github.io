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
  } //  accordion tariff


  (function tariffMore() {
    $body.on('click', '.tariffs-item__content-wrap', function (event) {
      var $this = $(this),
          $allSpoilers = $this.parents('.tariffs-item').find('.tariffs-item__content .tariffs-item__content-wrap');

      if ($this.hasClass('active')) {
        $this.removeClass('active');
      } else {
        $allSpoilers.removeClass('active');
        $this.addClass('active');
      }
    });
  })(); // popup Collapse


  (function popupCollapse() {
    $('.collapse').on('click', function (event) {
      $('.tariffs-item__content-wrap').removeClass('active');
    });
  })(); //  toggle menu


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

      if ($this.hasClass('tariffs-item__plug-button')) {
        var $tariffItem = $this.parents('.tariffs-item'),
            $titleVal = $tariffItem.find('.tariffs-item__title').text(),
            $priceVal = $tariffItem.find('.tariffs-item-global-price').text();
        $popupToShow.find('.popup-title span').text($titleVal);
        $popupToShow.find('.tariffs-item-global-price').text($priceVal);
        $popupToShow.find('[name="tariff_title"]').val($titleVal);
        $popupToShow.find('[name="tariff_price"]').val($priceVal);
      }

      if ($this.hasClass('tariffs-item__plug-link')) {
        var $tariffItem = $this.parents('.tariffs-item'),
            $titleVal = $tariffItem.find('.tariffs-item__title').text(),
            $promoVal = $tariffItem.find('.tariffs-item__promo').text(),
            $priceVal = $tariffItem.find('.tariffs-item-global-price').text(),
            $itemsHtml = $tariffItem.find('.tariffs-item__content').html();
        $popupToShow.find('.tariffs-item__title').text($titleVal);
        $popupToShow.find('.tariffs-item__promo').text($promoVal);
        $popupToShow.find('.tariffs-item__content-inpopup').html($itemsHtml);
        $popupToShow.find('.tariffs-item-global-price').text($priceVal);
        $popupToShow.find('[name="tariff_title"]').val($titleVal);
        $popupToShow.find('[name="tariff_price"]').val($priceVal); // open spoilers

        $popupToShow.find('.tariffs-item__content-wrap').addClass('active');
      }

      if ($this.hasClass('js-open-another-popup')) {
        var $tariffItem = $this.parents('.popup-tariff'),
            $titleVal = $tariffItem.find('.tariffs-item__title').text(),
            $priceVal = $tariffItem.find('.tariffs-item-global-price').text();
        $popupToShow.find('.popup-title span').text($titleVal);
        $popupToShow.find('.tariffs-item-global-price').text($priceVal);
        $popupToShow.find('[name="tariff_title"]').val($titleVal);
        $popupToShow.find('[name="tariff_price"]').val($priceVal);
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
  })(); // show popup thanks


  function openPopupThanks() {
    $body.addClass('opened-popup-thanks');
    $html.addClass('scroll-prevented');
    $('.section-popup-form').hide();
  } // toggle costs works


  (function toggleCostsWorks() {
    var $controlLink = $('.section-tariffs-subclass'),
        $content = $('.tariffs-group');
    $controlLink.on('click', function (event) {
      var $index = $(this).index();
      event.preventDefault();
      $controlLink.removeClass('active');
      $(this).addClass('active');
      $content.removeClass('active');
      $content.hide();
      $content.filter(':eq(' + $index + ')').css('display', 'flex');
    });
  })(); // $(".input-masked-phone").mask("+7 (999) 999 99 99");


  $(".input-phone").mask("+7 (999) 999 99 99");

  (function maintenanceSendMail() {
    var $formMail = $('.js-form-submit'),
        $formSuccess = $('.section-popup-thanks'); // validation
    // form submit
    //yandex-metrika

    $('.yandex-metrika-event').on('click', function () {
      var $goal = $(this).data('goal');
      ym(66208318, 'reachGoal', $goal);
      return true;
    });
    $formMail.on('submit', function (event) {
      var $this = $(this);
      if ($this.find('[required]').length && $this.find('[required]').val() == '') return;
      event.preventDefault();
      var $nameInput = $this.find('.input-name'),
          $nameVal = $nameInput.val(),
          $phoneInput = $this.find('.input-phone'),
          $phoneVal = $phoneInput.val(),
          $addressInput = $this.find('.input-address'),
          $addressVal = $addressInput.val(),
          $tariffInput = $this.find('[name="tariff_title"]'),
          $tariffInputVal = '',
          $tariffPrice = $this.find('[name="tariff_price"]'),
          $tariffPriceVal = '',
          $recaptcha = $('#recaptchaResponse').first().val(),
          $errorCont = $this.find('.form-errors-cont');
      $errorCont.html("");

      if ($tariffInput.length) {
        $tariffInputVal = $tariffInput.val();
      }

      if ($tariffPrice.length) {
        $tariffPriceVal = $tariffPrice.val();
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
          contact_address: $addressVal,
          contact_tariff: $tariffInputVal,
          contact_price: $tariffPriceVal,
          recaptcha_response: $recaptcha
        },
        success: function success(data) {
          // $formSuccess.fadeIn();
          ym(66208318, 'reachGoal', 'spasibo');
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
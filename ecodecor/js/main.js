(function ($) {
  'use strict';


  // Global variables
  let ua = window.navigator.userAgent,
    customClick = (ua.match(/iPad/i) || ua.match(/iPhone/)) ? "touchstart" : "click",
    msie = ua.indexOf("MSIE "),
    $window = $(window),
    $body = $('body'),
    $html = $('html'),
    $popupForm = $('.section-popup-form'),
    $popupThanks = $('.section-popup-thanks'),

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


  // Scroll to target function
  let scrollAnimate = function (scrollToItem, duration, callback) {
    $('html, body').stop().animate(
      {scrollTop: scrollToItem || 0},
      {
        duration: duration || 1000,
        complete: function () {
          if (typeof callback === 'function') {
            $window.bind('scroll', callback);
          }
        }
      });
  };

  // Toggle items display
  let toggleState = {

    enable(el, target) {
      el.addClass('enabled');
      target.addClass('activated');
    },

    disable(el, target) {
      if (el === undefined) {
        let current = $('.enabled'),
          visTarget = $('.activated');

        current.removeClass('enabled');
        visTarget.removeClass('activated');
      }
      else {
        el.removeClass('enabled');
        target.removeClass('activated');
      }
    },

    // If current element doesn't have an enabled class
    // call disable method to reset all possible active items in DOM
    // set current item as active
    // in other case just disable current active element
    toggle(el, target, single) {
      if (!(el.hasClass('enabled'))) {
        if (single) {
          this.disable();
        }
        this.enable(el, target)
      }
      else {
        if (target !== undefined) {
          this.disable(el, target);
        }
      }
    }
  };

  function disableBodyScroll(disable = true) {
    if (disable) {
      $body.addClass('scroll-prevented');
    } else {
      $body.removeClass('scroll-prevented');
    }
  }

  /**
   * Show popup form.
   */
  (function showPopup(){
    $('.js-show-popup').on('click', function() {
      const $this = $(this),
            $dataFormTitle = $this.data('form-title'),
            $dataThanksTitle = $this.data('thanks-title'),
            $dataThanksText = $this.data('thanks-text'),
            $dataCollection = $this.data('collection'),
            $dataFormGoal = $this.data('form-goal'),
            $formTitle = $popupForm.find('.section-title'),
            $thanksTitle = $popupThanks.find('.site-form-title'),
            $thanksText = $popupThanks.find('.site-form-text'),
            $inputCollection = $popupForm.find('[name="collection"]'),
            $formSubmit = $popupForm.find('.yandex-metrika-event');

      if ($dataFormTitle) {
        $formTitle.text($dataFormTitle);
      } else {
        $formTitle.text($formTitle.data('default-title'));
      }

      if ($dataThanksTitle) {
        $thanksTitle.text($dataThanksTitle);
      } else {
        $thanksTitle.text($thanksTitle.data('default-title'));
      }

      if ($dataThanksText) {
        $thanksText.text($dataThanksText);
      } else {
        $thanksText.text($thanksText.data('default-text'));
      }

      if ($dataCollection) {
        $inputCollection.val($dataCollection);
      } else {
        $inputCollection.val('');
      }

      if ($dataFormGoal) {
        $formSubmit.attr('data-goal', $dataFormGoal);
      } else {
        $formSubmit.attr('data-goal', '');
      }

      $popupForm.show();
      disableBodyScroll();
    });
  })();

  /**
   * Close popup.
   */
  (function closePopup() {
    $('.popup-close-icon, .popup-overlay').on('click', function() {
      $popupForm.hide();
      $popupThanks.hide();
      disableBodyScroll(false);
    })
  })();

  /**
   * Yandex metrika.
   */
  $('.yandex-metrika-event').on('click', function () {
    var $goal = $(this).data('goal');
    ym(71981158, 'reachGoal', $goal);
    return true;
  });

  /**
   * Masked input.
   */
  (function maskedInput() {
    $(".input-phone").mask("+7 (999) 999 99 99");
  })();

  /**
   * Send mail
   */
  (function maintenanceSendMail() {
    var $formMail = $('.js-form-submit');

    $formMail.on('submit', function (event) {
      event.preventDefault();
      var $this = $(this);
      var $nameInput = $this.find('.input-name'),
        $nameVal = $nameInput.val(),
        $phoneInput = $this.find('.input-phone'),
        $phoneVal = $phoneInput.val(),
        $whoSelect = $this.find('.form-who'),
        $whoVal = $whoSelect.val(),
        $recaptcha = $('#recaptchaResponse').first().val(),
        $errorCont = $this.find('.form-errors-cont');
      $errorCont.html("");

      $.ajax({
        type: "POST",
        url: "ajax/form_cpc.php",
        data: {
          contact_name: $nameVal,
          contact_tel: $phoneVal,
          contact_who: $whoVal,
          recaptcha_response: $recaptcha
        },
        success: function success(data) {
          // $formSuccess.fadeIn();
          ym(71981158, 'reachGoal', 'spasibo');
          $popupForm.hide();
          $popupThanks.show();
          $this.find('input[type="submit"]').css('visibility', 'hidden');
        },
        error: function error(response) {
          $errorCont.html("Ошибка отправки");
        }
      });
    });
  })();

})(jQuery);

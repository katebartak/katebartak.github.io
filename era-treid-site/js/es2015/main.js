"use strict";

$(document).ready(function () {
  var $html = $('html'),
      $body = $('body'),
      $htmlBody = $('html, body'),
      $window = $(window); //  toggle menu

  (function toggleCatalogMenu() {
    $('.open-main-menu').on('click', function (event) {
      event.preventDefault();
      $html.removeClass('catalog-menu-opened');
      $html.toggleClass('opened-mobile-main-menu');
      $(this).toggleClass('active');
      $openCatalog.removeClass('active');
    });
  })(); //results change image


  (function resultsChangeImage() {
    var $resultsItem = $('.results-photo-item');
    $resultsItem.on('click', function (event) {
      var $this = $(this);
      var $image = $this.attr('href');
      event.preventDefault();
      $resultsItem.removeClass('active');
      $this.addClass('active');
      $this.parents('.results-item').find('.results-photo').attr('href', $image).css('background-image', 'url(' + $image + ')');
    });
  })(); //adaptation


  var metaStandart = document.getElementById("viewport_standart");
  metaStandart.parentNode.removeChild(metaStandart);

  if (jQuery(window).width() < jQuery(window).height() && screen.width < 767) {
    var viewPortTag = document.createElement('meta');
    viewPortTag.id = "viewport_small";
    viewPortTag.name = "viewport";
    viewPortTag.content = "width=320, user-scalable=no";
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
        viewPortTag.content = "width=320, user-scalable=no";
        document.getElementsByTagName('head')[0].appendChild(viewPortTag);
      }
    });
  } //slider-results


  (function initResultSlider() {
    var $slider = $('.section-result-slider');

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
    }).slickLightbox({
      itemSelector: '.results-photo',
      slick: {
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>'
      }
    });
  })(); //slider-partners


  (function initPartnersSlider() {
    var $slider = $('.section-partners-slider');

    if (!$slider.length) {
      return;
    }

    $slider.slick({
      slidesToShow: 5,
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
    });
  })(); // close popup


  (function closePopup() {
    var $closeButton = $('.popup-overlay, .section-thanks-icon');
    $closeButton.on('click', function (event) {
      event.preventDefault();
      $body.removeClass('opened-form-popup').removeClass('opened-thanks-popup');
      $html.removeClass('scroll-prevented');
    });
  })(); // scroll anchor link


  (function scrollAnchorLink() {
    var $anchorLink = $('a[data-anchor]');
    $anchorLink.on('click', function (event) {
      var $anchor = $(this),
          $target = $('#' + $anchor.data('anchor'));

      if (!$target.length) {
        return;
      }

      var $targetOffes = $target.offset().top;

      if ($('.podklutch-header').length) {
        var $targetOffes = $target.offset().top - $('.podklutch-header').height();
      }

      event.preventDefault();
      $('html,body').animate({
        scrollTop: $targetOffes
      }, 500);
    });
  })(); // show popup order


  (function showPopupOrder() {
    var $showPopup = $('.show-popup-order'),
        $hidePopup = $('.section-popup-order').find('.popup-close-icon, .popup-overlaw');
    $showPopup.on('click', function (event) {
      event.preventDefault();
      $body.addClass('opened-popup-order');
      $html.addClass('scroll-prevented');
    });
    $hidePopup.on('click', function (event) {
      event.preventDefault();
      $body.removeClass('opened-popup-order');
      $html.removeClass('scroll-prevented');
    });
  })(); // show popup cost


  (function showPopupCost() {
    var $showPopup = $('.show-popup-cost'),
        $hidePopup = $('.section-popup-cost').find('.popup-close-icon, .popup-overlaw');
    $showPopup.on('click', function (event) {
      event.preventDefault();
      $body.addClass('opened-popup-cost');
      $html.addClass('scroll-prevented');
    });
    $hidePopup.on('click', function (event) {
      event.preventDefault();
      $body.removeClass('opened-popup-cost');
      $html.removeClass('scroll-prevented');
    });
  })(); // show popup thanks


  (function showPopupThanks() {
    var $showPopup = $('.show-popup-thanks'),
        $hidePopup = $('.section-popup-thanks').find('.popup-close-icon, .popup-overlaw');
    $showPopup.on('click', function (event) {
      event.preventDefault();
      openPopupThanks();
    });
    $hidePopup.on('click', function (event) {
      event.preventDefault();
      $body.removeClass('opened-popup-thanks');
      $html.removeClass('scroll-prevented');
    });
  })();

  function openPopupThanks() {
    $body.addClass('opened-popup-thanks');
    $html.addClass('scroll-prevented');
  } //toggll


  $(".toggle-btn").click(function (event) {
    event.preventDefault();
    $(this).parents('.production-info-text').toggleClass("text-open");
  }); //hidden production

  $(".production-more").on('click', function (event) {
    event.preventDefault();
    $('.production-item.hidden').removeClass('hidden');
    $(this).remove();
  }); // $(".input-masked-phone").mask("+7 (999) 999 99 99");

  $(".input-phone").mask("+7 (999) 999 99 99");

  (function maintenanceSendMail() {
    var $formMail = $('.js-form-submit'),
        $formSuccess = $('.section-thanks-popup'); // validation

    function validatePhone(phone) {
      var pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      return pattern.test(phone);
    }

    function validateName(name) {
      var pattern = /^[a-zA-Zа-яА-Я\s]*$/;
      return pattern.test(name);
    }

    function validateEmail(email) {
      var isValid = (email.match(/.+?\@.+/g) || []).length === 1;
      return isValid;
    } // form submit


    $formMail.on('submit', function (event) {
      event.preventDefault();
      var $this = $(this);
      var $nameInput = $this.find('.input-name'),
          $nameVal = $nameInput.val(),
          $phoneInput = $this.find('.input-phone'),
          $phoneVal = $phoneInput.val(),
          $emailInput = $this.find('.input-email'),
          $emailVal = $emailInput.val(),
          $recaptcha = $('#recaptchaResponse').first().val(),
          $errorCont = $this.find('.form-errors-cont');
      $errorCont.html("");

      if ($phoneInput.length && $phoneVal.length < 1) {
        $errorCont.html('Ошибка. Необходимо заполнить телефон.');
        $errorCont.show();
        return false;
      }

      if ($emailInput.length && $emailVal.length < 1) {
        $errorCont.html('Ошибка. Необходимо заполнить email.');
        $errorCont.show();
        return false;
      } // if (!validatePhone($phoneVal)) {
      //    $errorCont.html("Введите корректный номер телефона.");
      //    $errorCont.show();
      //    return false;
      // }


      if ($emailInput.length && !validateEmail($emailVal)) {
        $errorCont.html("Введите корректный E-mail.");
        $errorCont.show();
        return false;
      } //yandex-metrika


      $('.yandex-metrika-event').on('click', function () {
        var $goal = $(this).data('goal');
        yaCounter57360505.reachGoal($goal);
        return true;
      }); // if (!validateName($nameVal)) {
      //    $errorCont.html("Имя должно состоять только из букв");
      //    $errorCont.show();
      //    return false;
      // }

      $.ajax({
        type: "POST",
        url: "ajax/form_cpc.php",
        data: {
          contact_name: $nameVal,
          contact_tel: $phoneVal,
          contact_email: $emailVal,
          recaptcha_response: $recaptcha
        },
        success: function success(data) {
          // $formSuccess.fadeIn();
          $body.removeClass('opened-popup-order');
          openPopupThanks();
          yaCounter57360505.reachGoal('spasibo');
          $formMail.find('input[type="submit"]').css('opacity', '0');
        },
        error: function error(response) {
          $errorCont.html("Ошибка отправки");
        }
      });
    });
  })();
});
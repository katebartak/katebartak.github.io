"use strict";

$(document).ready(function () {
  var $html = $('html'),
      $body = $('body'),
      $htmlBody = $('html, body'),
      $window = $(window); //adaptation

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
      $openCatalog.removeClass('active');
    });
  })(); // toggle costs works


  (function toggleCostsWorks() {
    var $controlLink = $('.section-cost-subclass'),
        $content = $('.cost-work-group');
    $controlLink.on('click', function (event) {
      var $index = $(this).index();
      event.preventDefault();
      $controlLink.removeClass('active');
      $(this).addClass('active');
      $content.removeClass('active');
      $content.hide();
      $content.filter(':eq(' + $index + ')').css('display', 'flex');
    });
  })(); // toggle services


  (function toggleServicesWorks() {
    var $controlLink = $('.services-subclass'),
        $content = $('.services-group');
    $controlLink.on('click', function (event) {
      var $index = $(this).index();
      event.preventDefault();
      $controlLink.removeClass('active');
      $(this).addClass('active');
      $content.removeClass('active');
      $content.hide();
      $content.filter(':eq(' + $index + ')').css('display', 'flex');
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
  } // close popup


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
  }
  /**
   * services hover
   */


  (function servicesHover() {
    $('.cost-work-item').hover(function () {
      var $target = $('.' + $(this).data('hover'));

      if (!$target.length) {
        return;
      }

      $target.addClass('hover-on');
    }, function () {
      var $target = $('.' + $(this).data('hover'));

      if (!$target.length) {
        return;
      }

      $target.removeClass('hover-on');
    });
  })(); //  accordion services


  (function accordionQuestion() {
    $('.questions-item-title').on('click', function () {
      var $container = $(this).closest('.questions-item'),
          $answer = $container.find('.questions-item-answer'),
          $check = false;

      if ($container.hasClass('active')) {
        $check = true;
      }

      $('.questions-item.active .questions-item-answer').animate({
        height: 'hide'
      });
      $('.questions-item.active').removeClass('active');

      if ($check) {
        return;
      }

      $container.addClass('active');
      $answer.animate({
        height: 'show'
      });
    });
  })(); //  accordion question


  (function accordionAccordion() {
    $('.accordion-item-title').on('click', function () {
      var $container = $(this).closest('.accordion-item'),
          $answer = $container.find('.accordion-item-answer'),
          $check = false;

      if ($container.hasClass('active')) {
        $check = true;
      }

      $('.accordion-item.active .accordion-item-answer').animate({
        height: 'hide'
      });
      $('.accordion-item.active').removeClass('active');

      if ($check) {
        return;
      }

      $container.addClass('active');
      $answer.animate({
        height: 'show'
      });
    });
  })(); //  init reviews slider


  (function initReviewsSlider() {
    var $slider = $('.reviews-slider');

    if (!$slider.length) {
      return;
    }

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: true
    });
  })(); //toggll


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
          $modelInput = $this.find('.input-model'),
          $modelVal = $modelInput.val(),
          $problemInput = $this.find('.input-problem'),
          $problemVal = $problemInput.val(),
          $recaptcha = $('#recaptchaResponse').first().val(),
          $errorCont = $this.find('.form-errors-cont');
      $errorCont.html("");

      if ($phoneInput.length && $phoneVal.length < 1) {
        $errorCont.html('Ошибка. Необходимо заполнить телефон.');
        $errorCont.show();
        return false;
      } //yandex-metrika


      $('.yandex-metrika-event').on('click', function () {
        var $goal = $(this).data('goal');
        yaCounter61164391.reachGoal($goal);
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
          contact_model: $modelVal,
          $contact_problem: $problemVal,
          recaptcha_response: $recaptcha
        },
        success: function success(data) {
          // $formSuccess.fadeIn();
          openPopupThanks();
          yaCounter61164391.reachGoal('spasibo');
          $formMail.find('input[type="submit"]').css('opacity', '0');
        },
        error: function error(response) {
          $errorCont.html("Ошибка отправки");
        }
      });
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
        $hidePopup = $('.section-popup-form').find('.popup-close-icon, .popup-overlaw');
    $showPopup.on('click', function (event) {
      event.preventDefault();
      $('.' + $(this).data('open')).show();
      $html.addClass('scroll-prevented');
    });
    $hidePopup.on('click', function (event) {
      event.preventDefault();
      $('.section-popup-form').hide();
      $html.removeClass('scroll-prevented');
    });
  })();

  (function servicesMore() {
    $('.services-button-more').on('click', function (event) {
      event.preventDefault();
      $(this).hide().siblings('.cost-work-item.hidden').removeClass('hidden');
    });
  })();
});
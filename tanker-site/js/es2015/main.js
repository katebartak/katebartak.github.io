"use strict";

$(document).ready(function () {
  var $html = $('html'),
      $body = $('body'),
      $htmlBody = $('html, body'),
      $window = $(window); //  toggle menu

  (function toggleCatalogMenu() {
    var $openMobMenu = $('.open-main-menu');
    $openMobMenu.on('click', function (event) {
      event.preventDefault();
      $html.removeClass('catalog-menu-opened');
      $html.toggleClass('opened-mobile-main-menu');
      $(this).toggleClass('active');
      $openCatalog.removeClass('active');
    });
  })();

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
  })(); // show popup form


  (function showPopupForm() {
    var $showPopup = $('.js-show-popup-form'),
        $hidePopup = $('.section-popup-form').find('.popup-close-icon, .popup-overlay');
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
  })(); // show popup thanks


  function openPopupThanks() {
    $body.addClass('opened-popup-thanks');
    $html.addClass('scroll-prevented');
  } // show popup thanks


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
  })(); // function openPopupThanks() {
  //   $body.addClass('opened-popup-thanks');
  //   $html.addClass('scroll-prevented');
  // }
  //toggll


  $(".toggle-btn").click(function (event) {
    event.preventDefault();
    $(this).parents('.production-info-text').toggleClass("text-open");
  }); //hidden production

  $(".production-more").on('click', function (event) {
    event.preventDefault();
    $('.production-item.hidden').removeClass('hidden');
    $(this).remove();
  }); //slider-portfolio

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
    }).slickLightbox({
      itemSelector: '.portfolio-photo',
      slick: {
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>'
      }
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
  })(); //slider-partners


  (function initPartnersSlider() {
    var $slider = $('.section-partners-slider');

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
    });
  })(); //slider-angar


  (function initAngarSlider() {
    var $slider = $('.section-angar-slider');

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
      itemSelector: '.portfolio-photo',
      slick: {
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>'
      }
    });
  })(); //slider-sertificates


  (function initSertificatesSlider() {
    var $slider = $('.section-sertificates-slider');

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
      itemSelector: '.sertificates-item-wrap',
      slick: {
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>'
      }
    });
  })(); //adaptation


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
  } // $(".input-masked-phone").mask("+7 (999) 999 99 99");


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
    } //yandex-metrika


    $('.yandex-metrika-event').on('click', function () {
      var $goal = $(this).data('goal');
      ym(64584616, 'reachGoal', $goal);
      return true;
    }); // form submit

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
          $errorCont = $this.find('.form-errors-cont'),
          $sizeVal = $this.find('.input-size').val(),
          $useVal = $this.find('.input-use').val();
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
      } // if (!validateName($nameVal)) {
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
          contact_size: $sizeVal,
          contact_use: $useVal,
          recaptcha_response: $recaptcha
        },
        success: function success(data) {
          // $formSuccess.fadeIn();
          ym(64584616, 'reachGoal', 'spasibo');
          openPopupThanks();
          $this.find('input[type="submit"]').css('visibility', 'hidden');
        },
        error: function error(response) {
          $errorCont.html("Ошибка отправки");
        }
      });
    });
  })();
});
"use strict";

/**
 * jquery.visible.min.js
 */
!function (t) {
  var i = t(window);

  t.fn.visible = function (t, e, o) {
    if (!(this.length < 1)) {
      var r = this.length > 1 ? this.eq(0) : this,
          n = r.get(0),
          f = i.width(),
          h = i.height(),
          o = o ? o : "both",
          l = e === !0 ? n.offsetWidth * n.offsetHeight : !0;

      if ("function" == typeof n.getBoundingClientRect) {
        var g = n.getBoundingClientRect(),
            u = g.top >= 0 && g.top < h,
            s = g.bottom > 0 && g.bottom <= h,
            c = g.left >= 0 && g.left < f,
            a = g.right > 0 && g.right <= f,
            v = t ? u || s : u && s,
            b = t ? c || a : c && a;
        if ("both" === o) return l && v && b;
        if ("vertical" === o) return l && v;
        if ("horizontal" === o) return l && b;
      } else {
        var d = i.scrollTop(),
            p = d + h,
            w = i.scrollLeft(),
            m = w + f,
            y = r.offset(),
            z = y.top,
            B = z + r.height(),
            C = y.left,
            R = C + r.width(),
            j = t === !0 ? B : z,
            q = t === !0 ? z : B,
            H = t === !0 ? R : C,
            L = t === !0 ? C : R;
        if ("both" === o) return !!l && p >= q && j >= d && m >= L && H >= w;
        if ("vertical" === o) return !!l && p >= q && j >= d;
        if ("horizontal" === o) return !!l && m >= L && H >= w;
      }
    }
  };
}(jQuery);

(function ($) {
  "use strict";

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
      event.preventDefault();
      $('html,body').animate({
        scrollTop: $targetOffes
      }, 500);
    });
  })();
  /**
   * inview on scroll
   */


  function inViewOnScroll(options) {
    var delay = 0,
        delayAdd = 200;
    $window.on('scroll', function () {
      var i = 0;
      $('.inview').each(function () {
        var $this = $(this);

        if ($this.hasClass('enter')) {
          setTimeout(function () {
            if ($this.visible(options)) {
              $this.removeClass('out');
            } else {
              $this.addClass('out');
            }
          }, delay + i * delayAdd);
        } else {
          if ($this.visible(options)) {
            i++;
            setTimeout(function () {
              $this.addClass('enter');
            }, delay + i * delayAdd);
          }
        }
      });
    });
  }

  $(document).ready(function () {
    inViewOnScroll(true, false, 'vertical');
    $window.trigger('scroll');
  }); //datepicker

  (function () {
    var $initDate = $(".init-datepicker");
    if (!$initDate.length) return;
    $initDate.each(function () {
      $(this).datepicker();
    });
  })(); // close popup


  (function closePopup() {
    var $closeButton = $('.popup-overlay, .section-thanks-icon');
    $closeButton.on('click', function (event) {
      event.preventDefault();
      $body.removeClass('opened-form-popup').removeClass('opened-thanks-popup');
      $html.removeClass('scroll-prevented');
    });
  })(); // show popup thanks


  function openPopupThanks() {
    $body.addClass('opened-popup-thanks');
    $html.addClass('scroll-prevented');
  } //toggll
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
  } // (function costMore() {
  //   $('.cost-button').on('click', function () {
  //     $(this).hide();
  //     $('.cost-wrap__item.hidden').removeClass('hidden');
  //   });
  // })();
  //   slider video


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
    var $slider = $('.reviews-slider');

    if (!$slider.length) {
      return;
    }

    $slider.slick({
      slidesToShow: 1,
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
  })(); // $(".input-masked-phone").mask("+7 (999) 999 99 99");


  $(".input-phone").mask("+7 (999) 999 99 99");

  (function maintenanceSendMail() {
    var $formMail = $('.js-form-submit'),
        $formSuccess = $('.section-popup-thanks'); // validation
    // form submit
    //yandex-metrika

    $('.yandex-metrika-event').on('click', function () {
      var $goal = $(this).data('goal');
      ym(61489120, 'reachGoal', $goal);
      return true;
    });
    $formMail.on('submit', function (event) {
      event.preventDefault();
      var $this = $(this);
      var $nameInput = $this.find('.input-name'),
          $nameVal = $nameInput.val(),
          $phoneInput = $this.find('.input-phone'),
          $phoneVal = $phoneInput.val(),
          $dateInput = $this.find('.input-date'),
          $dateVal = $dateInput.val(),
          $recaptcha = $('#recaptchaResponse').first().val(),
          $errorCont = $this.find('.form-errors-cont');
      $errorCont.html("");

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
          contact_date: $dateVal,
          recaptcha_response: $recaptcha
        },
        success: function success(data) {
          // $formSuccess.fadeIn();
          ym(61489120, 'reachGoal', 'spasibo');
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
'use strict';

$(document).ready(function () {
	var $html = $('html'),
	    $body = $('body'),
	    $htmlBody = $('html, body'),
	    $window = $(window);

	//  toggle menu
	(function toggleCatalogMenu() {
		var $openCatalog = $('.header-nav-item.open-menu'),
		    $openMobMenu = $('.open-main-menu');

		$openCatalog.on('click', function (event) {
			event.preventDefault();
			$html.removeClass('opened-mobile-main-menu');
			$html.toggleClass('catalog-menu-opened');
			$(this).toggleClass('active');
			$openMobMenu.removeClass('active');
		});

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
		});
	})();

	// animate on scroll

	function animateOnScroll($element) {
		$window.on('load scroll', function () {
			if ($window.scrollTop() > $element.offset().top - window.innerHeight * .7) {
				$element.addClass('scrolled-animated');
			}
		});
	}

	animateOnScroll($('.section-result-slider'));

	// close popup

	(function closePopup() {
		var $closeButton = $('.popup-overlay, .section-thanks-icon');
		$closeButton.on('click', function (event) {
			event.preventDefault();
			$body.removeClass('opened-form-popup').removeClass('opened-thanks-popup');
			$html.removeClass('scroll-prevented');
		});
	})();

	// scroll anchor link
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
			$('html,body').animate({ scrollTop: $targetOffes }, 500);
		});
	})();

	// show popup form
	(function showPopupForm() {
		var $showPopup = $('.show-popup-form');
		$showPopup.on('click', function (event) {
			event.preventDefault();
			$body.addClass('opened-form-popup');
			$html.addClass('scroll-prevented');
		});
	})();

	// $(".input-masked-phone").mask("+7 (999) 999 99 99");
	$(".input-phone").mask("+7 (999) 999 99 99");

	(function maintenanceSendMail() {
		var $formMail = $('.js-form-submit'),
		    $formSuccess = $('.section-thanks-popup');
		// validation
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
		}

		// form submit
		$formMail.on('submit', function (event) {
			event.preventDefault();
			var $this = $(this);
			var $nameInput = $this.find('.input-name'),
			    $nameVal = $nameInput.val(),
			    $phoneInput = $this.find('.input-phone'),
			    $phoneVal = $phoneInput.val(),
			    $emailInput = $this.find('.input-email'),
			    $emailVal = $emailInput.val(),
			    $siteVal = $this.find('.input-site').val(),
			    $regionVal = $this.find('.input-region').val(),
			    $promoteCheckYandex = $this.find('#check-03:checked').val(),
			    $promoteCheckGoogle = $this.find('#check-04:checked').val(),
			    $recaptcha = $this.find('#recaptchaResponse').val(),
			    $errorCont = $this.find('.form-errors-cont');

			$errorCont.html("");

			if ($this.hasClass('section-form-popup')) {
				var $calculatorForm = $('.section-calculator-form');
				$siteVal = $calculatorForm.find('.input-site').val();
				$regionVal = $calculatorForm.find('.input-region').val();
				$promoteCheckYandex = $calculatorForm.find('#check-03:checked').val();
				$promoteCheckGoogle = $calculatorForm.find('#check-04:checked').val();
			}

			if ($phoneInput.length && $phoneVal.length < 1) {
				$errorCont.html('Ошибка. Необходимо заполнить телефон.');
				$errorCont.show();
				return false;
			}

			if ($emailInput.length && $emailVal.length < 1) {
				$errorCont.html('Ошибка. Необходимо заполнить email.');
				$errorCont.show();
				return false;
			}

			// if (!validatePhone($phoneVal)) {
			// 		$errorCont.html("Введите корректный номер телефона.");
			// 		$errorCont.show();
			// 		return false;
			// }

			if ($emailInput.length && !validateEmail($emailVal)) {
				$errorCont.html("Введите корректный E-mail.");
				$errorCont.show();
				return false;
			}

			// if (!validateName($nameVal)) {
			// 		$errorCont.html("Имя должно состоять только из букв");
			// 		$errorCont.show();
			// 		return false;
			// }

			$.ajax({
				type: "POST",
				url: "ajax/form_cpc.php",
				data: {
					contact_name: $nameVal,
					contact_tel: $phoneVal,
					contact_email: $emailVal,
					contact_site: $siteVal,
					contact_region: $regionVal,
					contact_check_yandex: $promoteCheckYandex,
					contact_check_google: $promoteCheckGoogle,
					recaptcha_response: $recaptcha
				},
				success: function success(data) {
					// $formSuccess.fadeIn();
					$body.removeClass('opened-form-popup');
					$body.addClass('opened-thanks-popup');
					$html.addClass('scroll-prevented');
					$formMail.find('input[type="submit"]').css('opacity', '0');
				},
				error: function error(response) {
					$errorCont.html("Ошибка отправки");
				}
			});
		});
	})();
});
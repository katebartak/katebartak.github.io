'use strict';

$(document).ready(function () {
		var $html = $('html'),
		    $body = $('body'),
		    $htmlBody = $('html, body');

		// before - after result
		(function beforeAfterChange() {
				var $buttonResult = $('.result-switch .switch-item'),
				    $resultCont = $('.section-result_statistic .statistic-item');
				$buttonResult.on('click', function () {
						$buttonResult.removeClass('active');
						$(this).addClass('active');
						$resultCont.hide();
						$resultCont.filter(':eq(' + $(this).index() + ')').fadeIn();
				});
		})();

		function calculateCost() {
				var $type = $('input[name="type"]:checked').val(),
				    $view = $('input[name="view"]:checked').val(),
				    $metres = $('#range-result').val();
				$('.calculator-cost-number').text($type * $view * $metres + ' руб.');
		}

		calculateCost();

		$('.calculator-range').slider({
				animate: true,
				range: "min",
				value: 142,
				min: 1,
				max: 450,
				step: 1,
				slide: function slide(event, ui) {
						$("#range-result").val(ui.value);
				},
				change: function change(event, ui) {
						calculateCost();
				}
		});

		$('#range-result').on('change keyup', function () {
				$(".calculator-range").slider('value', $(this).val());
				calculateCost();
		});

		$('.calculator-group input[type="radio"]').bind('change', function () {
				calculateCost();
		});

		// toggle costs works
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
		})();

		//  accordion question
		(function accordionQuestion() {
				$('.questions-item-title').on('click', function () {
						var $container = $(this).closest('.questions-item'),
						    $answer = $container.find('.questions-item-answer'),
						    $check = false;
						if ($container.hasClass('active')) {
								$check = true;
						}
						$('.questions-item.active .questions-item-answer').animate({ height: 'hide' });
						$('.questions-item.active').removeClass('active');
						if ($check) {
								return;
						}
						$container.addClass('active');
						$answer.animate({ height: 'show' });
				});
		})();

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

		//  init reviews slider

		(function initReviewsSlider() {
				var $slider = $('.reviews-slider');
				if (!$slider.length) {
						return;
				}
				$slider.slick({
						slidesToShow: 3,
						slidesToScroll: 1,
						dots: false,
						arrows: true,
						responsive: [{
								breakpoint: 767,
								settings: {
										slidesToShow: 1,
										slidesToScroll: 1
								}
						}]
				});
		})();

		(function initReviewsSlider() {
				var $slider = $('.section-scheme-slider');
				if (!$slider.length) {
						return;
				}
				$slider.slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true,
						arrows: true,
						appendDots: $('.section-scheme-dots')
				});
		})();

		(function showHiddenPortfolio() {
				var $more = $('.portfolio-show-more');
				$more.on('click', function (event) {
						var $show = $('#' + $(this).data('show'));
						if (!$show.length) {
								return;
						}
						event.preventDefault();
						$(this).hide();
						$show.addClass('active');
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
});

(function maintenanceSendMail() {
		var $formMail = $('.first-screen-form'),
		    $errorCont = $('.first-screen-form-errors'),
		    $formSuccess = $('.first-screen-form-success');
		// validation
		function validatePhone(phone) {
				var pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
				return pattern.test(phone);
		}

		function validateName(name) {
				var pattern = /^[a-zA-Zа-яА-Я\s]*$/;
				return pattern.test(name);
		}

		// form submit
		$formMail.on('submit', function (event) {
				event.preventDefault();
				$errorCont.html("");
				var $nameVal = $formMail.find('.input-name').val(),
				    $phoneVal = $formMail.find('.input-phone').val(),
				    $recaptcha = $formMail.find('#recaptchaResponse').val();

				if ($phoneVal.length < 1 || $nameVal.length < 1) {
						$errorCont.html('Ошибка. Необходимо заполнить все поля.');
						$errorCont.show();
						return false;
				}

				if (!validatePhone($phoneVal)) {
						$errorCont.html("Введите корректный номер телефона.");
						$errorCont.show();
						return false;
				}

				if (!validateName($nameVal)) {
						$errorCont.html("Имя должно состоять только из букв");
						$errorCont.show();
						return false;
				}

				$.ajax({
						type: "POST",
						url: "ajax/form_cpc.php",
						data: { contact_name: $nameVal, contact_tel: $phoneVal, recaptcha_response: $recaptcha },
						success: function success(data) {
								$formSuccess.fadeIn();
								$formMail.find('input[type="submit"]').hide();
						},
						error: function error(response) {
								$errorCont.html("Ошибка отправки");
						}
				});
		});
})();
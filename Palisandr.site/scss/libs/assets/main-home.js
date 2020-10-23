'use strict';

$(document).ready(function () {
	var $html = $('html'),
	    $body = $('body'),
	    $htmlBody = $('html, body'),
	    $bCheck = $('.b-check-input');

    if ($bCheck.length) {
	    $bCheck.removeAttr('readonly');
	}

	// background change
	if ($(window).width() > 750) {
		var csaHead = function csaHead() {

			if (i > imgHead.length - 1) {
				$('.csa-head1').animate({ 'opacity': '0' }, 400, function () {
					i = 1;
					$('.csa-head1').css({ 'background-image': 'url(' + imgHead[0] + ')' });
				});
				$('.csa-head1').animate({ 'opacity': '1' }, 400);
			} else {
				$('.csa-head1').animate({ 'opacity': '0' }, 400, function () {
					$('.csa-head1').css({ 'background-image': 'url(' + imgHead[i] + ')' });
					i++;
				});
				$('.csa-head1').animate({ 'opacity': '1' }, 400);
			}
		};

		var imgHead = ['/img/human-bg-01.png', '/img/human-bg-02.png'],
		    i = 1;

		var intervalCsaHead = setInterval(csaHead, 10000);
	}

	$('.header-nav a[href="#"]').on('click', function(event) {
		event.preventDefault();
	});

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
		    $metres = $('#range-result').val(),
		    $result = Math.round($type * $view * $metres, 2);
		$('.calculator-cost-number').text($result + ' руб.');
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
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			arrows: true
		});
	})();
});
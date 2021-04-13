'use strict';

jQuery(document).ready(function($) {
	$('.close-icon').click(function() {
		$('.users-form-wrap').removeClass('active')
	});

	$('.users-btn').click(function() {
		$('.users-form-wrap').addClass('active')
	});
});



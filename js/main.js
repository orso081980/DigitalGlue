"use strict";

$(() => {

	$('img.svg').each((i, e) => {

		const $img = $(e);

		const imgID = $img.attr('id');

		const imgClass = $img.attr('class');

		const imgURL = $img.attr('src');

		$.get(imgURL, (data) => {
			let $svg = $(data).find('svg');

			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', `${imgClass}replaced-svg`);
			}

			$svg = $svg.removeAttr('xmlns:a');

			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr(`viewBox 0 0  ${$svg.attr('height')} ${$svg.attr('width')}`);
			}

			$img.replaceWith($svg);
		}, 'xml');
	});

	$('.slider').slick({
		infinite: true,
		slidesToShow: 2,
		arrow: true,
		accessibility: true,
	});

	$('.slider2').slick({
		slidesToShow: 2,
		appendArrows: $('.left'),
		// prevArrow: false,
		// nextArrow: false,
		appendArrows: $('.arrow'),
		// dots: true,
		// infinite: true,
		// speed: 500,
		// slidesToShow: 2,
		// // slidesToScroll: 1,
		// appendArrows: $('.left'),
		// centerMode: true
	});

	let button = $('.button');
	let navigation = $('#navigation');
	button.click(function () {
		$(this).toggleClass("change");
		navigation.toggleClass("menuentire");
	});

});
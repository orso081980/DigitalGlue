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
		appendArrows: $('.arrow'),
	});

	const hamburger = $('.hamburger');
	const navigation = $('#navigation');

	hamburger.click(function () {
		$(this).toggleClass("change");
		navigation.toggleClass("menuentire");
	});

	const header = $('header');

	window.onscroll = function () {
		
		let scrollTop = $(window).scrollTop();
		if (scrollTop > header.height()) {
			header.addClass('scroll');
		} else {
			header.removeClass('scroll');
		}
	}

	const fire = $('#click');
	const mixerDiv = document.querySelector('.mixer');
	
	fire.click(function(e) {
		const streamName = $('#mixer-username').val();
		if (streamName == '') {
			$('#myform').parsley();
		} else {
			e.preventDefault();

			let mixerAPI = 'https://mixer.com/api/v1/';
			let apiCall = mixerAPI + 'channels/' + streamName;
			let beamUrl = 'https://beam.pro/' + streamName;
			let mixertest = 'https://mixer.com/' + streamName;

			function makeAjaxCall(url, methodType, callback){
				let str = `<h3>User profile</h3>`;
				$.ajax({
					url: url,
					method:  methodType,
					dataType: "json",
					success: callback,
					error: function (reason, xhr){
						str += `<p>No user for the moment</p>
						`;
						mixerDiv.innerHTML = str;
					}
				})
			}
			makeAjaxCall(apiCall, "GET", function(respJson) {

				let userDiv = {
					username: respJson.token,
					avatar: respJson.user.avatarUrl
				}

				let str = [];

				if (respJson !== 0 && userDiv.avatar !== null) {
					let str = `<h3>User profile</h3>`;
					str += `<div class="row h-100">`;
					str += `<div class="col-md-6">
					<figure>
					<img src="${respJson.user.avatarUrl}" alt="avatar" />
					<figcaption>${userDiv.username}</figcaption>
					</figure>
					</div>
					`;
					mixerDiv.innerHTML = str;
					let response1 = respJson.id;
					let streamscall = mixerAPI + "channels/" + response1 + "/recordings";

					$.ajax({
						type: 'GET',
						url: streamscall,
						type: 'GET',
						dataType: "json",
						success: function(data) {

							let nano = data;
							if (nano.length !== 0) {
								str += `<div class="col-md-6 my-auto">`;
								for (let i = nano.length-1; i >= nano.length-8; i--) {
									let finalurl = beamUrl + '?vod=' + nano[i].id;
									let linksandstuff = {
										name: nano[i].name,
										link: finalurl
									};
									str += `<a target="_blank" href="${linksandstuff.link}">${linksandstuff.name}</p>`;
								}
								str += `</div>`;
								str += `</div>`;
								mixerDiv.innerHTML = str;
							} else {
								str += `</div>`;
							}
						},
						error: function (reason, xhr){
							console.log("error in processing your request",reason);
						}
					})

				} else {
					str += `<p>Incomplete profile</p>`;
					mixerDiv.innerHTML = str;
				}

			})
		}
		
	})

});
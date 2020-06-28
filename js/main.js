"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
  $('img.svg').each(function (i, e) {
    var $img = $(e);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function (data) {
      var $svg = $(data).find('svg');

      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }

      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', "".concat(imgClass, "replaced-svg"));
      }

      $svg = $svg.removeAttr('xmlns:a');

      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr("viewBox 0 0  ".concat($svg.attr('height'), " ").concat($svg.attr('width')));
      }

      $img.replaceWith($svg);
    }, 'xml');
  });
  $('.slider').slick({
    infinite: true,
    slidesToShow: 2,
    arrow: true,
    accessibility: true
  });
  $('.slider2').slick(_defineProperty({
    slidesToShow: 2,
    appendArrows: $('.left')
  }, "appendArrows", $('.arrow')));
  var hamburger = $('.hamburger');
  var navigation = $('#navigation');
  hamburger.click(function () {
    $(this).toggleClass("change");
    navigation.toggleClass("menuentire");
  });
  var header = $('header');

  window.onscroll = function () {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > header.height()) {
      header.addClass('scroll');
    } else {
      header.removeClass('scroll');
    }
  };

  var fire = $('#click');
  var mixerDiv = document.querySelector('.mixer');
  fire.click(function (e) {
    var streamName = $('#mixer-username').val();

    if (streamName == '') {
      $('#myform').parsley();
    } else {
      var makeAjaxCall = function makeAjaxCall(url, methodType, callback) {
        var str = "<h3>User profile</h3>";
        $.ajax({
          url: url,
          method: methodType,
          dataType: "json",
          success: callback,
          error: function error(reason, xhr) {
            str += "<p>No user for the moment</p>\n\t\t\t\t\t\t";
            mixerDiv.innerHTML = str;
          }
        });
      };

      e.preventDefault();
      var mixerAPI = 'https://mixer.com/api/v1/';
      var apiCall = mixerAPI + 'channels/' + streamName;
      var beamUrl = 'https://beam.pro/' + streamName;
      var mixertest = 'https://mixer.com/' + streamName;
      makeAjaxCall(apiCall, "GET", function (respJson) {
        var userDiv = {
          username: respJson.token,
          avatar: respJson.user.avatarUrl
        };
        var str = [];

        if (respJson !== 0 && userDiv.avatar !== null) {
          var _$$ajax;

          var _str = "<h3>User profile</h3>";
          _str += "<div class=\"row h-100\">";
          _str += "<div class=\"col-md-6\">\n\t\t\t\t\t<figure>\n\t\t\t\t\t<img src=\"".concat(respJson.user.avatarUrl, "\" alt=\"avatar\" />\n\t\t\t\t\t<figcaption>").concat(userDiv.username, "</figcaption>\n\t\t\t\t\t</figure>\n\t\t\t\t\t</div>\n\t\t\t\t\t");
          mixerDiv.innerHTML = _str;
          var response1 = respJson.id;
          var streamscall = mixerAPI + "channels/" + response1 + "/recordings";
          $.ajax((_$$ajax = {
            type: 'GET',
            url: streamscall
          }, _defineProperty(_$$ajax, "type", 'GET'), _defineProperty(_$$ajax, "dataType", "json"), _defineProperty(_$$ajax, "success", function success(data) {
            var nano = data;

            if (nano.length !== 0) {
              _str += "<div class=\"col-md-6 my-auto\">";

              for (var i = nano.length - 1; i >= nano.length - 8; i--) {
                var finalurl = beamUrl + '?vod=' + nano[i].id;
                var linksandstuff = {
                  name: nano[i].name,
                  link: finalurl
                };
                _str += "<a target=\"_blank\" href=\"".concat(linksandstuff.link, "\">").concat(linksandstuff.name, "</p>");
              }

              _str += "</div>";
              _str += "</div>";
              mixerDiv.innerHTML = _str;
            } else {
              _str += "</div>";
            }
          }), _defineProperty(_$$ajax, "error", function error(reason, xhr) {
            console.log("error in processing your request", reason);
          }), _$$ajax));
        } else {
          str += "<p>Incomplete profile</p>";
          mixerDiv.innerHTML = str;
        }
      });
    }
  });
});
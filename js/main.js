(function() {

  "use strict";
  var vh = $(window).height();
  var vw = $(window).width();


  function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function navigateCXJourney(leg) {
    //What button did u click?
    var targetContent = leg.split(' ')[1] + 'content';
    var offset = 0;
    var left = 0;
    var top = 0;


    function showContent(left, offset, top) {
      $("section").each(function() {
        $(this).addClass('hidden');
      });

      $('.' + targetContent).removeClass('hidden').css("opacity", "0");
      TweenLite.to($('.' + targetContent), 1.5, {
        autoAlpha: 1
      });


      $('.leg').each(function() {
        if (targetContent != "allcontent") {
          top += offset;
        } else {
          left += offset;
        }

        TweenLite.to($(this), 0.6, {
          top: top,
          left: left,
          ease: Power1.easeInOut,
        });

      });
    }

    if (targetContent != "allcontent") {
      left = 80;
      offset = 95;
      showContent(left, offset, top);
    } else {
      left = (vw / 2) - 475;
      offset = 100;
      top = vh - 140;
      showContent(left, offset, top);

    }

  }



  $(document).ready(function() {

    // Variables
    var win = $(window);
    var mainnav = $('.mainnav');
    var pos = mainnav.offset().top;

    var sticky = function() {
      win.scrollTop() > pos ?
        mainnav.addClass('sticky') :
        mainnav.removeClass('sticky')
    }
    win.scroll(sticky);


    // Format with commas
    $(".totalloss").each(function() {
      var num = $(this).text();
      var commaNum = numberWithCommas(num);
      $(this).text(commaNum);
    });

    // Scroll down to content
    $('.go').click(function(event) {
      TweenMax.to(window, .4, {
        scrollTo: '.insights1'
      });
    });

    $('.mainnav nav li').click(function(event) {
      var scroll2pos = '.insights' + $(this).attr("class").split('-')[1];
      TweenMax.to(window, .4, {
        scrollTo: scroll2pos
      });
    });

    //Navigate CX Journey legs
    $('.leg').click(function(event) {
      navigateCXJourney($(this).attr("class"));
    });


    $('.slides nav li a').click(function(event) {
      $('.insight').removeClass('current');
      $("." + $(this).attr('data-tab')).addClass('current');
    });

  });


  new Vue({
    el: '#app',
    data: {
      prodname: 'One Talk',
      timeperiod: 'Current - Oct 2017'
    },
    computed: {
      cost() {

        if (this.speed == 100) {
          this.price = 110;
        } else if (this.speed == 300) {
          this.price = 230;
        } else {
          this.price = 450;
        }

        return (this.price);
      }
    }
  });



})();
(function($) {

    "use strict";

    // Parallax Scrolling
    //-------------------------------------------------------------
    var $w = $(window);
    var newsletterSimple = $('.newsletter-simple');
    var productInfo = $('.product-info');

    function move($c) {
        var offset = $c.offset().top;
        var scroll = $w.scrollTop();
        var diff = offset - scroll;
        var pos = 'center ' + (-diff)*0.2 + 'px';
        $c.css({'backgroundPosition':pos});
    }
    $w.bind('scroll', function(e){
        move(newsletterSimple);
        move(productInfo);
    });

    // Scroll To Animation
    //-------------------------------------------------------------------------------
    $('body').scrollspy({target: '#navigation-top-1', offset: 50}); 

    var scrollTo = $(".scroll-to");

    scrollTo.click(function (event) {
        $('.modal').modal('hide');
        var position = $(document).scrollTop();
        var scrollOffset = 49; 

        var marker = $(this).attr('href');
        $('html, body').animate({scrollTop: $(marker).offset().top - scrollOffset}, 'slow');
        return false;
    }); 


    // Scroll Up Btn
    //-------------------------------------------------------------------------------
   $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scroll-up-btn').removeClass("animated fadeOutRight");
            $('.scroll-up-btn').fadeIn().addClass("animated fadeInRight");
        } else {
            $('.scroll-up-btn').removeClass("animated fadeInRight");
            $('.scroll-up-btn').fadeOut().addClass("animated fadeOutRight");
        }
    }); 

    // Navigation Top
    //-------------------------------------------------------------
    $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > 300) {
            $('.navbar-hidden').fadeIn();
        } else {
            $('.navbar-hidden').fadeOut();
        }
    }); 

    /* resize background images */
    function backgroundResize() {
        var windowH = $(window).height();
        $(".header-full-screen-img").each(function (i) {
            var path = $(this);
            // variables
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr("data-img-width");
            var imgH = path.attr("data-img-height");
            var ratio = imgW / imgH;
            // overflowing difference
            var diff = parseFloat(path.attr("data-diff"));
            diff = diff ? diff : 0;
            // remaining height to have fullscreen image only on parallax
            var remainingH = 0;
            if (path.hasClass("parallax")) {
                var maxH = contH > windowH ? contH : windowH;
                remainingH = windowH - contH;
            }
            // set img values depending on cont
            imgH = contH + remainingH + diff;
            imgW = imgH * ratio;
            // fix when too large
            if (contW > imgW) {
                imgW = contW;
                imgH = imgW / ratio;
            }
            //
            path.data("resized-imgW", imgW);
            path.data("resized-imgH", imgH);
            path.css("background-size", imgW + "px " + imgH + "px");
        });
    }

    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    backgroundResize(); 

// end document ready
})(jQuery);
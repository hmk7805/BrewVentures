(function(){

  "use strict";

  // Variables
  // =========================================================================================
  var $html = $('html'),
      $document = $(document),
      $window = $(window),
      i = 0;


  // Scripts initialize
  // ===================

  //document.write('<script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYjhWq7DvCwCiRKotPu9_IXQxupSQbhuo" type="text/javascript"></script>');

  $window.on('load', function () {

    // =================================================================================
    // Preloader
    // =================================================================================
    var $preloader = $('#page-preloader');
    $preloader.delay(100).fadeOut('slow');

    // =================================================================================
    // WOW
    // =================================================================================
    if ($html.hasClass('desktop')) { new WOW().init(); }

    // =================================================================================
    // Google Map
    // =================================================================================
    var map = $(".map");
    if(map.length){
      var mapWrapper = $('#google-map'),
          latlng = new google.maps.LatLng(mapWrapper.data("x-coord"), mapWrapper.data("y-coord")),
          styles = [
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              { "color": "#e9e9e9" },
              { "lightness": 17 }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              { "color": "#f5f5f5" },
              { "lightness": 20 }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 17 }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 29 },
              { "weight": 0.2 }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 18 }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 16 }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              { "color": "#f5f5f5" },
              { "lightness": 21 }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              { "color": "#dedede" },
              { "lightness": 21 }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              { "visibility": "on" },
              { "color": "#ffffff" },
              { "lightness": 16 }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              { "saturation": 36 },
              { "color": "#333333" },
              { "lightness": 40 }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              { "visibility": "off" }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              { "color": "#f2f2f2" },
              { "lightness": 19 }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              { "color": "#fefefe" },
              { "lightness": 20 }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#fefefe" },
              { "lightness": 17 },
              { "weight": 1.2 }
            ]
          }
        ],
          myOptions = {
            scrollwheel: false,
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: false,
            styles: styles
          },
          map = new google.maps.Map(mapWrapper[0], myOptions),
          marker = new google.maps.Marker({
            position: {lat: mapWrapper.data("x-coord"), lng: mapWrapper.data("y-coord")},
            draggable: false,
            animation: false,
            map: map,
            icon: 'img/marker.png'
          }),
          infowindow = new google.maps.InfoWindow({
            content: mapWrapper.data("text")
          });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }
  });


  $document.ready(function () {

    // =================================================================================
    // Contact Form
    // =================================================================================
    var contactForm = $(".contact-form");
    if(contactForm.length){
      var contactResault = $("body").append("<span class='form-resault'></span>").find(".form-resault");
      contactForm.each(function(){
        var this_form = $(this);
        var contactFormInput = this_form.find(".form-control.required");

        contactFormInput.on("blur", function(){
          if(!$.trim($(this).val())){
            $(this).parent().addClass("input-error");
          }
        });

        contactFormInput.on("focus", function(){
          $(this).parent().removeClass("input-error");
        });

        this_form.on("submit", function() { 
          var form_data1 = $(this).serialize();
          if(!contactFormInput.parent().hasClass("input-error") && contactFormInput.val()){
            $.ajax({
              type: "POST", 
              url: "php/contact.php", 
              data: form_data1,
              success: function() {
                contactResault.addClass("correct");
                contactResault.html("Your data has been sent!");
                setTimeout(function(){
                  contactResault.removeClass("incorrect").removeClass("correct");
                }, 4500);
              }
            });
          } else{ 
            if(contactFormInput.val() == ""){
              var contactFormInputEmpty = contactFormInput.filter(function(){ 
                return $(this).val() == ""; 
              });
              contactFormInputEmpty.parent().addClass("input-error");
            }
            contactResault.addClass("incorrect");
            contactResault.html("You must fill in all required fields");
            setTimeout(function(){
              contactResault.removeClass("incorrect").removeClass("correct");
            }, 4500);
          }
          return false;
        }); 
      });
    }

    // =================================================================================
    // jQuery ajaxChimp
    // =================================================================================
    var chimpForm = $('.subscription-form form');
    chimpForm.ajaxChimp({
      callback: function(){
        var panel = $('.js-result');
        setTimeout(function () {
          panel.removeClass("error").removeClass("success");
        }, 4500);
      },
      language: 'cm',
      url: '//adr.us14.list-manage.com/subscribe/post?u=474217a166648c3e7e0c53b55&amp;id=57bd6ccefc'
      //XXX.us13.list-manage.com/subscribe/post?u=YYY&amp;id=ZZZ
    });
    $.ajaxChimp.translations.cm = {
      'submit': 'Submitting...',
      0: 'We have sent you a confirmation email',
      1: 'Please enter a value',
      2: 'An email address must contain a single @',
      3: 'The domain portion of the email address is invalid (the portion after the @: )',
      4: 'The username portion of the email address is invalid (the portion before the @: )',
      5: 'This email address looks fake or invalid. Please enter a real email address'
    };

    // =======
    // Fancybox
    // =======
    var fancybox = $(".fancybox");
    if(fancybox.length){
      fancybox.fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic'
      });
    }
    var fancybox_media = $('.fancybox-media');
    if(fancybox_media.length){
      fancybox_media.fancybox({
        openEffect  : 'fade',
        closeEffect : 'fade',
        helpers : {
          media : {}
        }
      });
    }

    // =================================================================================
    // Parallax Content
    // =================================================================================
    var parallax_content = $(".parallax-text");
    function parallax_text(){
      if($window.width() >= 992){
        var s = $window.scrollTop() + 0.001;
        var a = s*0.01;
        var b = (a/s*10)*a;
        var c = 1 - b*1.5;
        parallax_content.css("opacity", c);
        parallax_content.css("-webkit-transform", "translateY(" + (s/2) + "px)");
        parallax_content.css("-moz-transform", "translateY(" + (s/2) + "px)");
      } else {
        parallax_content.css("-webkit-transform", "translateY(0)");
        parallax_content.css("-moz-transform", "translateY(0)");
        parallax_content.css("opacity", 1);
      }
    }
    if(parallax_content.length){
      $window.on("scroll", parallax_text);
      $window.on("resize", parallax_text);
    }
    

    // =================================================================================
    // Footer Fixed
    // =================================================================================
    var fix_footer = $(".fix-footer");
    $window.on("scroll, resize", function(){
      if(fix_footer.length){
        if($window.width() >= 992){
          var fix_footer_h = fix_footer.outerHeight();
          var scroll = $window.scrollTop() + $window.height();
          var dh = $(document).height() - fix_footer_h;
          $("main").css("margin-bottom", fix_footer_h);
          if (scroll > dh) {
            fix_footer.css("opacity", 1);
            fix_footer.css("z-index", 0);
          } else {
            fix_footer.css("opacity", 0);
            fix_footer.css("z-index", -1);
          }
        } else {
          $("main").css("margin-bottom", 0);
          fix_footer.css("opacity", 1);
          fix_footer.css("z-index", 0);
        }
      }
    });

    // =================================================================================
    // Responsive Nav
    // =================================================================================
    var responsiveNav = new Navigation({
      init: true,
      stuck: true,
      responsive: true,
      breakpoint: 992, // don't forget to change in css as well
    });

    // =================================================================================
    // Typed effect
    // =================================================================================
    $(".typed").typed({
      stringsElement: $(".typed-string"),
      typeSpeed: 50,
      backDelay: 1200,
      cursorChar: "",
    });

    // =================================================================================
    // jQuery Count To
    // =================================================================================
    var counter = $('.counter');
    if (counter.length) {
      var counterToInit = counter.not(".init");
      $document.on("scroll", function () {
        counterToInit.each(function(){
          var item = $(this);
          var item_number = $(this).attr("data-to");
          var cont_on_offset = $(".count-on").offset().top;
          var win_offset = $window.height() + $window.scrollTop();

          if($window.width() >= 768){
            if ((!item.hasClass("init")) && (win_offset >= cont_on_offset)) {
              item.countTo({
                refreshInterval: 20,
                speed: item.attr("data-speed") || 1000
              });
              item.addClass('init');
            }
          } else {
            item.text(item_number);
          }
        });
        $document.trigger("resize");
      });
      $window.trigger("scroll");
    }

    // =================================================================================
    // Parallalx.js
    // =================================================================================
    var parallax = $('.parallax-bg');
    if (parallax.length > 0) {
      parallax.parallax();
    }

    // =================================================================================
    // UIToTop
    // =================================================================================
    $().UItoTop();
   
    // =================================================================================
    // Owl carousel
    // =================================================================================
    var slider_main = $('.slider-main');
    if (slider_main.length) {
      slider_main.owlCarousel({
        mouseDrag: false,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplaySpeed: 1500,
        dots: false,
        items: 1,
        responsiveClass:true,
        responsive:{
          768:{ nav: true, },
        }
      });
    }
    var owl1 = $('.slider-1');
    if (owl1.length) {
      owl1.owlCarousel({
        mouseDrag: false,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplaySpeed: 1500,
        autoplayHoverPause: true,
        dots: true,
        items: 1,
      });
    }
    var owl2 = $('.slider-2');
    if (owl2.length) {
      owl2.owlCarousel({
        mouseDrag: true,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1500,
        dots: false,
        items: 5,
        responsiveClass: true,
        responsive:{
          0:{ items: 1 },
          480:{ items: 2 },
          768:{ items: 3 },
          992:{ items: 5 },
        }
      });
    }
    var owl3 = $('.slider-3');
    if (owl3.length) {
      owl3.owlCarousel({
        mouseDrag: true,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1500,
        autoplayHoverPause: true,
        dots: true,
        items: 3,
        margin: 30,
        responsiveClass: true,
        responsive:{
          0:{ items: 1 },
          480:{ items: 1 },
          768:{ items: 2 },
          992:{ items: 3 },
        }
      });
    }

    // =================================================================================
    // ISOTOPE
    // =================================================================================
    var isotope = $('.iso');
    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
      if(isotope.length){
        var timeout;
        return function debounced() {
          if ( timeout ) {
            clearTimeout( timeout );
          }
          function delayed() {
            fn();
            timeout = null;
          }
          timeout = setTimeout( delayed, threshold || 100 );
        }
      }
    }
    if (isotope.length) {
      $( function() {
        var $grid = $('.grid').isotope({
          itemSelector: 'article'
        });
        // filter buttons
        $('.filters-button-group').on( 'click', 'button', function() {
          var filterValue = $( this ).attr('data-filter');
          $grid.isotope({ filter: filterValue });
          $window.trigger("resize");
        });
        $('.button-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      });
      
      $window.on("load", function() {
        $('.iso .button-group button:first-child').trigger("click");
      });
    }

    // =================================================================================
    // Progress Bar
    // =================================================================================
    var progressBar = $(".progress-bar");
    if (progressBar.length) {
      $(document).on("scroll", function () {
        progressBar.not('.scrolled').each(function () {
          var position = $(this).offset().top;
          var item_offset = $window.scrollTop() + $window.height();
          if (item_offset > position) {
            var item = $(this);
            var start = item.attr("data-valuemin");
            var end = item.attr("data-valuenow");
            item.css({width: end + '%'});
            item.parent().find('.progress-bar-counter')
              .removeClass("hide")
              .counter({
                start: start,
                end: end,
                time: 0.7,
                step: 50
              });
            item.addClass('scrolled');
          }
        });
      }).trigger("scroll");
    }

    // =================================================================================
    // Accordion
    // =================================================================================
    var accordion = $(".accordion");
    if(accordion.length){
      accordion.each(function(){
        var all_panels = $(this).find('.accordion-inner').hide();
        var all_titles = $(this).find('.accordion-title');
        $(this).find('.accordion-inner.active').slideDown();

        all_titles.on("click", function() {
          var acc_title = $(this);
          var acc_inner =  acc_title.next();

          if(!acc_inner.hasClass('active')){
             all_panels.removeClass('active').slideUp();
             acc_inner.addClass('active').slideDown();
             all_titles.removeClass('active');
             acc_title.addClass('active');
          } else {
            all_panels.removeClass('active').slideUp();
            all_titles.removeClass('active');
          }
        });
      });
    }
      

  });

})();
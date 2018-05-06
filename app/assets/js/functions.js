
jQuery(document).ready(function($) {

	'use strict';
    //***************************
    // Sticky Header Function
    //***************************
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 170){  
            jQuery('body').addClass("political-sticky");
        }
        else{
            jQuery('body').removeClass("political-sticky");
        }
    });

    // Multi-Toggle Navigation
    $(function() {
      $('body').addClass('js');
        var $menu = $('#menu'),
          $menulink = $('.menu-link'),
          $menuTrigger = $('.has-subnav');

      $menulink.on("click", function(e) {
        e.preventDefault();
        $menulink.toggleClass('active');
        $menu.toggleClass('active');
      });

      $menuTrigger.on("click", function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.toggleClass('active').next('ul').toggleClass('active');
      });

    });
    
    //***************************
    // BannerOne Functions
    //***************************
      jQuery('.political-banner').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          dots: false,
          prevArrow: "<span class='slick-arrow-left'><i class='icon church-arrows3'></i></span>",
          nextArrow: "<span class='slick-arrow-right'><i class='icon church-arrows3'></i></span>",
          fade: true,
          responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        });


        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })

    //***************************
    // vehicle Functions
    //***************************
    jQuery('.political-blog-slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        dots: false,
        prevArrow: "<span class='slick-arrow-left'><i class='fa fa-arrow-left'></i></span>",
        nextArrow: "<span class='slick-arrow-right'><i class='fa fa-arrow-right'></i></span>",
        responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                }
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 400,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
      });
    

//***************************
    // BlogGrid Slider Functions
    //***************************
      jQuery('.political-cause-grid-slider,.political-team-grid-slider').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          dots: false,
          prevArrow: "<span class='slick-arrow-left'><i class='fa fa-arrow-left'></i></span>",
          nextArrow: "<span class='slick-arrow-right'><i class='fa fa-arrow-right'></i></span>",
          responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        });

//***************************
    // BlogGrid Slider Functions
    //***************************
      jQuery('.political-team-detail-slider').slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          dots: false,
          prevArrow: "<span class='slick-arrow-left'><i class='fa fa-angle-right'></i></span>",
          nextArrow: "<span class='slick-arrow-right'><i class='fa fa-angle-left'></i></span>",
          responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        });


//***************************
    // vehicle Functions
    //***************************
    jQuery('.political-partner-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        dots: false,
        arrows: false,
        responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                }
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 400,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
      });

//***************************
  // ThumbSlider Functions
  //***************************
  jQuery('.political-blog-thumb').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        asNavFor: '.political-blog-slide-list'
      });
      jQuery('.political-blog-slide-list').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.political-blog-thumb',
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        vertical: true,
        prevArrow: false,
        nextArrow: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  vertical: false,
                }
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  vertical: false,
                }
              },
              {
                breakpoint: 400,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  vertical: false,
                }
              }
            ],
      });

   //***************************
    // Fancybox Function
    //***************************
    jQuery(".fancybox").fancybox({
      openEffect  : 'elastic',
      closeEffect : 'elastic',
    });

    //***************************
    // Counter Function
    //***************************
    jQuery('#numscroller1').jQuerySimpleCounter({
      end:2210,
      duration: 40000
    });
    jQuery('#numscroller2').jQuerySimpleCounter({
      end:210,
      duration: 40000
    });
    jQuery('#numscroller3').jQuerySimpleCounter({
      end:957,
      duration: 40000
    });
    jQuery('#numscroller4').jQuerySimpleCounter({
      end:3010,
      duration: 40000
    });


});

  //***************************
  // Map
  //***************************
    
  // When the window has finished loading create our google map below
  if(jQuery('#map').length > 0 ) {
    google.maps.event.addDomListener(window, 'load', init);
  }

    function init() {
        'use strict';
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York

            // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway.controlled_access","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.line","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#f66a00"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#fe5621"}]}]
        };

        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            title: 'Snazzy!'
        });
    }

$('#circle-skills').pieChart({
    animate: {
      duration: 4000,
      enabled: true
    },
    size: 150,
    barColor: '#f34235',
    trackColor: '#122e43',
    lineCap: 'butt',
    lineWidth: 10,
    onStep: function (from, to, percent) {
        $(this.element).find('.circle-skills-value').text(Math.round(percent) + '%');
    }
});


//********************************
    // progressbar function
    //********************************
 

$( window ).scroll(function() {   
  // if($( window ).scrollTop() > 10){   scroll down abit and get the action   
  $(".progress-bar").each(function(){
    each_bar_width = $(this).attr('aria-valuenow');
    $(this).width(each_bar_width + '%');
    
  });      
 //  }  
});



//***************************
// ContactForm Function
//***************************
$('.myform').on('submit',function(){
    // Add text 'loading...' right after clicking on the submit button. 
    $('.output_message').text('Loading...'); 
     
    var form = $(this);
    $.ajax({
        url: form.attr('action'),
        method: form.attr('method'),
        data: form.serialize(),
        success: function(result){
            if (result == 'success'){
                $('.output_message').html('<span class="success-msg"><i class="fa fa-check-circle"></i> Message Sent successfully!</span>');
            } else if (result == 'validate'){
                $('.output_message').html('<span class="spam-error-msg"><i class="fa fa-warning"></i> You have already sent message. Try again after one hour.</span>');
            } else {
                $('.output_message').html('<span class="error-msg"><i class="fa fa-times-circle"></i> Error Sending email!</span>');
            }
        }
    });
     
    // Prevents default submission of the form after clicking on the submit button. 
    return false;   
});

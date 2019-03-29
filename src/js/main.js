$(document).ready(function() {
  var mainSlider = $(".banner-slider__trigger");
  mainSlider.owlCarousel({
    loop: true,
    nav: false,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>"
    ],
    items: 1,
    //autoWidth: true,
    //autoHeight:true,
    autoplay: false,
    autoplayHoverPause: true,
    margin: 3
    // navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
  });

  mainSlider.trigger("refresh.owl.carousel"); // fix owl bug
});

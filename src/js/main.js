function calculateHMSleft() {
  //calculate
  var now = new Date();
  var hoursleft = 23 - now.getHours();
  var minutesleft = 59 - now.getMinutes();
  var secondsleft = 59 - now.getSeconds();

  //format 0 prefixes
  if (minutesleft < 10) minutesleft = "0" + minutesleft;
  if (secondsleft < 10) secondsleft = "0" + secondsleft;

  //display
  $(".product-item__promo-timer").html(
    hoursleft + ":" + minutesleft + ":" + secondsleft
  );
}

var fixOwl = function() {
  var $stage = $(".owl-stage"),
    stageW = $stage.width(),
    $el = $(".owl-item"),
    elW = 0;
  $el.each(function() {
    elW +=
      $(this).width() +
      +$(this)
        .css("margin-right")
        .slice(0, -2);
  });
  if (elW > stageW) {
    $stage.width(elW);
  }
};

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
    autoplay: false,
    autoplayHoverPause: true,
    margin: 3,
    onInitialized: fixOwl,
    onRefreshed: fixOwl
    // navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
  });

  // mainSlider.trigger("refresh.owl.carousel"); // fix owl bug

  calculateHMSleft();
  setInterval(calculateHMSleft, 1000);

  $("#main-nav").hcOffcanvasNav({
    maxWidth: 980,
    pushContent: $(".header"),
    customToggle: $(".header-mobile__toggle"),
    disableBody: false,
    labelClose: "закрыть",
    labelBack: "назад"
  });

  $(".products-slider__trigger").owlCarousel({
    loop: false,
    items: 5,
    autoplay: false,
    dots: false,
    autoplayHoverPause: true,
    margin: 33,
    responsive: {
      0: {
        items: 1
      },
      660: {
        items: 2
      },
      963: {
        items: 3
      },
      1197: {
        items: 4
      }
    }
  });

  $(".brands-slider__trigger").owlCarousel({
    loop: false,
    items: 5,
    autoplay: false,
    dots: false,
    autoplayHoverPause: true,
    margin: 4,
    responsive: {
      0: {
        items: 2
      },
      660: {
        items: 3
      },
      963: {
        items: 3
      },
      1197: {
        items: 4
      }
    }
  });
});

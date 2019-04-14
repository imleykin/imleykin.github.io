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

  // console.log(this);
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
    lazyLoad: true,
    // autoHeight: true,
    //autoWidth: true,
    autoplay: false,
    autoplayHoverPause: true,
    margin: 3,
    onLoadedLazy: function() {
      mainSlider.trigger("refresh.owl.carousel");
      console.log("slider refreshed");
    },
    onInitialized: function(e) {
      console.log(e.target.querySelectorAll("img")[0].complete);
      var timerId = setInterval(function() {
        console.log("check img");
        if (e.target.querySelectorAll("img")[0].complete) {
          clearInterval(timerId);
          mainSlider.trigger("refresh.owl.carousel");
        }
      }, 100);
    }
  });

  // mainSlider.trigger("refresh.owl.carousel");

  // mainSlider.on("loaded.owl.lazy", function() {
  //   mainSlider.trigger("refresh.owl.carousel");
  //   console.log("slider refreshed");
  // });
  // console.log(mainSlider);

  calculateHMSleft();
  setInterval(calculateHMSleft, 1000);

  // $("#main-nav").hcOffcanvasNav({
  //   maxWidth: 980,
  //   pushContent: $(".header"),
  //   customToggle: $(".header-mobile__toggle"),
  //   disableBody: false,
  //   labelClose: "закрыть",
  //   labelBack: "назад"
  // });

  // Мобильное меню
  var slinky = $(".mobile-menu__wrap").slinky({
    title: true,
    resize: false
  });

  var mobileMenu = document.getElementsByClassName("mobile-menu")[0];
  var mobileMenuToggleButton = document.getElementsByClassName(
    "header-mobile__toggle"
  )[0];

  var header = document.getElementsByClassName("header-mobile")[0];
  var body = document.getElementsByTagName("body")[0];

  mobileMenuToggleButton.onclick = function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.classList.toggle("is-active");
    mobileMenu.classList.toggle("mobile-menu_opened");
    body.classList.toggle("lock-scroll");
  };

  // /Мобильное меню

  $(".products-slider__trigger").owlCarousel({
    loop: false,
    items: 5,
    autoplay: false,
    dots: false,
    autoplayHoverPause: true,
    margin: 33,
    navText: [
      "<svg class='icon icon-arrow-left'><use xlink:href='svg/sprite/sprite.svg#arrow-left'></use></svg>",
      "<svg class='icon icon-arrow-right'><use xlink:href='svg/sprite/sprite.svg#arrow-right'></use></svg>"
    ],
    nav: true,
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
    },
    onInitialized: function() {
      $(".products-slider__trigger").trigger("refresh.owl.carousel");
      console.log("onInitialized produc slider");
    },

    onRefreshed: fixOwl
  });

  $(".products-slider__trigger").trigger("refresh.owl.carousel");

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
    },
    onInitialized: fixOwl,
    onRefreshed: fixOwl
  });

  $(".recently-viewed__slider-trigger").owlCarousel({
    loop: false,
    items: 5,
    autoplay: false,
    dots: false,
    autoplayHoverPause: true,
    margin: 0,
    responsive: {
      0: {
        items: 1
      },
      550: {
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
    },
    onInitialized: fixOwl,
    onRefreshed: fixOwl
  });

  // setTimeout(function() {
  //   $(".owl-carousel").trigger("refresh.owl.carousel");
  // }, 3000);
});

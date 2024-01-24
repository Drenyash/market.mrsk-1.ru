import Swiper, { Navigation, Pagination, EffectFade, Thumbs } from "swiper";
import ar from "air-datepicker/locale/ar";

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelectorAll("[data-slider]");
  const sliderWidthThumbs = document.querySelector("[data-slider-thumbs]");
  slider.forEach((el) => {
    createSlider(el);
  });
  createSliderWidthThumbs(sliderWidthThumbs);
});

function createSliderWidthThumbs(el) {
  const swiperThumbs = new Swiper(document.querySelector(".slider--control")?.querySelector(".swiper"), {
    slidesPerView: 4,
    spaceBetween: 10
  });
  const swiperMain = new Swiper(el?.querySelector(".swiper"), {
    modules: [Navigation, Pagination, EffectFade, Thumbs],
    slidesPerView: 1,
    spaceBetween: 30,
    thumbs: {
      swiper: swiperThumbs
    }
  });
}

function createSlider(el) {
  let swiper = Swiper;
  let init = false;
  const desktop = window.matchMedia("(min-width: 768px)");
  const mobile = window.matchMedia("(min-width: 0px) and (max-width: 768px)");
  const looped = el.querySelectorAll(".swiper-slide").length > 3;
  const loop = el.hasAttribute("data-loop");
  const wrapper = el.querySelector(".swiper-wrapper");
  const slidesQuantity = parseInt(el.getAttribute("data-slider-slides"), 10);
  const slidesQuantityTab = parseInt(
    el.getAttribute("data-slider-slides-tab"),
    10
  );
  const slidesQuantityMob = parseInt(
    el.getAttribute("data-slider-slides-mob"),
    10
  );
  const pagination = el.querySelector("[data-slider-pagination]") || null;
  const desktopOnly = !!el.hasAttribute("data-slider-desktop");
  const mobileOnly = !!el.hasAttribute("data-slider-mobile");
  const effect = el.hasAttribute("data-slider-fade") ? "fade" : null;
  const timeline = document.querySelectorAll(".timeline__item");
  const articleHistory = document.querySelectorAll(".article-history");

  function initSlider(el) {
    if (mobileOnly && mobile.matches) {
      if (!init) {
        init = true;
        swiper = callSlider(el);
      }
    } else if (mobileOnly && desktop.matches) {
      if (init) {
        swiper.destroy();
        swiper = undefined;
        wrapper.removeAttribute("style");
        init = false;
      }
    } else if (!desktopOnly || (desktopOnly && desktop.matches)) {
      if (!init) {
        init = true;
        swiper = callSlider(el);
      }
    } else if (desktopOnly && mobile.matches) {
      if (init) {
        swiper.destroy();
        swiper = undefined;
        wrapper.removeAttribute("style");
        init = false;
      }
    }
  }

  function callSlider(el) {
    return new Swiper(el.querySelector(".swiper"), {
      modules: [Navigation, Pagination, EffectFade, Thumbs],
      slidesPerView: slidesQuantity,
      spaceBetween: 30,
      slideVisibleClass: "slider__slide--visible",
      watchSlidesProgress: true,
      loop: !loop ? looped : false,
      effect: effect,
      dragging: true,
      autoHeight: false,
      pagination: {
        el: pagination,
        clickable: true,
        type: "bullets",
        bulletClass: "bullet",
        bulletActiveClass: "bullet--active"
      },
      navigation: {
        nextEl: el.querySelector("[data-slider-next]"),
        prevEl: el.querySelector("[data-slider-prev]")
      },
      breakpoints: {
        1200: {
          slidesPerView: slidesQuantity || "auto",
          spaceBetween: 40
        },
        768: {
          slidesPerView: slidesQuantityTab || 2,
          spaceBetween: 20
        },

        320: {
          slidesPerView: slidesQuantityMob || 1,
          spaceBetween: 15
        }
      },
      on: {
        init(swiper) {
          const currentIndex = swiper.realIndex;
          historyToggle(currentIndex);
          timelineToggle(currentIndex, swiper);
        },
        click(swiper) {
          const currentIndex = swiper.clickedIndex;
          historyToggle(currentIndex);
          timelineToggle(currentIndex);
          swiper.slideTo(currentIndex);
        },
        slideChange(swiper) {
          const currentIndex = swiper.realIndex;
          timelineToggle(currentIndex, swiper);
          historyToggle(currentIndex);
        },
        snapGridLengthChange: function() {
          if (timeline.length > 0) {
            if (this.snapGrid.length != this.slidesGrid.length) {
              this.snapGrid = this.slidesGrid.slice(0);
            }
          }
        }
      }
    });
  }

  function timelineToggle(currentIndex, swiper) {
    if (timeline.length > 0) {
      timeline.forEach((item, idx) => {
        item.classList.remove("active");
        item.addEventListener("click", () => {
          timeline.forEach((item) => {
            item.classList.remove("active");
          });
          if (swiper) {
            swiper.slideTo(idx);
            item.classList.add("active");
            historyToggle(idx);
          }
        });
      });
      timeline.item(currentIndex).classList.add("active");
    }
  }

  function historyToggle(currentIndex) {
    if (articleHistory.length > 0) {
      articleHistory.forEach(el => el.classList.remove("active"));
      articleHistory.item(currentIndex).classList.add("active");
    }
  }

  initSlider(el);
  window.addEventListener("resize", () => {
    initSlider(el);
  });
}

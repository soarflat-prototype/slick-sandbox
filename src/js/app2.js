import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss'

const SLIDE_DURATION = 500;
const SLIDER_WIDTH = 1620;

const $window = $(window);
const $slider = $('.slider');
const $next = $('.slider-next');
const $prev = $('.slider-prev');
const $sliderTop = $('.slider-top');

let hasSlick = false;

function init() {
  $window.on('resize', () => {
    updateSlider();
  });

  updateSlider();
}

function updateSlider() {
  if ($window.width() < SLIDER_WIDTH) {
    console.log('1620より小さい');

    const x = Math.floor(-(SLIDER_WIDTH - $window.width()) / 2);

    $slider
      .css('transform', `translateX(${x}px)`)
      .css('-webkit-transform', `translateX(${x}px)`);

    if (!hasSlick) {
      hasSlick = true;

      $slider.addClass('is-slick');

      $sliderTop.slick({
        draggable: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        speed: SLIDE_DURATION,
        arrows: true,
        variableWidth: true,
        nextArrow: $next,
        prevArrow: $prev,
      });

      addSlickEvent();
    }
  } else {
    console.log('1620より大きい');

    $slider
      .css('transform', `translateX(0px)`)
      .css('-webkit-transform', `translateX(0px)`);

    if (hasSlick) {
      hasSlick = false;

      $slider.removeClass('is-slick');

      $sliderTop.slick('unslick');
    }
  }
}

function addSlickEvent() {
  $sliderTop.on('beforeChange', (e, slick, currentSlide) => {
    const $slides = $sliderTop.slick('getSlick').$slides;
    $slides.removeClass('is-active');
  });

  $sliderTop.on('afterChange', (e, slick, currentSlide) => {
    const $currentSlide = $sliderTop.slick('getSlick').$slides.eq(currentSlide);
    $currentSlide.addClass('is-active');
  });
}

function removeSlickEvent() {
  $sliderTop.off();
}

init();

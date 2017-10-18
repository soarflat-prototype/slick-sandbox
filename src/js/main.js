import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss'
import ProgressBar from './modules/ProgressBar';

const SLIDE_COUNT = 6;
const SLIDE_DURATION = 500;

const $sliderTop = $('.slider-top');
const $sliderBottom = $('.slider-bottom');
const progressBar = new ProgressBar({
  el: '.progress-bar',
  maxLength: SLIDE_COUNT - 1,
  duration: 2000,
  resetDuration: SLIDE_DURATION,
  loop: true,
});

function init() {
  initSlick();
  initEvents();
  progressBar.start();
}

function initSlick() {
  $sliderTop.slick({
    arrows: false,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: SLIDE_DURATION,
  });

  $sliderBottom.slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: SLIDE_DURATION,
    arrows: false,
  });
}

function initEvents() {
  $sliderTop.on('afterChange', () => {
    progressBar.step();
  });

  $sliderBottom.slick('getSlick').$slides.on('click', (e) => {
    const $slide = $(e.currentTarget);
    const index = Number($slide.attr('data-slick-index'));
    $sliderTop
      .slick('slickPause')
      .slick('slickGoTo', index);
    progressBar.jump(index);
  });

  progressBar.on('doneStep', () => {
    $sliderTop.slick('slickNext');
  });

  progressBar.on('reset', () => {
    $sliderTop.slick('slickNext');
  });
}

init();

import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss'
import ProgressBar from './modules/ProgressBar';

const SLIDE_COUNT = 6;
const SLIDE_DURATION = 500;

const $sliderTop = $('.slider-top');
const $sliderBottom = $('.slider-bottom');

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

const progressBar = new ProgressBar({
  maxLength: SLIDE_COUNT - 1,
  duration: 5000,
});

progressBar.on('changed', () => {
  $sliderTop.slick('slickNext');
});

$sliderTop.on('afterChange', () => {
  progressBar.emit('next');
});

$sliderBottom.slick('getSlick').$slides.on('click', (e) => {
  const $slide = $(e.currentTarget);
  const index = Number($slide.attr('data-slick-index'));
  const duration = 500;
  $sliderTop.slick('slickPause');
  progressBar.emit('go', index, duration);
});

progressBar.start();

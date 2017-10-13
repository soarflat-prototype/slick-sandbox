import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss'
import ProgressBar from './modules/ProgressBar';

const SLIDE_COUNT = 6;
let currentSlideCount = 1;

const $sliderTop = $('.slider-top');
const $sliderBottom = $('.slider-bottom');

$sliderTop.slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
});

$sliderBottom.slick({
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
});

const progressBar = new ProgressBar({
  max: SLIDE_COUNT,
  wait: 2,
});
progressBar.start();

progressBar.on('pause', () => {
  $sliderTop.slick('slickNext');

  const slideToShow = $sliderBottom.slick('getSlick').options.slidesToShow;

  if (currentSlideCount % slideToShow === 0 && currentSlideCount !== 1) {
    $sliderBottom.slick('slickNext');
  } else {
    $sliderBottom.trigger('afterChange');
  }

  if (currentSlideCount < SLIDE_COUNT) {
    currentSlideCount += 1;
  } else {
    currentSlideCount = 1;
  }
});

$sliderBottom.on('afterChange', () => {
  progressBar.emit('step');
});

$sliderTop.on('afterChange', () => {
  progressBar.emit('step');
});
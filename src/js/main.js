import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss'
import ProgressBar from './modules/ProgressBar';

const SLIDE_COUNT = 6;
const SLIDE_DURATION = 500;
let currentSlideCount = 1;

const $sliderTop = $('.slider-top');
const $sliderBottom = $('.slider-bottom');

$sliderTop.slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: SLIDE_DURATION,
  arrows: false,
});

$sliderBottom.slick({
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: SLIDE_DURATION,
  arrows: false,
});

const progressBar = new ProgressBar({
  maxIndex: SLIDE_COUNT - 1,
  remainingCountForNext: 2,
  resetDuration: SLIDE_DURATION,
});

progressBar.on('pause', () => {
  $sliderTop.slick('slickNext');

  const slideToShow = $sliderBottom.slick('getSlick').options.slidesToShow;

  if (currentSlideCount % slideToShow === 0 && currentSlideCount !== 1) {
    $sliderBottom.slick('slickNext');
  } else {
    $sliderBottom.trigger('afterChange');
  }

  currentSlideCount = (currentSlideCount < SLIDE_COUNT)
    ? currentSlideCount + 1
    : 1;
});

$sliderBottom.on('afterChange', () => {
  progressBar.emit('reduceRemainingCountForNext');
});

$sliderTop.on('afterChange', () => {
  progressBar.emit('reduceRemainingCountForNext');
});

progressBar.start();
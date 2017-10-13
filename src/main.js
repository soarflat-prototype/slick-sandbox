import $ from 'jquery';
import velocity from 'velocity-animate';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss'

$('.slider-top').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
});

$('.slider-bottom').slick({
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
});
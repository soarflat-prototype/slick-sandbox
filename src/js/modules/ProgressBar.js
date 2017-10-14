import $ from 'jquery';
import velocity from 'velocity-animate';
import events from 'events';

export default class ProgressBar extends events {
  constructor({ maxLength, duration }) {
    super();
    this.$el = $('.progress-bar');
    this.length = 0;
    this.maxLength = maxLength;
    this.duration = duration;

    this.bindEvent();
  }

  start() {
    this.next();
  }

  next() {
    const to = `${(this.length + 1) / (this.maxLength + 1) * 100}%`;
    this.go(to);
  }

  go(to) {
    velocity(this.$el, {
      width: to,
    }, {
      duration: this.duration,
      complete: () => {
        if (this.length < this.maxLength) {
          this.length += 1;
        } else {
          this.length = 0;

          velocity(this.$el, {
            width: '0%',
          }, {
            duration: 500,
          });
        }

        this.emit('changed');
      },
    });
  }

  bindEvent() {
    this.on('next', () => this.next());
  }
}

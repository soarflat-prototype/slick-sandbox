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
    this.go(this.length);
  }

  go(length, duration = this.duration) {
    const to = `${(length + 1) / (this.maxLength + 1) * 100}%`;

    velocity(this.$el, {
      width: to,
    }, {
      duration,
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

        this.emit('changed', length);
      },
      queue:
        false,
    });
  }

  bindEvent() {
    this.on('next', () => this.next());
    this.on('go', (length, duration) => this.go(length, duration));
  }
}

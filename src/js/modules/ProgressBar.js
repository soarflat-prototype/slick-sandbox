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

    this.updateLength = this.updateLength.bind(this);
    this.setLength = this.setLength.bind(this);

    this.bindEvent();
  }

  start() {
    this.next();
  }

  next() {
    this.go(this.length)
      .then(() => {
        this.updateLength();
        if (this.length === 0) this.go(-1, 500);
        this.emit('goneNext');
      });
  }

  jump(length) {
    this.go(length - 1, 400)
      .then(() => this.setLength(length));
  }

  go(length, duration = this.duration) {
    return new Promise((resolve) => {
      const to = `${(length + 1) / (this.maxLength + 1) * 100}%`;

      velocity(this.$el, 'stop');
      velocity(this.$el, {
        width: to,
      }, {
        duration,
        complete: () => {
          resolve();
        },
        queue: false,
      });
    });
  }

  updateLength() {
    if (this.length < this.maxLength) {
      this.length += 1;
    } else {
      this.length = 0;
    }
  }

  setLength(length) {
    this.length = length;
  }

  bindEvent() {
    this.on('next', () => this.next());
    this.on('jump', (length) => this.jump(length));
  }
}

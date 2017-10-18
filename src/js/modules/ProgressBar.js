import $ from 'jquery';
import velocity from 'velocity-animate';
import events from 'events';

export default class ProgressBar extends events {
  constructor({ el, maxLength, duration, resetDuration, loop }) {
    super();
    this.$el = $(el);
    this.length = 0;
    this.maxLength = maxLength;
    this.duration = (typeof duration !== 'undefined')
      ? duration
      : 5000;
    this.resetDuration = (typeof resetDuration !== 'undefined')
      ? resetDuration
      : 1000;
    this.loop = (typeof loop !== 'undefined')
      ? loop
      : false;
  }

  start() {
    this.step();
  }

  step() {
    this.go(this.length)
      .then(() => {
        this.updateLength();

        if (this.loop && this.length === 0) {
          this.reset();
        } else {
          this.emit('doneStep');
        }
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
        complete: () => {
          resolve();
        },
        duration,
        queue: false,
      });
    });
  }

  reset() {
    this.go(-1, this.resetDuration);
    this.emit('reset');
  }

  updateLength() {
    this.length = (this.length < this.maxLength)
      ? this.length + 1
      : 0;
  }

  setLength(length) {
    this.length = length;
  }
}

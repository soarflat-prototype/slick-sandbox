import $ from 'jquery';
import velocity from 'velocity-animate';
import events from 'events';

;

export default class ProgressBar extends events {
  constructor({ max, wait }) {
    super();
    this.$el = $('.progress-bar');
    this.index = 0;
    this.max = max;
    this.waitCount = 0;
    this.wait = wait;

    this.bindEvent();
  }

  bindEvent() {
    this.on('step', () => {
      this.waitCount += 1;
      if (this.waitCount === this.wait) {
        this.waitCount = 0;
        this.step();
      }
    });
  }

  start() {
    this.step();
  }

  step() {
    const to = `${(this.index + 1) / (this.max) * 100}%`;

    velocity(this.$el, {
      width: to,
    }, {
      duration: 3000,
      complete: () => {
        if (this.index < this.max - 1) {
          this.index += 1;
          this.emit('pause');
        } else {
          this.index = 0;
          velocity(this.$el, {
            width: '0%',
          }, {
            duration: 300
          });
          this.emit('pause');
        }
      },
    });
  }
}

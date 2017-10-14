import $ from 'jquery';
import velocity from 'velocity-animate';
import events from 'events';

;

export default class ProgressBar extends events {
  constructor({ maxIndex, waitCount, resetDuration }) {
    super();
    this.$el = $('.progress-bar');
    this.index = 0;
    this.maxIndex = maxIndex;
    this.wait = waitCount;
    this.waitCount = waitCount;
    this.resetDuration = resetDuration;

    this.bindEvent();
  }

  bindEvent() {
    this.on('step', () => {
      this.reduceWait();

      if (this.canStep()) {
        this.step();
      }
    });
  }

  reduceWait() {
    this.wait -= 1;
  }

  canStep() {
    return (this.wait === 0);
  }

  start() {
    this.step();
  }

  step() {
    this.wait = this.waitCount;

    const to = `${(this.index + 1) / (this.maxIndex + 1) * 100}%`;

    velocity(this.$el, {
      width: to,
    }, {
      duration: 3000,
      complete: () => {
        if (this.index < this.maxIndex) {
          this.index += 1;
          this.emit('pause');
        } else {
          this.index = 0;
          velocity(this.$el, {
            width: '0%',
          }, {
            duration: this.resetDuration,
          });
          this.emit('pause');
        }
      },
    });
  }
}

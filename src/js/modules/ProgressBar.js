import $ from 'jquery';
import velocity from 'velocity-animate';
import events from 'events';

;

export default class ProgressBar extends events {
  constructor({ maxIndex, remainingCountForNext, resetDuration }) {
    super();
    this.$el = $('.progress-bar');
    this.index = 0;
    this.maxIndex = maxIndex;
    this.currentRemainingCountForNext = remainingCountForNext;
    this.remainingCountForNext = remainingCountForNext;
    this.resetDuration = resetDuration;

    this.bindEvent();
  }

  start() {
    this.next();
  }

  next() {
    this.currentRemainingCountForNext = this.remainingCountForNext;

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

  reduceRemainingCountForNext() {
    this.currentRemainingCountForNext -= 1;
  }

  canNext() {
    return (this.currentRemainingCountForNext === 0);
  }

  bindEvent() {
    this.on('reduceRemainingCountForNext', () => {
      this.reduceRemainingCountForNext();
      if (this.canNext()) this.next();
    });
  }
}

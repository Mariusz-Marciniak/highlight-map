export default class SignalNotifier {

  private timer: number;
  private readonly delay: number;
  private readonly handler: () => void;

  constructor(delay: number, handler: () => void) {
    this.delay = delay;
    this.handler = handler;
  }

  notify() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(() => {
      this.run();
    }, this.delay);
  }

  private run() {
    this.timer = null;
    this.handler();
  }

}

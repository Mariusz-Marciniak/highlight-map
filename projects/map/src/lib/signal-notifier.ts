export default class SignalNotifier {

  private timer: number;
  private readonly delay: number;
  private readonly handler: () => void;

  constructor(delay: number, handler: () => void) {
    this.delay = delay;
    this.handler = handler;
  }

  notify() {
    console.log('registered');
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.run();
    }, this.delay);
  }

  private run() {
    console.log('run');
    this.timer = null;
    this.handler();
  }

}

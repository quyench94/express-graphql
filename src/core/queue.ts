import CoreBase from "./base";
import async from 'async';

class Queue extends CoreBase {
  private queue: async.QueueObject<Function>;

  public handler: any;

  constructor() {
    super();
  }

  public start() {
    if (this.handler == undefined) throw new Error('Missing handler');
    const self = this;
    this.queue = async.queue(self.handler, 1)
  }

  public push(object: any) {
    return this.queue.push(object)
  }
  
}
export default new Queue();
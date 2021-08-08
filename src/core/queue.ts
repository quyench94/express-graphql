import CoreBase from "./base";

class Queue extends CoreBase {
  queue: any;
  constructor() {
    super();
  }

  push(object: any, callback?: any) {
    return true
  }
}
export default new Queue();
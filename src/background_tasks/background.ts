import queue from "../core/queue";
import notify_publisher from "./tasks/notify_publisher";
import { NewsNotifyPublisher } from "../interfaces/news.interface";

class Background {
  constructor(){}

  public start() {
    queue.handler = async (object: NewsNotifyPublisher, callback: Function) => {
      notify_publisher(object)
      .finally(() => callback())
    }
    queue.start()
  }
}

export default new Background();
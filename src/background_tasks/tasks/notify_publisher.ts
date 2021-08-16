import { NewsNotifyPublisher } from "../../interfaces/news.interface";
import UserService from "../../services/user.service";
import * as Helpers from "../../services/helper.services";


export default async (params: NewsNotifyPublisher) => {
  const userService = new UserService();
  const requestId = params.headers.requestId;
  const publisherId = params.body.publisherId;
  const newId = params.body.newId;

  try {
    const publisher = await userService.getPublisher({id: publisherId});
    if (!publisher) throw new Error("Publisher not found");

    const publisherWebhook = publisher.publisherWebhook;
    if (!publisherWebhook) return;

    const webhookParams = {
      url: publisherWebhook,
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json'
      },
      json: {
        newId
      }
    }
    const webhookResult = await Helpers.httpRequest(webhookParams);
    console.log(`[${requestId}] Call webhook success`)
  } catch (error) {
    console.error(`[${requestId}] Call webhook failed`, error)
    // maybe we need to retry here in case error from response 
    throw(error)
  }
}
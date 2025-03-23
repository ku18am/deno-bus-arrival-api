import { Application, Router } from "@oak/oak";
import { getBusArrival } from "./api.ts";
import { isValidBusStopCode } from "./utils.ts";
import { sendMessage } from "./bot.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = `${Deno.env.get("Datamall_Base_URL")}`;
  })
  .post("/bot", async (context) => {
    const body = await context.request.body.json();
    const { message: { chat: { id: chat_id }, text } } = body;
    if (isValidBusStopCode(text)) {
      const replyText = await getBusArrival(text);
      await sendMessage(chat_id, replyText);
    }

    context.response.status = 200;
  })
  .get("/bus-arrival", async (context) => {
    const busStopCode = context.request.url.searchParams.get("BusStopCode");
    if (busStopCode) {
      context.response.body = await getBusArrival(busStopCode);
    } else {
      context.response.status = 400;
      context.response.body = "Invalid BusStopCode";
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

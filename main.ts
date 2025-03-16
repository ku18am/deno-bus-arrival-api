import { Application, Router } from "@oak/oak";
import { getBusArrival } from "./api.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = `${Deno.env.get("Datamall_Base_URL")}`;
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

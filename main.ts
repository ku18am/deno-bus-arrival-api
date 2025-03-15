import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { getBusArrival } from "./api.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = `${Deno.env.get("Datamall_Base_URL")}`;
  })
  .get("/bus-arrival/:BusStopCode", async (context) => {
    if (context?.params?.BusStopCode) {
      context.response.body = await getBusArrival(context.params.BusStopCode);
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

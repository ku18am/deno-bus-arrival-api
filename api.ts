import { diff } from "./utils.ts";

const API_BASE_URL = Deno.env.get("Datamall_Base_URL");
const AccountKey = Deno.env.get("Datamall_API_Key") as string;

export const getBusArrival = async (BusStopCode: string) => {
  const q = new URLSearchParams({
    BusStopCode,
  });
  const response = await fetch(`${API_BASE_URL}/BusArrival?${q}`, {
    headers: { AccountKey },
  });
  const { Services } = await response.json();
  const times = Services.map((s) => ({
    [`${s.ServiceNo}`]: [
      diff(s.NextBus.EstimatedArrival),
      diff(s?.NextBus2?.EstimatedArrival),
      diff(s?.NextBus3?.EstimatedArrival),
    ],
  }));

  return times;
};

import { diff } from "./utils.ts";

const API_BASE_URL = Deno.env.get("Datamall_Base_URL");
const AccountKey = Deno.env.get("Datamall_API_Key") as string;

export const getBusArrival = async (BusStopCode: string) => {
  const q = new URLSearchParams({
    BusStopCode,
  });
  const response = await fetch(`${API_BASE_URL}/v3/BusArrival?${q}`, {
    headers: { AccountKey },
  });
  const { Services } = await response.json();
  const times = {};

  Services.forEach((s) => {
    times[`${s.ServiceNo}`] = [
      diff(s.NextBus.EstimatedArrival),
      diff(s?.NextBus2?.EstimatedArrival),
      diff(s?.NextBus3?.EstimatedArrival),
    ];
  });

  return times;
};

export const getBusStops = async () => {
  const response = await fetch(`${API_BASE_URL}/BusStops?`, {
    headers: { AccountKey },
  });
  const { value: busStops } = await response.json() ?? [];

  return busStops;
};

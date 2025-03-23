import { difference } from "@std/datetime";

export const diff = (t: string) => {
  if (!t) return "N/A";

  const now = new Date();
  const f = new Date(t);
  const mins = difference(now, f).minutes;
  return mins === 0 ? "Arr" : `${mins} min`;
};

export const isValidBusStopCode = (bsc: string) => bsc.match(/^\d{5}$/);

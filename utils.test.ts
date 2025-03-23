import { expect } from "jsr:@std/expect";
import { formatBusArrivalMessage, isValidBusStopCode } from "./utils.ts";

Deno.test("isValidBusStopCode", () => {
  expect(isValidBusStopCode("123")).toBeFalsy();
  expect(isValidBusStopCode("123456")).toBeFalsy();
  expect(isValidBusStopCode("10059")).toBeTruthy();
});

Deno.test("formatBusArrivalMessage", () => {
  expect(formatBusArrivalMessage({})).toBe("");
  expect(formatBusArrivalMessage({ 100: ["Arr", "3 mins", "N/A"] })).toBe(
    "\n100: Arr, 3 mins, N/A",
  );
  expect(
    formatBusArrivalMessage({
      100: ["Arr", "3 mins", "N/A"],
      200: ["Arr", "3 mins", "5 mins"],
    }),
  ).toBe("\n100: Arr, 3 mins, N/A\n200: Arr, 3 mins, 5 mins");
});

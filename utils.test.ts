import { expect } from "jsr:@std/expect";
import { isValidBusStopCode } from "./utils.ts";

Deno.test("isValidBusStopCode", () => {
  expect(isValidBusStopCode("123")).toBeFalsy();
  expect(isValidBusStopCode("123456")).toBeFalsy();
  expect(isValidBusStopCode("10059")).toBeTruthy();
});

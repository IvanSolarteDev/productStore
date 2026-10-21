import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "@jest/globals";
import { TextDecoder, TextEncoder } from "node:util";

Object.defineProperty(globalThis, "TextDecoder", {
  configurable: true,
  value: TextDecoder,
});
Object.defineProperty(globalThis, "TextEncoder", {
  configurable: true,
  value: TextEncoder,
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

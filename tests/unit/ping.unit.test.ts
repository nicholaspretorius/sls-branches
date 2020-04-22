import { getGreeting } from "../../src/ping";

describe("unit: /ping", () => {
  it("should return a message of 'Hello world!'", () => {
    expect.hasAssertions();
    expect(getGreeting()).toBe("Hello world!");
  });
});

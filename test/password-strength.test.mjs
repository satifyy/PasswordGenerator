import test from "node:test";
import assert from "node:assert/strict";

import { estimateCrackTime } from "../password-strength.mjs";

test("estimates time from password length and character pool size", () => {
  assert.equal(estimateCrackTime({ length: 1, enabledGroups: ["numbers"] }), "Less than a second");
  assert.equal(estimateCrackTime({ length: 2, enabledGroups: ["numbers"] }), "Less than a second");
});

test("returns a human readable long estimate", () => {
  const estimate = estimateCrackTime({ length: 20, enabledGroups: ["uppercase", "lowercase", "numbers", "symbols"] });
  assert.match(estimate, /^About 6\.14 quintillion years \(6\.14e\+18 years\)$/);
});

test("keeps a numeric estimate at the maximum supported length", () => {
  const estimate = estimateCrackTime({ length: 64, enabledGroups: ["uppercase", "lowercase", "numbers", "symbols"] });
  assert.match(estimate, /^About 48\.16 trestrigintillion years \(4\.82e\+103 years\)$/);
});

import test from "node:test";
import assert from "node:assert/strict";

import { updatePasswordView } from "../password-view.mjs";

function viewElements(password = "previous-password") {
  return {
    passwordOutput: { textContent: password },
    copyButton: { disabled: false },
    copyLabel: { textContent: "Copied" },
    status: { textContent: "" },
  };
}

test("clears and disables copying when no character group is enabled", () => {
  const elements = viewElements();

  updatePasswordView(elements, { length: 20, enabledGroups: [] });

  assert.equal(elements.passwordOutput.textContent, "");
  assert.equal(elements.copyButton.disabled, true);
  assert.equal(elements.copyLabel.textContent, "Copy");
  assert.match(elements.status.textContent, /select at least one character type/i);
});

test("enables copying and announces generically after generation", () => {
  const elements = viewElements("");

  updatePasswordView(elements, {
    length: 20,
    enabledGroups: ["uppercase", "lowercase", "numbers", "symbols"],
  });

  assert.equal(elements.passwordOutput.textContent.length, 20);
  assert.equal(elements.copyButton.disabled, false);
  assert.equal(elements.copyLabel.textContent, "Copy");
  assert.equal(elements.status.textContent, "New password generated.");
});

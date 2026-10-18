import test from "node:test";
import assert from "node:assert/strict";

import { CHARACTER_GROUPS, generatePassword } from "../password-generator.mjs";

function deterministicCrypto(...values) {
  let index = 0;

  return {
    getRandomValues(target) {
      for (let position = 0; position < target.length; position += 1) {
        target[position] = values[index % values.length];
        index += 1;
      }
      return target;
    },
  };
}

test("generates the requested length from the enabled character groups", () => {
  const password = generatePassword(
    {
      length: 20,
      enabledGroups: ["lowercase", "numbers"],
    },
    deterministicCrypto(0, 1, 2, 3, 4, 5),
  );

  assert.equal(password.length, 20);
  assert.match(password, /^[a-z0-9]+$/);
});

test("includes at least one character from every enabled group", () => {
  const enabledGroups = ["uppercase", "lowercase", "numbers", "symbols"];
  const password = generatePassword(
    { length: 24, enabledGroups },
    deterministicCrypto(0, 25, 51, 77, 103, 129),
  );

  for (const groupName of enabledGroups) {
    const characters = CHARACTER_GROUPS[groupName];
    assert.equal(
      [...password].some((character) => characters.includes(character)),
      true,
      `expected a character from ${groupName}`,
    );
  }
});

test("rejects a request with no enabled character groups", () => {
  assert.throws(
    () =>
      generatePassword(
        { length: 16, enabledGroups: [] },
        deterministicCrypto(0),
      ),
    /select at least one character type/i,
  );
});

test("rejects a password shorter than the number of enabled groups", () => {
  assert.throws(
    () =>
      generatePassword(
        {
          length: 2,
          enabledGroups: ["uppercase", "lowercase", "numbers"],
        },
        deterministicCrypto(0),
      ),
    /length must be at least 3/i,
  );
});

test("rejects unknown character groups", () => {
  assert.throws(
    () =>
      generatePassword(
        { length: 16, enabledGroups: ["emoji"] },
        deterministicCrypto(0),
      ),
    /unknown character type/i,
  );
});

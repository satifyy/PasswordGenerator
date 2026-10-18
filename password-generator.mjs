export const CHARACTER_GROUPS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?",
};

function secureIndex(maximum, cryptoSource) {
  const range = 2 ** 32;
  const unbiasedLimit = Math.floor(range / maximum) * maximum;
  const value = new Uint32Array(1);

  do {
    cryptoSource.getRandomValues(value);
  } while (value[0] >= unbiasedLimit);

  return value[0] % maximum;
}

function pickCharacter(characters, cryptoSource) {
  return characters[secureIndex(characters.length, cryptoSource)];
}

export function generatePassword(
  { length = 20, enabledGroups = Object.keys(CHARACTER_GROUPS) } = {},
  cryptoSource = globalThis.crypto,
) {
  if (enabledGroups.length === 0) {
    throw new Error("Select at least one character type.");
  }

  const groups = enabledGroups.map((groupName) => {
    const characters = CHARACTER_GROUPS[groupName];

    if (!characters) {
      throw new Error(`Unknown character type: ${groupName}`);
    }

    return characters;
  });

  if (!Number.isInteger(length) || length < groups.length) {
    throw new Error(`Length must be at least ${groups.length}.`);
  }

  const availableCharacters = groups.join("");
  const password = groups.map((characters) =>
    pickCharacter(characters, cryptoSource),
  );

  while (password.length < length) {
    password.push(pickCharacter(availableCharacters, cryptoSource));
  }

  for (let index = password.length - 1; index > 0; index -= 1) {
    const swapIndex = secureIndex(index + 1, cryptoSource);
    [password[index], password[swapIndex]] = [
      password[swapIndex],
      password[index],
    ];
  }

  return password.join("");
}

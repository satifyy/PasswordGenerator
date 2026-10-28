import { CHARACTER_GROUPS } from "./password-generator.mjs";

const GUESSES_PER_SECOND = 1_000_000_000_000;

function formatDuration(seconds) {
  if (seconds < 1) return "Less than a second";
  if (!Number.isFinite(seconds)) return "More than 1e308 seconds";
  if (seconds >= 1e10) {
    const years = seconds / 31_557_600;
    return `About ${years.toExponential(2)} years`;
  }

  const units = [
    [31_557_600, "year"],
    [86_400, "day"],
    [3_600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];
  let remaining = Math.floor(seconds);
  const parts = [];

  for (const [size, name] of units) {
    const count = Math.floor(remaining / size);
    if (count) {
      parts.push(`${count} ${name}${count === 1 ? "" : "s"}`);
      remaining %= size;
    }
    if (parts.length === 2) break;
  }
  return parts.join(" ");
}

export function estimateCrackTime({ length, enabledGroups }) {
  const poolSize = enabledGroups.reduce((total, name) => {
    const group = CHARACTER_GROUPS[name];
    if (!group) throw new Error(`Unknown character type: ${name}`);
    return total + group.length;
  }, 0);
  if (!Number.isInteger(length) || length < 1 || poolSize === 0) {
    throw new Error("A valid length and at least one character type are required.");
  }
  return formatDuration((poolSize ** length) / (2 * GUESSES_PER_SECOND));
}

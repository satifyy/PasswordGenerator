import { generatePassword } from "./password-generator.mjs";
import { estimateCrackTime } from "./password-strength.mjs";

export function updatePasswordView(
  { passwordOutput, copyButton, copyLabel, status, crackTime },
  options,
) {
  try {
    passwordOutput.textContent = generatePassword(options);
    if (crackTime) crackTime.textContent = estimateCrackTime(options);
    copyButton.disabled = false;
    copyLabel.textContent = "Copy";
    status.textContent = "New password generated.";
  } catch (error) {
    passwordOutput.textContent = "";
    if (crackTime) crackTime.textContent = "—";
    copyButton.disabled = true;
    copyLabel.textContent = "Copy";
    status.textContent = error.message;
  }
}

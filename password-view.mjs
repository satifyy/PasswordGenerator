import { generatePassword } from "./password-generator.mjs";

export function updatePasswordView(
  { passwordOutput, copyButton, copyLabel, status },
  options,
) {
  try {
    passwordOutput.textContent = generatePassword(options);
    copyButton.disabled = false;
    copyLabel.textContent = "Copy";
    status.textContent = "New password generated.";
  } catch (error) {
    passwordOutput.textContent = "";
    copyButton.disabled = true;
    copyLabel.textContent = "Copy";
    status.textContent = error.message;
  }
}

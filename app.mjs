import { updatePasswordView } from "./password-view.mjs";

const passwordOutput = document.querySelector("#password-output");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");
const copyLabel = document.querySelector("#copy-label");
const lengthInput = document.querySelector("#length");
const lengthValue = document.querySelector("#length-value");
const groupInputs = [...document.querySelectorAll('input[name="group"]')];
const status = document.querySelector("#status");
const crackTime = document.querySelector("#crack-time");

function enabledGroups() {
  return groupInputs.filter((input) => input.checked).map((input) => input.value);
}

function updatePassword() {
  updatePasswordView(
    { passwordOutput, copyButton, copyLabel, status, crackTime },
    {
      length: Number(lengthInput.value),
      enabledGroups: enabledGroups(),
    },
  );
}

async function copyPassword() {
  try {
    await navigator.clipboard.writeText(passwordOutput.textContent);
    copyLabel.textContent = "Copied";
    status.textContent = "Password copied to clipboard.";
  } catch {
    status.textContent = "Copy failed. Select the password and copy it manually.";
  }
}

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
  updatePassword();
});

for (const input of groupInputs) {
  input.addEventListener("change", updatePassword);
}

generateButton.addEventListener("click", updatePassword);
copyButton.addEventListener("click", copyPassword);

updatePassword();

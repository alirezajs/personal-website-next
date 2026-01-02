"use client";

import { useEffect } from "react";

function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise<void>((resolve, reject) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);
    if (succeeded) {
      resolve();
    } else {
      reject(new Error("Copy failed"));
    }
  });
}

export default function CodeCopyClient() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button.code-copy") as HTMLButtonElement | null;

      if (!button) {
        return;
      }

      const encoded = button.getAttribute("data-code");
      if (!encoded) {
        return;
      }

      const code = decodeURIComponent(encoded);
      const originalLabel = button.textContent || "Copy";

      copyToClipboard(code)
        .then(() => {
          button.textContent = "Copied";
          window.setTimeout(() => {
            button.textContent = originalLabel;
          }, 1600);
        })
        .catch(() => {
          button.textContent = "Failed";
          window.setTimeout(() => {
            button.textContent = originalLabel;
          }, 1600);
        });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

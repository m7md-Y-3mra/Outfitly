"use client";

export type SplitType = "chars" | "words" | "lines";

export interface SplitResult {
  elements: HTMLElement[];
  revert: () => void;
}

// Regex to detect Arabic characters
const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

function containsArabic(text: string): boolean {
  return ARABIC_REGEX.test(text);
}

export function splitText(element: HTMLElement, type: SplitType = "chars"): SplitResult {
  const originalHTML = element.innerHTML;
  const text = element.textContent || "";

  let elements: HTMLElement[] = [];

  // For Arabic text, use words instead of chars to preserve letter connectivity
  const effectiveType = type === "chars" && containsArabic(text) ? "words" : type;

  switch (effectiveType) {
    case "chars":
      elements = splitIntoChars(element, text);
      break;
    case "words":
      elements = splitIntoWords(element, text);
      break;
    case "lines":
      elements = splitIntoLines(element, text);
      break;
  }

  const revert = () => {
    element.innerHTML = originalHTML;
  };

  return { elements, revert };
}

function splitIntoChars(element: HTMLElement, text: string): HTMLElement[] {
  const chars: HTMLElement[] = [];
  element.innerHTML = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const span = document.createElement("span");
    span.className = "split-char";
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";

    if (char === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.textContent = char;
    }

    element.appendChild(span);
    chars.push(span);
  }

  return chars;
}

function splitIntoWords(element: HTMLElement, text: string): HTMLElement[] {
  const words: HTMLElement[] = [];
  element.innerHTML = "";

  const wordArray = text.split(/\s+/);

  wordArray.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "split-word";
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.textContent = word;

    element.appendChild(span);
    words.push(span);

    if (index < wordArray.length - 1) {
      const space = document.createTextNode(" ");
      element.appendChild(space);
    }
  });

  return words;
}

function splitIntoLines(element: HTMLElement, text: string): HTMLElement[] {
  const lines: HTMLElement[] = [];
  const words = text.split(/\s+/);

  element.innerHTML = "";

  const tempContainer = document.createElement("div");
  tempContainer.style.cssText = window.getComputedStyle(element).cssText;
  tempContainer.style.position = "absolute";
  tempContainer.style.visibility = "hidden";
  tempContainer.style.width = element.offsetWidth + "px";
  document.body.appendChild(tempContainer);

  let currentLine = "";
  let lineElements: string[] = [];

  words.forEach((word, index) => {
    const testLine = currentLine + (currentLine ? " " : "") + word;
    tempContainer.textContent = testLine;

    if (
      tempContainer.offsetHeight > parseFloat(getComputedStyle(element).lineHeight) &&
      currentLine
    ) {
      lineElements.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }

    if (index === words.length - 1 && currentLine) {
      lineElements.push(currentLine);
    }
  });

  document.body.removeChild(tempContainer);

  if (lineElements.length === 0) {
    lineElements = [text];
  }

  lineElements.forEach((line) => {
    const span = document.createElement("span");
    span.className = "split-line";
    span.style.display = "block";
    span.style.willChange = "transform, opacity";
    span.textContent = line;

    element.appendChild(span);
    lines.push(span);
  });

  return lines;
}

export function splitTextMultiple(elements: HTMLElement[], type: SplitType = "chars"): SplitResult {
  const allElements: HTMLElement[] = [];
  const reverts: (() => void)[] = [];

  elements.forEach((el) => {
    const result = splitText(el, type);
    allElements.push(...result.elements);
    reverts.push(result.revert);
  });

  return {
    elements: allElements,
    revert: () => reverts.forEach((r) => r()),
  };
}

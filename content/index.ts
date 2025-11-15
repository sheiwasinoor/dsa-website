// composables/content/index.ts

/* ============================================================
   LANDING PAGE CONTENT + CONSTANTS
   Everything adjustable from here
   ============================================================ */

// --- VIDEO CONSTANTS ---
export const LANDING_VIDEO_SRC = "/videos/dsa-landing.mp4";
export const LANDING_VIDEO_WIDTH = 535;             // px
export const LANDING_VIDEO_MAX_WIDTH = 535;         // responsive limit
export const LANDING_VIDEO_FADE_OUT_DURATION = 900; // ms

// --- TEXT CONSTANTS ---
export const LANDING_TEXT_CONTAINER_WIDTH = 360; // px (both rows will match this exactly)
export const LANDING_TEXT_FONT_SIZE_CN = 24;     // px
export const LANDING_TEXT_FONT_SIZE_EN = 18;     // px

export const LANDING_TEXT_LETTER_SPACING_CN = 8;  // px between characters
export const LANDING_TEXT_LETTER_SPACING_EN = 3;  // px between chars

// --- TEXT CONTENT ---
export const landingCopy = {
  cn: "大漾营造空间新生力",
  en: "DSA NEW SPACE BUILDER",
};
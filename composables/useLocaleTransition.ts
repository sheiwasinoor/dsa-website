// composables/useLocaleTransition.ts
import { ref } from "vue";

type SectionId = string;

interface SectionRef {
  id: SectionId;
  el: HTMLElement | null;
}

// Shared reactive state, module-scoped (same instance app-wide)
const registeredSections = ref<SectionRef[]>([]);
const pendingScrollTarget = ref<HTMLElement | null>(null);
const localeTransitioning = ref(false);

/**
 * Register a scroll section (hero, letter, intro, bio, team, etc.)
 * Can be called from any page; safe to call multiple times (will update).
 */
function registerSection(id: SectionId, el: HTMLElement | null) {
  if (!el) return;

  const existing = registeredSections.value.find((s) => s.id === id);
  if (existing) {
    existing.el = el;
  } else {
    registeredSections.value.push({ id, el });
  }
}

// Clean out dead DOM refs (unmounted elements)
function cleanupDeadRefs() {
  if (typeof document === "undefined") return;
  registeredSections.value = registeredSections.value.filter(
    (s) => s.el && document.body.contains(s.el)
  );
}

// Compute visible area of an element in the viewport
function getVisibleArea(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();

  const visibleWidth = Math.max(
    0,
    Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0)
  );

  const visibleHeight = Math.max(
    0,
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
  );

  return visibleWidth * visibleHeight;
}

/**
 * Decide which block is MOST visible before we change locale.
 * Called right before we fade to black.
 */
function captureVisibleSection() {
  if (typeof window === "undefined") return;

  cleanupDeadRefs();

  let bestEl: HTMLElement | null = null;
  let maxArea = 0;

  for (const { el } of registeredSections.value) {
    if (!el) continue;
    const area = getVisibleArea(el);
    if (area > maxArea) {
      maxArea = area;
      bestEl = el;
    }
  }

  pendingScrollTarget.value = bestEl;
}

/**
 * Smooth scroll to the previously captured block after locale change.
 */
function scrollToCapturedSection() {
  if (typeof window === "undefined") return;

  const el = pendingScrollTarget.value;
  pendingScrollTarget.value = null;
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

function setLocaleTransitioning(value: boolean) {
  localeTransitioning.value = value;
}

export function useLocaleTransition() {
  return {
    // section registration
    registerSection,
    captureVisibleSection,
    scrollToCapturedSection,

    // legacy flags (safe no-op for old LocaleTransition.vue)
    localeTransitioning,
    setLocaleTransitioning,
  };
}
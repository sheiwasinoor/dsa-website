// composables/useGlobalFade.ts
import { ref, nextTick } from "vue";
import { useRouter } from "#app";

/* ============================================================
   GLOBAL FADE CONTROLLER (CINEMATIC)
   - Single source of truth for blackout overlay
   - No router hooks, no Nuxt lifecycle weirdness
   ============================================================ */

const overlayVisible = ref(true); // start black on first load

// ⚠️ Keep this in sync with LOADING_FADE_DURATION in Loading.vue
const FADE_DURATION_MS = 700;

// Extra hold so it never feels like a flicker
const EXTRA_HOLD_MS = 200;

let hasRunInitialFade = false;

export function useGlobalFade() {
  const router = useRouter();

  async function initialFadeIn() {
    if (!process.client) return;
    if (hasRunInitialFade) return;

    hasRunInitialFade = true;

    // We start black, so simply fade out after a moment
    await new Promise((resolve) => setTimeout(resolve, FADE_DURATION_MS));
    overlayVisible.value = false;
  }

  async function navigateWithFade(path: string) {
    if (!process.client) {
      // SSR safeguard
      await router.push(path);
      return;
    }

    if (router.currentRoute.value.path === path) {
      // Already on this page — do nothing
      return;
    }

    // 1. Fade to black
    overlayVisible.value = true;
    await new Promise((resolve) => setTimeout(resolve, FADE_DURATION_MS));

    // 2. Navigate while black
    await router.push(path);
    await nextTick();

    // 3. Hold briefly so content isn't popping during the fade-out
    await new Promise((resolve) => setTimeout(resolve, EXTRA_HOLD_MS));

    // 4. Fade back in
    overlayVisible.value = false;
  }

  return {
    overlayVisible,
    initialFadeIn,
    navigateWithFade,
    FADE_DURATION_MS,
  };
}
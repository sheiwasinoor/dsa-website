// plugins/page-loading.client.ts
import { defineNuxtPlugin } from "#app";
import { useRouter, useRoute } from "#app";
import { ref } from "vue";

/* ============================================================
   GLOBAL FADE LOADER — FINAL STABLE VERSION
   Guarantees EXACTLY one fade cycle per navigation
   And prevents layout-triggered/hydration-triggered duplicates
   ============================================================ */

/* --- CONFIG --- */
const LOADING_MIN_VISIBLE_TIME = 450;
const LOADING_LOGO_DELAY = 220;
const LOADING_HIDE_DELAY = 80;

/* --- GLOBAL STATE --- */
export const globalPageLoading = ref(true);
export const globalShowLogo = ref(false);

/* --- INTERNAL LOCKS --- */
let navigationId = 0;              // increments once per navigation
let activeNavigation = 0;          // tracks currently valid navigation
let bootComplete = false;          // prevents duplicate first fade
let loadingStartTime = 0;

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  /* ============================================================
     BEFORE EACH NAVIGATION
     ============================================================ */
  router.beforeEach((to, from, next) => {
    navigationId++;
    activeNavigation = navigationId;

    // If route disables loader completely
    if (to.meta.disableGlobalLoading) {
      globalPageLoading.value = false;
      globalShowLogo.value = false;
      return next();
    }

    // Initial boot: loader is already visible.
    if (!bootComplete) {
      bootComplete = true;
      loadingStartTime = Date.now();

      setTimeout(() => {
        if (activeNavigation !== navigationId) return;
        globalPageLoading.value = false; // fade-in main content
      }, LOADING_MIN_VISIBLE_TIME);

      return next();
    }

    // Normal navigation using fade-out
    loadingStartTime = Date.now();
    globalPageLoading.value = true;   // show blackout
    globalShowLogo.value = false;

    // Show logo ONLY if loading is slow
    setTimeout(() => {
      if (activeNavigation !== navigationId) return;
      if (globalPageLoading.value) globalShowLogo.value = true;
    }, LOADING_LOGO_DELAY);

    next();
  });

  /* ============================================================
     PAGE FINISH — completes fade-in AFTER navigation resolves
     ============================================================ */
  nuxtApp.hook("page:finish", () => {
    const route = useRoute();

    if (route.meta.disableGlobalLoading) {
      globalPageLoading.value = false;
      globalShowLogo.value = false;
      return;
    }

    const elapsed = Date.now() - loadingStartTime;
    const remain = Math.max(0, LOADING_MIN_VISIBLE_TIME - elapsed);

    // Finish: hide blackout ONCE per navigation
    setTimeout(() => {
      if (activeNavigation !== navigationId) return;

      globalPageLoading.value = false;
      globalShowLogo.value = false;
    }, remain + LOADING_HIDE_DELAY);
  });
});
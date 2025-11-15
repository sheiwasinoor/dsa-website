// composables/useLocale.ts
import { ref } from 'vue';

export type Locale = 'en' | 'zh';

const locale = ref<Locale>('en');
const isFading = ref(false);

export function useLocale() {
  async function startLocaleTransition() {
    if (isFading.value) return;

    isFading.value = true;
    await new Promise((r) => setTimeout(r, 800));

    locale.value = locale.value === 'en' ? 'zh' : 'en';

    await new Promise((r) => setTimeout(r, 800));
    isFading.value = false;
  }

  /* 🔥 NEW FUNCTION — used by landing video fade-out */
  async function triggerFadeOut() {
    if (isFading.value) return;

    isFading.value = true;

    await new Promise((r) => setTimeout(r, 800));

    // NOTE: do NOT switch languages
    // this is ONLY a fade overlay

    // fade stays active until next page loads
  }

  return {
    locale,
    isFading,
    startLocaleTransition,
    triggerFadeOut, // 🔥 expose new function
  };
}
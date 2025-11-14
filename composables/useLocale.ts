// composables/useLocale.ts
import { ref } from 'vue';

export type Locale = 'en' | 'zh';

const locale = ref<Locale>('en');
const isFading = ref(false);

export function useLocale() {
  async function startLocaleTransition() {
    if (isFading.value) return;

    isFading.value = true;

    // Fade out
    await new Promise((r) => setTimeout(r, 800));

    // Switch language ONLY while screen is black
    locale.value = locale.value === 'en' ? 'zh' : 'en';

    // Fade in
    await new Promise((r) => setTimeout(r, 800));

    isFading.value = false;
  }

  return {
    locale,
    isFading,
    startLocaleTransition,
  };
}
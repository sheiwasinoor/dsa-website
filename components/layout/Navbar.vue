<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-40 transition-colors duration-300',
      hasSolidBg ? NAV_BG_SOLID : NAV_BG_TRANSPARENT
    ]"
  >
    <!-- Top divider line -->
    <div :style="{ height: NAV_TOP_DIVIDER_HEIGHT + 'px', background: NAV_TOP_DIVIDER_COLOR }"></div>

    <nav
      class="mx-auto flex items-center justify-between"
      :style="{
        height: NAV_HEIGHT + 'px',
        maxWidth: NAV_MAX_WIDTH + 'px',
        paddingLeft: NAV_PADDING_X + 'px',
        paddingRight: NAV_PADDING_X + 'px'
      }"
    >
      <!-- LOGO -->
      <button type="button" class="focus:outline-none" @click="goHome">
        <img
          src="/images/navbar-logo.png"
          alt="DSA Logo"
          :style="{
            height: NAV_LOGO_HEIGHT + 'px',
            width: 'auto',
            opacity: NAV_LOGO_OPACITY
          }"
        />
      </button>

      <!-- NAV ITEMS -->
      <ul class="flex items-center"
          :style="{ gap: NAV_ITEM_GAP + 'px' }"
      >
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="uppercase transition-colors duration-200"
            :style="{
              fontSize: NAV_LINK_FONT_SIZE + 'rem',
              letterSpacing: NAV_LINK_TRACKING + 'em',
              fontWeight: isActive(item.to) ? NAV_LINK_ACTIVE_WEIGHT : NAV_LINK_WEIGHT,
              color: isActive(item.to) ? NAV_LINK_ACTIVE_COLOR : NAV_LINK_COLOR
            }"
            :class="linkHoverClass"
          >
            {{ item.label[locale] ?? item.label.en }}
          </NuxtLink>
        </li>

        <!-- LANGUAGE TOGGLE -->
        <li>
          <button
            type="button"
            class="uppercase transition-colors duration-200 focus:outline-none"
            :style="{
              fontSize: NAV_LANG_FONT_SIZE + 'rem',
              letterSpacing: NAV_LANG_TRACKING + 'em',
              fontWeight: NAV_LANG_WEIGHT,
              color: NAV_LANG_COLOR
            }"
            :class="linkHoverClass"
            @click="startLocaleTransition"
          >
            {{ locale === 'en' ? '中文' : 'EN' }}
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
// --------------------------------------------
// NAV CONFIG (all tweakable values)
// --------------------------------------------
const NAV_HEIGHT = 82;
const NAV_MAX_WIDTH = 1400;
const NAV_PADDING_X = 38;

const NAV_BG_SOLID = "bg-[#000C05]/95";
const NAV_BG_TRANSPARENT = "bg-transparent";

const NAV_TOP_DIVIDER_HEIGHT = 1;
const NAV_TOP_DIVIDER_COLOR = "#5D676240"; // 40% opacity

// LOGO
const NAV_LOGO_HEIGHT = 34;
const NAV_LOGO_OPACITY = 0.92;

// NAV LINKS
const NAV_ITEM_GAP = 62;
const NAV_LINK_FONT_SIZE = 0.82;      // rem
const NAV_LINK_TRACKING = 0.12;       // em
const NAV_LINK_WEIGHT = 400;
const NAV_LINK_ACTIVE_WEIGHT = 600;

const NAV_LINK_COLOR = "#5F7665";     // muted green
const NAV_LINK_ACTIVE_COLOR = "#ECEBC7";

const NAV_LANG_FONT_SIZE = 0.82;
const NAV_LANG_TRACKING = 0.12;
const NAV_LANG_WEIGHT = 400;
const NAV_LANG_COLOR = "#5F7665";

// Hover effect (same for links + language)
const linkHoverClass =
  "hover:font-semibold hover:text-[#ECEBC7] hover:[text-shadow:0_0_8px_rgba(236,235,199,0.65)]";

// --------------------------------------------
// LOGIC
// --------------------------------------------
import { useRouter, useRoute } from 'vue-router';
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { useTheme } from '~/composables/useTheme';
import { useLocale } from '~/composables/useLocale';

const router = useRouter();
const route = useRoute();

const { theme } = useTheme();
const { locale, startLocaleTransition } = useLocale();

const hasSolidBg = ref(false);

const handleScroll = () => {
  hasSolidBg.value = window.scrollY > 40;
};

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll);
  }
});

const goHome = () => {
  if (route.path === '/home') return;
  router.push('/home');
};

const navItems = [
  { to: '/about', label: { en: 'ABOUT', zh: '关于我们' } },
  { to: '/landscape', label: { en: 'LANDSCAPE ARCHITECTURE', zh: '景观设计' } },
  { to: '/young-news', label: { en: 'YOUNG NEWS', zh: 'YOUNG 新闻' } },
  { to: '/contact', label: { en: 'CONTACT US', zh: '联系我们' } }
];

const isActive = (to: string) => {
  return route.path === to || route.path.startsWith(to + '/');
};
</script>

<style scoped>
/* Keep hover glow behavior clean */
a:hover,
button:hover {
  text-shadow: 0 0 8px rgba(236, 235, 199, 0.65);
}
</style>
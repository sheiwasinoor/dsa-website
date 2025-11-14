<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-40 transition-colors duration-300',
      hasSolidBg ? 'bg-[#000C05]/95' : 'bg-transparent'
    ]"
  >
    <!-- Top divider line -->
    <div class="h-px w-full bg-[#5D6762]/40"></div>

    <nav class="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
      <!-- Logo button -->
      <button
        type="button"
        class="flex items-center gap-2 focus:outline-none"
        @click="goHome"
      >
        <div class="flex items-center gap-2">
          <!-- Replace with actual logo image when ready -->
          <span class="text-lg font-semibold tracking-wide text-[#ECEBC7]">
            DSA DESIGN
          </span>
        </div>
      </button>

      <!-- Nav items -->
      <ul class="flex items-center gap-12">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="border-b border-current pb-1 text-sm tracking-[0.12em] uppercase transition-colors duration-200"
            :class="linkClasses(item.to)"
          >
            {{ item.label[locale] ?? item.label.en }}
          </NuxtLink>
        </li>

        <!-- Language toggle -->
        <li>
          <button
            type="button"
            class="border-b border-current pb-1 text-sm tracking-[0.12em] uppercase transition-colors duration-200"
            :class="languageClasses"
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
  {
    to: '/about',
    label: { en: 'ABOUT', zh: '关于我们' }
  },
  {
    to: '/landscape',
    label: { en: 'LANDSCAPE ARCHITECTURE', zh: '景观设计' }
  },
  {
    to: '/young-news',
    label: { en: 'YOUNG NEWS', zh: 'YOUNG 新闻' }
  },
  {
    to: '/contact',
    label: { en: 'CONTACT US', zh: '联系我们' }
  }
];

const isActive = (to: string) => {
  return route.path === to || route.path.startsWith(to + '/');
};

const linkClasses = (to: string) => {
  const active = isActive(to);
  return [
    'font-normal',
    active ? 'font-semibold text-[#ECEBC7]' : 'text-[#336341]'
  ];
};

const languageClasses = computed(() => {
  return ['font-normal', 'text-[14px]', 'text-[#336341]'];
});
</script>

<style scoped>
a:hover,
button:hover {
  font-weight: 600;
  color: #ecebc7;
  text-shadow: 0 0 8px rgba(236, 235, 199, 0.65);
}

a.router-link-active {
  font-weight: 600;
  color: #336341;
}
</style>
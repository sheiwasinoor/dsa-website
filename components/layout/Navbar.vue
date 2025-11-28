<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 transition-colors duration-300"
    :style="headerStyle"
  >
    <!-- Top divider line -->
    <div class="h-px w-full bg-[color:var(--nav-divider)]"></div>

    <nav
      class="mx-auto flex h-16 max-w-6xl items-center justify-between"
      :style="navStyle"
    >
      <!-- Logo button -->
      <button
        type="button"
        class="flex items-center gap-[var(--nav-gap-logo)] focus:outline-none"
        @click="goHome"
      >
        <img
          src="/images/navbar-logo.png"
          alt="DSA Design"
          class="h-8 w-auto"
        />
      </button>

      <!-- Nav items -->
      <ul class="flex items-center gap-[var(--nav-gap-items)]">
        
        <!-- ABOUT -->
        <li>
          <button
            type="button"
            class="nav-link"
            :class="{
              'active-link': isRouteActive('/about'),
              'inactive-link': !isRouteActive('/about')
            }"
            @click="goTo('/about')"
          >
            {{ locale === 'en' ? 'ABOUT' : '关于我们' }}
          </button>
        </li>

        <!-- DESIGN CLUSTER -->
        <li
          class="relative"
          @mouseenter="openDesignDropdown"
          @mouseleave="closeDesignDropdown"
        >
          <!-- Main dynamic label -->
          <div ref="designTrigger">
            <button
              type="button"
              class="nav-link"
              :class="{
                'active-link': isDesignClusterActive,
                'inactive-link': !isDesignClusterActive
              }"
              @click="goTo(activeDesignItem.to)"
            >
              {{ activeDesignItem.label[locale] ?? activeDesignItem.label.en }}
            </button>
          </div>

          <!-- Dropdown: two others -->
          <transition name="dropdown-delayed">
            <div
              v-if="isDropdownOpen"
              class="absolute left-0 mt-[var(--dropdown-offset-y)] whitespace-nowrap transition-opacity duration-300"
              :style="{ ...dropdownPanelStyle, minWidth: dropdownWidth }"
            >
              <ul class="flex flex-col gap-[var(--dropdown-gap)]">
                <li v-for="item in otherDesignItems" :key="item.to">
                  <button
                    type="button"
                    class="dropdown-link"
                    :class="{
                      'active-link': isRouteActive(item.to),
                      'inactive-link': !isRouteActive(item.to)
                    }"
                    @click="handleDesignChildClick(item.to)"
                  >
                    {{ item.label[locale] ?? item.label.en }}
                  </button>
                </li>
              </ul>
            </div>
          </transition>
        </li>

        <!-- YOUNG NEWS -->
        <li>
          <button
            type="button"
            class="nav-link"
            :class="{
              'active-link': isRouteActive('/young-news'),
              'inactive-link': !isRouteActive('/young-news')
            }"
            @click="goTo('/young-news')"
          >
            {{ locale === 'en' ? 'YOUNG NEWS' : 'YOUNG 新闻' }}
          </button>
        </li>

        <!-- CONTACT -->
        <li>
          <button
            type="button"
            class="nav-link"
            :class="{
              'active-link': isRouteActive('/contact'),
              'inactive-link': !isRouteActive('/contact')
            }"
            @click="goTo('/contact')"
          >
            {{ locale === 'en' ? 'CONTACT US' : '联系我们' }}
          </button>
        </li>

        <!-- Language toggle -->
        <li>
          <button
            type="button"
            class="nav-link"
            :class="{
              'inactive-link': true
            }"
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
import { useRouter, useRoute } from "vue-router";
import {
  computed,
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";
import { useTheme } from "~/composables/useTheme";
import { useLocale } from "~/composables/useLocale";
import { useGlobalFade } from "~/composables/useGlobalFade";

const router = useRouter();
const route = useRoute();

const { theme } = useTheme();
if (import.meta.client) {
  document.documentElement.setAttribute("data-theme", theme.value);
}
watch(
  () => theme.value,
  (newTheme) => {
    if (import.meta.client) {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  }
);
const { locale, startLocaleTransition } = useLocale();
const { navigateWithFade } = useGlobalFade();

const hasSolidBg = ref(false);
const isDropdownOpen = ref(false);

/* ----------------------------------------------
   Navbar spacing vars
---------------------------------------------- */
const navStyle = computed(() => ({
  paddingLeft: "var(--nav-padding-x)",
  paddingRight: "var(--nav-padding-x)",
  "--nav-padding-x": "1.5rem",
  "--nav-gap-logo": "0.5rem",
  "--nav-gap-items": "3rem",
  "--dropdown-gap": "0.75rem",
  "--dropdown-offset-y": "0.5rem",
  "--nav-text-size": "14px",
}));

/* ----------------------------------------------
   Smooth scroll background
---------------------------------------------- */
const headerStyle = computed(() => ({
  backgroundColor: isDropdownOpen.value
    ? "rgba(0,12,5,1)" 
    : hasSolidBg.value
      ? "rgba(0,12,5,0.92)"
      : "transparent",
  transition: "background-color 520ms cubic-bezier(0.22, 0.61, 0.36, 1)"
}));

const dropdownPanelStyle = computed(() => ({
  backgroundColor: "rgba(0,12,5,1)",
  transition: "background-color 160ms ease, opacity 160ms ease",
  paddingTop: "var(--dropdown-padding-y)",
  paddingBottom: "var(--dropdown-padding-y)",
  paddingLeft: "var(--dropdown-padding-x)",
  paddingRight: "var(--dropdown-padding-x)",
  "--dropdown-padding-x": "0rem",
  "--dropdown-padding-y": "0rem",
}));

/* ----------------------------------------------
   Scroll listener
---------------------------------------------- */
function handleScroll() {
  hasSolidBg.value = window.scrollY > 40;
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("scroll", handleScroll);
  }
});

/* ----------------------------------------------
   Close dropdown when route changes
---------------------------------------------- */
watch(
  () => route.path,
  () => {
    isDropdownOpen.value = false;
  }
);

/* ----------------------------------------------
   Design cluster (Landscape / Lighting / Young Art)
---------------------------------------------- */
const designItems = [
  {
    key: "landscape",
    to: "/landscape",
    label: { en: "LANDSCAPE ARCHITECTURE", zh: "景观设计" },
  },
  {
    key: "lighting",
    to: "/lighting",
    label: { en: "LIGHTING", zh: "灯光设计" },
  },
  {
    key: "youngArt",
    to: "/youngArt",
    label: { en: "YOUNG ART", zh: "YOUNG 艺术" },
  },
];

const designClusterPaths = ["/landscape", "/lighting", "/youngArt"];

const activeDesignKey = computed(() => {
  const current = designItems.find((item) =>
    route.path.startsWith(item.to)
  );
  return current?.key ?? "landscape";
});

const activeDesignItem = computed(() =>
  designItems.find((item) => item.key === activeDesignKey.value)
);

const otherDesignItems = computed(() =>
  designItems.filter((item) => item.key !== activeDesignKey.value)
);

const isDesignClusterActive = computed(() =>
  designClusterPaths.some((p) => route.path.startsWith(p))
);

/* ----------------------------------------------
   Helpers
---------------------------------------------- */
function isRouteActive(to: string) {
  return route.path === to || route.path.startsWith(to + "/");
}

function goHome() {
  navigateWithFade("/home");
}

function goTo(to: string) {
  navigateWithFade(to);
}

function handleDesignChildClick(to: string) {
  navigateWithFade(to);
  isDropdownOpen.value = false;
}

/* ----------------------------------------------
   Dropdown hover
---------------------------------------------- */
const designTrigger = ref(null);
const dropdownWidth = ref('0px');

function openDesignDropdown() {
  if (isDropdownOpen.value) return;
  isDropdownOpen.value = true;
  if (designTrigger.value) {
    dropdownWidth.value = designTrigger.value.offsetWidth + 32 + 'px';
  }
}

function closeDesignDropdown() {
  isDropdownOpen.value = false;
}
</script>

<style>

/* ----------------------------------------------
   ACTIVE & INACTIVE states
---------------------------------------------- */
.active-link {
  font-weight: 600;
  color: var(--nav-active) !important;
}

.inactive-link {
  font-weight: 500;
  color: var(--nav-inactive) !important;
}

/* ----------------------------------------------
   Base link styling
---------------------------------------------- */
.nav-link,
.dropdown-link {
  border-bottom: 1px solid transparent;
  padding-bottom: 0.25rem;
  padding: 0.35rem 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.95;
  transition:
    color 120ms ease-out,
    text-shadow 160ms ease-out,
    letter-spacing 120ms ease-out,
    opacity 120ms ease-out;
  font-size: var(--nav-text-size);
}

/* ----------------------------------------------
   Unified transition timing for nav-link and dropdown-link
---------------------------------------------- */
.dropdown-link,
.nav-link {
  transition: color 160ms ease, opacity 160ms ease, text-shadow 160ms ease;
}

/* ----------------------------------------------
   Hover glow (no layout shift)
---------------------------------------------- */
.nav-link:hover:not(.active-link),
.dropdown-link:hover:not(.active-link) {
  opacity: 1;
  color: var(--nav-active) !important;
  text-shadow: 0 0 10px color-mix(
    in srgb,
    var(--nav-active) 70%,
    transparent
  );
}

/* ----------------------------------------------
   Dropdown animation
---------------------------------------------- */

.dropdown-delayed-enter-active {
  transition: opacity 320ms ease-out;
  transition-delay: 520ms; /* wait for navbar bg transition */
}

.dropdown-delayed-leave-active {
  transition: opacity 320ms ease-out;
  transition-delay: 0ms;
}

.dropdown-delayed-enter-from,
.dropdown-delayed-leave-to {
  opacity: 0;
}
</style>
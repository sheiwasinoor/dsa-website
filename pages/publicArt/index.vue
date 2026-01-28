<template>
  <div class="bg-[#000C05] text-[#ECEBC7] min-h-screen">

    <!-- ======================================= -->
    <!-- 1. HERO SECTION -->
    <!-- ======================================= -->
    <section
      ref="heroSection"
      class="hero-section"
      :class="[
        'relative w-full flex items-center justify-center overflow-hidden reveal-block',
        { 'reveal-visible': reveals.hero }
      ]"
      :style="{ minHeight: YOUNGART_HERO_MIN_HEIGHT + 'vh' }"
    >
      <!-- Background -->
      <img
        src="/images/youngArt-hero.jpg"
        alt="Young Art Architecture"
        class="absolute inset-0 w-full h-full object-cover object-center"
        :style="{ transform: `scale(${YOUNGART_HERO_IMAGE_SCALE})` }"
      />

      <!-- Overlay -->
      <div
        class="absolute inset-0 w-full h-full"
        :style="{ backgroundColor: `rgba(0,0,0,${YOUNGART_HERO_OVERLAY_OPACITY})` }"
      ></div>

      <!-- HERO CONTENT -->
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center text-[#ECEBC7] hero-content">

        <div
          class="h-px mx-auto hero-line"
          :style="{
            marginBottom: YOUNGART_HERO_LINE_SPACING + 'vh',
            width: YOUNGART_HERO_LINE_WIDTH + 'px',
            backgroundColor: YOUNGART_HERO_LINE_COLOR
          }"
        ></div>

        <h1
class="uppercase"
  :style="{
    fontSize: YOUNGART_HERO_TITLE_SIZE + 'px',
    marginBottom: YOUNGART_HERO_TITLE_SPACING + 'px',
    letterSpacing: YOUNGART_HERO_TITLE_TRACKING + 'em',
    fontWeight: 600,
    color: YOUNGART_HERO_TEXT_COLOR
  }"
        >
          {{ heroCopy.title[locale] }}
        </h1>

<p
  class="leading-relaxed mx-auto text-justify hero-body"
  :style="{
    fontSize: YOUNGART_HERO_PARAGRAPH_SIZE + 'px',
    maxWidth: YOUNGART_HERO_PARAGRAPH_WIDTH + 'px',
    fontWeight: 200,
    letterSpacing: '-0.01em',
    lineHeight: '26px',
    textWrap: 'pretty',
    color: YOUNGART_HERO_TEXT_SOFT_COLOR,
    paddingTop: YOUNGART_HERO_PARAGRAPH_TOP_PADDING + 'vh',
    paddingBottom: YOUNGART_HERO_PARAGRAPH_BOTTOM_PADDING + 'vh'
  }"
>
  {{ heroCopy.body[locale] }}
</p>

<div
  class="h-px mx-auto hero-line"
  :style="{
    marginTop: YOUNGART_HERO_BOTTOM_LINE_SPACING + 'vh',
    width: YOUNGART_HERO_LINE_WIDTH + 'px',
    backgroundColor: YOUNGART_HERO_LINE_COLOR_BOTTOM
  }"
></div>
      </div>
    </section>



    <!-- ======================================= -->
    <!-- 2. SEARCH BAR -->
    <!-- ======================================= -->
    <div
      ref="searchSection"
      class="search-wrap"
      :class="[
        'max-w-6xl mx-auto flex justify-end reveal-block',
        { 'reveal-visible': reveals.search }
      ]"
      :style="{
        paddingTop: YOUNGART_SEARCH_TOP_PADDING + 'vh',
        paddingBottom: YOUNGART_SEARCH_BOTTOM_PADDING + 'vh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }"
    >
      <div
        class="relative group transition-all duration-500 border-b"
        :style="{
          width: YOUNGART_SEARCH_WIDTH + 'px',
          borderColor: '#9A96CC'
        }"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="search keywords"
          class="bg-transparent text-[#9A96CC] placeholder-[#9A96CC] tracking-wide
                 focus:outline-none text-sm transition-all duration-500 pr-8 w-full pb-2"
        />

        <svg
          class="absolute right-0 top-1/2 -translate-y-1/2 stroke-[#9A96CC]
                 transition-transform duration-500 group-focus-within:translate-x-1 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          :style="{
            width: YOUNGART_SEARCH_ICON_SIZE + 'px',
            height: YOUNGART_SEARCH_ICON_SIZE + 'px'
          }"
        >
          <circle cx="11" cy="11" r="7" stroke-width="2"></circle>
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke-width="2"></line>
        </svg>
      </div>
    </div>



    <!-- ======================================= -->
    <!-- 3. PROJECT GRID -->
    <!-- ======================================= -->
    <div
      ref="gridSection"
      class="grid-wrap"
      :class="[
        'max-w-6xl mx-auto reveal-block',
        { 'reveal-visible': reveals.grid }
      ]"
      :style="{
        paddingTop: YOUNGART_GRID_TOP_PADDING + 'vh',
        paddingBottom: YOUNGART_GRID_BOTTOM_PADDING + 'vh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }"
    >
      <TransitionGroup
        name="youngArt-grid"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        :style="{
          gap: YOUNGART_GRID_GAP + 'px',
          '--filter-duration': YOUNGART_GRID_FILTER_ANIMATION_DURATION + 'ms'
        }"
      >
        <article
          @click="goTo(p.slug)"
          v-for="(p, i) in filteredProjects"
          :key="p.id"
          class="relative group overflow-hidden bg-[#101A14] rounded-md cursor-pointer card-lift"
          :class="{ 'is-mobile-hover': hoverMap[p.id] }"
          :data-project-id="p.id"
          :style="{
            height: YOUNGART_GRID_CARD_HEIGHT + 'px',
            '--card-delay': `${(i % 6) * 70 + (i % 3) * 25}ms`
          }"
        >
          <!-- Thumbnail -->
          <img
            :src="p.thumbnail"
            :alt="p.title[locale]"
            class="w-full h-full object-cover transition-transform mobile-hover-image"
            :style="{
              transitionDuration: YOUNGART_GRID_IMAGE_ZOOM_DURATION + 'ms',
              transitionTimingFunction: 'cubic-bezier(0.33,1,0.68,1)'
            }"
            loading="lazy"
            decoding="async"
          />

          <!-- Hover Overlay -->
          <div
            class="absolute inset-x-0 bottom-0 bg-black/55 project-overlay"
            :style="{
              '--overlay-height': YOUNGART_GRID_HOVER_OVERLAY_HEIGHT + '%',
              '--overlay-duration': YOUNGART_GRID_HOVER_OVERLAY_DURATION + 'ms'
            }"
          >
            <!-- Project Title (INSIDE overlay, top-left) -->
            <div
              class="absolute left-0 top-0 p-5 z-10 project-title text-left"
              :style="{
                '--text-fade-duration': YOUNGART_GRID_TEXT_FADE_DURATION + 'ms'
              }"
            >
              <p
                class="font-semibold text-white"
                :style="{ fontSize: YOUNGART_GRID_TITLE_SIZE + 'rem' }"
              >
                {{ p.title[locale] }}
              </p>
            </div>
          </div>
        </article>
      </TransitionGroup>
    </div>

  </div>
</template>



<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useLocale } from '~/composables/useLocale';
import { heroCopy } from '~/content/youngArt';

const { locale } = useLocale();
const projects = ref([]);
const hoverMap = ref<Record<string, boolean>>({});
const hoverObserverRef = ref<IntersectionObserver | null>(null);
const isMobile = ref(false);
let mobileQuery: MediaQueryList | null = null;

onMounted(async () => {
  projects.value = await $fetch("/api/projects/list?destination=youngArt");
  nextTick(() => {
    setMobileState();
  });
});

//
// ============================================================
//   CONFIG — ALL VALUES HERE
// ============================================================
//

// HERO COLORS + LINES
const YOUNGART_HERO_TEXT_COLOR = "#ECEBC7";          // main hero title + body color
const YOUNGART_HERO_TEXT_SOFT_COLOR = "#D8DCDD";   // softer version (body)
const YOUNGART_HERO_LINE_COLOR = "#9A96CC"; // top divider
const YOUNGART_HERO_LINE_COLOR_BOTTOM = "#9A96CC"; // bottom divider

// HERO
const YOUNGART_HERO_MIN_HEIGHT = 100;
const YOUNGART_HERO_IMAGE_SCALE = 1.04;
const YOUNGART_HERO_OVERLAY_OPACITY = 0.69;
const YOUNGART_HERO_LINE_WIDTH = 656;
const YOUNGART_HERO_LINE_SPACING = 3;
const YOUNGART_HERO_TITLE_SIZE = 28;
const YOUNGART_HERO_TITLE_SPACING = 0.5;
const YOUNGART_HERO_TITLE_TRACKING = 0.14; // em — adjust to taste
const YOUNGART_HERO_PARAGRAPH_SIZE = 16;
const YOUNGART_HERO_PARAGRAPH_WIDTH = 580;

// HERO — EXTRA SPACING
const YOUNGART_HERO_PARAGRAPH_TOP_PADDING = 1.5;   // vh
const YOUNGART_HERO_PARAGRAPH_BOTTOM_PADDING = 1.5; // vh

// HERO — BOTTOM LINE SPACING (separate control)
const YOUNGART_HERO_BOTTOM_LINE_SPACING = 3; // vh

// SEARCH BAR
const YOUNGART_SEARCH_WIDTH = 260;
const YOUNGART_SEARCH_ICON_SIZE = 16;
const YOUNGART_SEARCH_TOP_PADDING = 6;
const YOUNGART_SEARCH_BOTTOM_PADDING = 1;
const YOUNGART_SEARCH_BORDER_COLOR = '#336341';

// GRID
const YOUNGART_GRID_TOP_PADDING = 1;
const YOUNGART_GRID_BOTTOM_PADDING = 14;
const YOUNGART_GRID_GAP = 32; // Increased from 28 → 32
const YOUNGART_GRID_CARD_HEIGHT = 336; // 20% bigger (old 280)
const YOUNGART_GRID_IMAGE_ZOOM_DURATION = 500;
const YOUNGART_GRID_HOVER_OVERLAY_DURATION = 450;
const YOUNGART_GRID_HOVER_OVERLAY_HEIGHT = 35;
const YOUNGART_GRID_TEXT_FADE_DURATION = 320;
const YOUNGART_GRID_FILTER_ANIMATION_DURATION = 400;
const YOUNGART_GRID_TITLE_SIZE = 1.32; // Increased 15% from 1.15

// SEARCH FILTER
const searchQuery = ref('');

const filteredProjects = computed(() => {
  if (!searchQuery.value.trim()) return projects.value;

  const q = searchQuery.value.toLowerCase();

  return projects.value.filter(
    (p) =>
      p.title.en.toLowerCase().includes(q) ||
      p.title.zh.includes(q) ||
      p.keywords.some((kw: string) => kw.toLowerCase().includes(q))
  );
});

//GoTO Function to go to slug
function goTo(slug: string) {
  navigateTo(`/${slug}`);
}

/* Scroll reveals */
const heroSection = ref<HTMLElement | null>(null);
const searchSection = ref<HTMLElement | null>(null);
const gridSection = ref<HTMLElement | null>(null);

const reveals = ref({
  hero: false,
  search: false,
  grid: false, // stays hidden until observer or timeout flips it
});

const observerRef = ref<IntersectionObserver | null>(null);

onMounted(() => {
  // Fail-safe so thumbnails don't stay invisible if observer never fires (e.g., offscreen)
  const gridTimeout = setTimeout(() => {
    reveals.value.grid = true;
  }, 400);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        if (target === heroSection.value) reveals.value.hero = true;
        if (target === searchSection.value) reveals.value.search = true;
        if (target === gridSection.value) reveals.value.grid = true;
        observer.unobserve(target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
  );

  [heroSection.value, searchSection.value, gridSection.value].forEach(
    (el) => el && observer.observe(el)
  );

  observerRef.value = observer;

  onBeforeUnmount(() => {
    clearTimeout(gridTimeout);
  });
});

onBeforeUnmount(() => {
  observerRef.value?.disconnect();
  hoverObserverRef.value?.disconnect();
  if (mobileQuery) {
    mobileQuery.removeEventListener("change", setMobileState);
  }
});

watch(filteredProjects, () => {
  nextTick(() => {
    if (isMobile.value) {
      initHoverObserver();
    }
  });
});

function setMobileState() {
  if (!import.meta.client) return;
  if (!mobileQuery) {
    mobileQuery = window.matchMedia("(max-width: 900px)");
    mobileQuery.addEventListener("change", setMobileState);
  }
  isMobile.value = mobileQuery.matches;
  if (!isMobile.value) {
    hoverMap.value = {};
    hoverObserverRef.value?.disconnect();
    return;
  }
  initHoverObserver();
}

function initHoverObserver() {
  if (!isMobile.value) return;
  hoverObserverRef.value?.disconnect();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.projectId;
        if (!id) return;
        hoverMap.value[id] = entry.isIntersecting;
      });
    },
    { threshold: 0.6, rootMargin: "0px 0px -15% 0px" }
  );

  document
    .querySelectorAll<HTMLElement>("[data-project-id]")
    .forEach((el) => observer.observe(el));

  hoverObserverRef.value = observer;
}
</script>

<style scoped>
.hero-body {
  text-align: justify !important;
  text-wrap: pretty;
}

.hero-line {
  display: block;
  margin-left: auto !important;
  margin-right: auto !important;
}

@media (min-width: 1024px) {
  .hero-section {
    min-height: 80vh !important;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 720px) {
  .hero-section {
    min-height: 68vh !important;
    padding: 76px 0 32px 0;
    align-items: center;
  }

  .hero-content {
    max-width: 92vw !important;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-line {
    width: 90vw !important;
  }

  .hero-content h1 {
    font-size: 22px !important;
    letter-spacing: 0.05em !important;
    margin-bottom: 14px !important;
  }

  .hero-body {
    font-size: 14px !important;
    max-width: 80vw !important;
    line-height: 22px !important;
    padding-top: 12px !important;
    padding-bottom: 14px !important;
    text-align: justify !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .search-wrap {
    justify-content: center !important;
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }

  .search-wrap > div {
    width: 100% !important;
    max-width: 520px;
  }

  .grid-wrap {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    padding-top: 24px !important;
    padding-bottom: 48px !important;
  }

  .grid-wrap .grid {
    gap: 16px !important;
  }
}
</style>



<style scoped>
.project-overlay {
  position: absolute;
  height: 0;
  transition: height var(--overlay-duration) cubic-bezier(0.33, 1, 0.68, 1);
}
.group:hover .project-overlay {
  height: var(--overlay-height);
}

.project-title {
  opacity: 0;
  transform: translateY(-6px);
  transition:
    opacity var(--text-fade-duration) ease-out,
    transform var(--text-fade-duration) ease-out;
}
.group:hover .project-title {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 900px) {
  .is-mobile-hover .project-overlay {
    height: var(--overlay-height);
  }

  .is-mobile-hover .project-title {
    opacity: 1;
    transform: translateY(0);
  }

  .is-mobile-hover .mobile-hover-image {
    transform: scale(1.04);
  }
}

.youngArt-grid-enter-active {
  transition:
    opacity 620ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 720ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--card-delay, 0ms);
}
.youngArt-grid-leave-active {
  transition:
    opacity 220ms ease-in,
    transform 260ms ease-in;
}
.youngArt-grid-move {
  transition: transform var(--filter-duration) ease-out;
}
.youngArt-grid-enter-from,
.youngArt-grid-leave-to {
  opacity: 0;
  transform: translateY(28px) scale(0.98);
}

/* Reveal primitives */
.reveal-block {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 800ms cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 900ms cubic-bezier(0.25, 0.1, 0.25, 1);
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Card hover */
.card-lift {
  transition:
    transform 630ms cubic-bezier(0.33, 1, 0.68, 1),
    box-shadow 630ms cubic-bezier(0.33, 1, 0.68, 1);
}
.card-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}
.card-lift:active {
  transform: translateY(2px) scale(0.96);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-block,
  .card-lift {
    transition-duration: 0ms !important;
    transform: none !important;
    box-shadow: none !important;
  }
}
</style>

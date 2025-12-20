<template>
  <div class="relative">
    <div
      v-if="project"
      class="min-h-screen"
      :style="{ backgroundColor: PAGE_BG_COLOR, color: TEXT_COLOR }"
    >
      <!-- =============================== -->
      <!-- 1. HERO IMAGE (BELOW NAVBAR)   -->
      <!-- =============================== -->
      <div
        class="relative w-full overflow-hidden"
        :style="{
          height: HERO_HEIGHT_REM + 'rem',
          marginTop: HERO_TOP_OFFSET_REM + 'rem'
        }"
      >

        <!-- main hero image -->
        <div
          class="absolute inset-0 hero-img-wrap"
          :style="{ transform: `translateY(${heroParallaxY}px)` }"
        >
          <Transition name="hero-swap" mode="out-in">
            <img
              :key="currentHeroUrl"
              :src="currentHeroUrl"
              :alt="currentHeroAlt"
              class="w-full h-full object-cover object-center hero-img"
            />
          </Transition>
        </div>

      </div>

      <!-- =============================== -->
      <!-- 2. TITLE + DESCRIPTION + META   -->
      <!-- =============================== -->
      <section
        class="max-w-5xl mx-auto px-6 page-enter"
        :style="{ marginTop: CONTENT_TOP_MARGIN_REM + 'rem' }"
      >
        <div
          class="grid grid-cols-1 md:grid-cols-[6.71fr_3.29fr]"
          :style="{ gap: CONTENT_COL_GAP_REM + 'rem', marginTop: CONTENT_TOP_MARGIN_REM + 'rem' }"
        >
          <!-- LEFT: title + description -->
          <div>
            <h1
              class="font-semibold"
              :style="{
                fontSize: TITLE_FONT_SIZE_REM + 'rem',
                letterSpacing: TITLE_TRACKING,
                marginBottom: TITLE_BOTTOM_MARGIN_REM + 'rem',
                color: TITLE_COLOR
              }"
            >
              {{ project.title[locale] }}
            </h1>

            <p
            class="leading-relaxed"
            :style="{
              opacity: DESCRIPTION_TEXT_OPACITY,
              fontWeight: 200,
              textAlign: 'justify',
              textJustify: 'inter-word',
              textWrap: 'pretty',
              fontSize: BODY_FONT_SIZE_REM + 'rem',
              color: BODY_COLOR,
              letterSpacing: '0.02rem',
              marginBottom: isMobile ? '1rem' : '2rem'
            }"
          >
            {{ project.description[locale] }}
          </p>
          </div>


          <!-- RIGHT: meta info -->
          <!-- RIGHT: meta info -->
                        <div
                        class="leading-relaxed space-y-0.5"
                        :style="{
                          paddingTop: '72px',
                          color: META_TEXT_COLOR,
                          fontSize: '12px'
                        }"
                        >
                          <p v-if="project.location || project.locationZh">
                            <span class="font-light tracking-wider"
                              :style="{ color: META_LABEL_COLOR }"
                            >
                              {{ locale === 'zh' ? '项目地点： ' : 'Project Location: ' }}
                            </span>
                            <span :style="{ color: META_VALUE_COLOR }">
                              {{ locale === 'zh'
                                  ? (project.locationZh || project.location)
                                  : project.location }}
                            </span>
                          </p>

                          <p v-if="project.client || project.clientZh">
                           <span class="font-light tracking-wider"
                            :style="{ color: META_LABEL_COLOR }"
                          >
                            {{ locale === 'zh' ? '项目业主： ' : 'Client: ' }}
                          </span>
                            <span :style="{ color: META_VALUE_COLOR }">
                              {{ locale === 'zh'
                                  ? (project.clientZh || project.client)
                                  : project.client }}
                            </span>
                          </p>

                          <p v-if="project.status || project.statusZh">
                            <span class="font-light tracking-wider"
                              :style="{ color: META_LABEL_COLOR }"
                            >
                              {{ locale === 'zh' ? '项目状态： ' : 'Project Status: ' }}
                            </span>
                            <span :style="{ color: META_VALUE_COLOR }">
                              {{ locale === 'zh'
                                  ? (project.statusZh || project.status)
                                  : project.status }}
                            </span>
                          </p>

                          <p v-if="project.service || project.serviceZh">
                            <span class="font-light tracking-wider"
                            :style="{ color: META_LABEL_COLOR }"
                          >
                            {{ locale === 'zh' ? '服务内容： ' : 'Service: ' }}
                          </span>
                            <span :style="{ color: META_VALUE_COLOR }">
                              {{ locale === 'zh'
                                  ? (project.serviceZh || project.service)
                                  : project.service }}
                            </span>
                          </p>
                        </div>
        </div>
      </section>

      <!-- =============================== -->
      <!-- 3. GALLERY GRID (NO TITLE)     -->
      <!-- =============================== -->
      <section
        class="max-w-5xl mx-auto px-6"
        :style="{
          marginTop: GALLERY_TOP_MARGIN_REM + 'rem',
          paddingBottom: PAGE_BOTTOM_PADDING_REM + 'rem'
        }"
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          :style="{ gap: GALLERY_GAP_REM + 'rem' }"
        >
          <div
            v-for="(img, idx) in project.images"
            :key="img.id"
            class="overflow-hidden rounded cursor-pointer thumb-card"
            :style="{ height: GALLERY_CARD_HEIGHT_REM + 'rem' }"
            @click="openPreview(idx)"
          >
            <img
              :src="img.url"
              :alt="img.alt ? img.alt[locale] : project.title[locale]"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
            />
          </div>
        </div>
      </section>

      <!-- =============================== -->
      <!-- 4. IMAGE PREVIEW MODAL         -->
      <!-- =============================== -->
      <transition name="fade">
        <div
          v-if="previewOpen"
          class="fixed inset-0 z-50 flex items-center justify-center"
          :style="{ backgroundColor: 'rgba(0,0,0,0.72)' }"
          @click.self="closePreview"
        >
        <div
          class="relative w-[92vw] max-w-5xl"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
            <!-- close -->
            <button
              class="absolute -top-10 right-0 text-[#ECEBC7] opacity-80 hover:opacity-100 transition-opacity close-btn-mobile"
              style="z-index: 60;"
              @click="closePreview"
              aria-label="Close"
            >
              ✕
            </button>

            <!-- image frame -->
            <div class="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                v-if="previewUrl"
                :key="previewUrl"
                :src="previewUrl"
                :alt="previewAlt"
                class="w-full h-[72vh] object-contain bg-black/30 modal-fade"
              />

              <!-- arrows -->
              <button
                v-if="hasImages"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-[#ECEBC7] text-4xl opacity-70 hover:opacity-100 transition-opacity"
                @click.stop="previewPrev"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                v-if="hasImages"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#ECEBC7] text-4xl opacity-70 hover:opacity-100 transition-opacity"
                @click.stop="previewNext"
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            <!-- caption (optional) -->
            <div class="mt-4 text-center text-xs tracking-wider text-[#ECEBC7]/70">
              <span v-if="previewCaption">{{ previewCaption }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- loading / error state -->
    <div v-else class="text-center py-20 tracking-wider">
      <p v-if="loadError" class="text-[#ECEBC7]/70">
        {{ loadError }}
      </p>
      <p v-else class="text-[#ECEBC7]/50">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useLocale } from "~/composables/useLocale";
import { useTheme } from "~/composables/useTheme";
import { useAsyncData } from '#app';
const { setTheme } = useTheme();

const { locale } = useLocale();
const route = useRoute();
const project = ref<any>(null);
const currentImageIndex = ref(0);
const loadError = ref<string>("");

const previewOpen = ref(false);
const previewIndex = ref(0);
let heroTimer: ReturnType<typeof setInterval> | null = null;

const heroParallaxY = ref(0);
const touchStartX = ref<number | null>(null);
const touchEndX = ref<number | null>(null);

const sortedImages = computed(() => {
  if (!project.value || !Array.isArray(project.value.images)) return [];
  const imgs = [...project.value.images];
  imgs.sort((a, b) => Number(b.isCover === true) - Number(a.isCover === true));
  return imgs;
});

const hasImages = computed(() => sortedImages.value.length > 0);

const previewUrl = computed(() => {
  if (!project.value) return "";
  if (!hasImages.value) return project.value.coverImageUrl || "";
  return sortedImages.value?.[previewIndex.value]?.url || "";
});

const previewAlt = computed(() => {
  if (!project.value) return "";
  if (!hasImages.value) return project.value.title?.[locale] || "";
  const img = sortedImages.value?.[previewIndex.value];
  return img?.alt?.[locale] || project.value.title?.[locale] || "";
});

const previewCaption = computed(() => {
  if (!project.value || !hasImages.value) return "";
  const img = sortedImages.value?.[previewIndex.value];
  return img?.alt?.[locale] || "";
});

// Theme title colors (per client direction)
const TITLE_COLOR_LANDSCAPE = "#8EB29E"; // DSA eucalyptus
const TITLE_COLOR_LIGHTING = "#ECEBC7";  // Yellow (update if you have a specific hex)
const TITLE_COLOR_ART = "#9a96cc";       // New purple

const TITLE_COLOR = computed(() => {
  switch (project.value?.destination) {
    case "lighting":
      return TITLE_COLOR_LIGHTING;
    case "youngArt":
      return TITLE_COLOR_ART;
    case "landscape":
    default:
      return TITLE_COLOR_LANDSCAPE;
  }
});

const META_LABEL_COLOR = computed(() => {
  switch (project.value?.destination) {
    case "lighting":
      return TITLE_COLOR_LIGHTING;
    case "youngArt":
      return TITLE_COLOR_ART;
    case "landscape":
    default:
      return TITLE_COLOR_LANDSCAPE;
  }
});

const META_VALUE_COLOR = computed(() => {
  switch (project.value?.destination) {
    case "lighting":
      return TITLE_COLOR_LIGHTING;
    case "youngArt":
      return TITLE_COLOR_ART;
    case "landscape":
    default:
      return TITLE_COLOR_LANDSCAPE;
  }
});

/* =======================================
   CONFIG — VISUAL VARIABLES
   ======================================= */

// Page
const PAGE_BG_COLOR = "#000C05";
const TEXT_COLOR = "#ECEBC7";
const TITLE_TRACKING = "0.05em";

// Hero
const HERO_HEIGHT_REM = computed(() => (isMobile.value ? 22 : 36)); // hero image height
const HERO_TOP_OFFSET_REM = computed(() => (isMobile.value ? 2.5 : 4.5)); // gap below navbar
const HERO_NAVBAR_FADE = "rgba(0,0,0,0.45)";

// Content layout
const CONTENT_TOP_MARGIN_REM = computed(() => (isMobile.value ? 2.5 : 4));
const CONTENT_COL_GAP_REM = computed(() => (isMobile.value ? 2.5 : 6));

// Title / body
const TITLE_FONT_SIZE_REM = computed(() => (isMobile.value ? 1.35 : 1.7));
const TITLE_BOTTOM_MARGIN_REM = computed(() => (isMobile.value ? 1.5 : 2));
const BODY_FONT_SIZE_REM = computed(() => (isMobile.value ? 0.9 : 0.92));
const DESCRIPTION_TEXT_OPACITY = 0.88;
const BODY_COLOR = "#8C8C8C";

// Meta column
const META_TEXT_COLOR = "#8EB29E";
const META_BLOCK_GAP_REM = 1.8;

// Gallery
const GALLERY_TOP_MARGIN_REM = computed(() => (isMobile.value ? 3.5 : 6));
const GALLERY_GAP_REM = 2.4;
const GALLERY_CARD_HEIGHT_REM = 10.5;
const PAGE_BOTTOM_PADDING_REM = 8;

const isMobile = computed(() => {
  if (!import.meta.client) return false;
  return window.matchMedia("(max-width: 720px)").matches;
});

/* =======================================
   HERO IMAGE LOGIC
   ======================================= */

const currentHeroUrl = computed(() => {
  if (!project.value) return "";
  if (hasImages.value) {
    return sortedImages.value[currentImageIndex.value]?.url || project.value.coverImageUrl;
  }
  return project.value.coverImageUrl;
});

const currentHeroAlt = computed(() => {
  if (!project.value) return "";
  if (hasImages.value) {
    const img = sortedImages.value[currentImageIndex.value];
    return img?.alt?.[locale] || project.value.title[locale];
  }
  return project.value.title[locale];
});

function prevImage() {
  if (!hasImages.value) return;
  const imgs = sortedImages.value;
  currentImageIndex.value =
    (currentImageIndex.value - 1 + imgs.length) % imgs.length;
}

function nextImage() {
  if (!hasImages.value) return;
  const imgs = sortedImages.value;
  currentImageIndex.value = (currentImageIndex.value + 1) % imgs.length;
}

function openPreview(idx: number) {
  previewIndex.value = idx;
  previewOpen.value = true;
}

function closePreview() {
  previewOpen.value = false;
}

function previewPrev() {
  if (!hasImages.value) return;
  const imgs = sortedImages.value;
  previewIndex.value = (previewIndex.value - 1 + imgs.length) % imgs.length;
}

function previewNext() {
  if (!hasImages.value) return;
  const imgs = sortedImages.value;
  previewIndex.value = (previewIndex.value + 1) % imgs.length;
}

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.changedTouches[0].clientX;
}

function onTouchEnd(e: TouchEvent) {
  touchEndX.value = e.changedTouches[0].clientX;
  if (touchStartX.value === null || touchEndX.value === null) return;
  const delta = touchEndX.value - touchStartX.value;
  const threshold = 40;
  if (delta > threshold) {
    previewPrev();
  } else if (delta < -threshold) {
    previewNext();
  }
  touchStartX.value = null;
  touchEndX.value = null;
}

function handleKeydown(e: KeyboardEvent) {
  if (!previewOpen.value) return;
  if (e.key === "Escape") closePreview();
  if (e.key === "ArrowLeft") previewPrev();
  if (e.key === "ArrowRight") previewNext();
}

function handleScroll() {
  heroParallaxY.value = Math.min(window.scrollY * 0.25, 120);
}

/* =======================================
   DATA FETCH (SSR-safe)
   ======================================= */

const slugKey = computed(() => `project:${String(route.params.slug || "")}`);

const { data: projectData, error, refresh } = await useAsyncData(
  slugKey,
  () => $fetch(`/api/projects/get?slug=${encodeURIComponent(String(route.params.slug || ""))}`),
  {
    watch: [() => route.params.slug],
  }
);

watch(
  projectData,
  (val) => {
    if (val) {
      project.value = val;
      loadError.value = "";

      const key = project.value.destination;
      if (["landscape", "lighting", "youngArt"].includes(key)) {
        setTheme(key);
      } else {
        setTheme("landscape");
      }
    }
  },
  { immediate: true }
);

watch(
  error,
  (err) => {
    if (!err) return;
    // Nuxt errors can be strings, Error objects, or NuxtError-like objects.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = (err as any)?.statusMessage || (err as any)?.message || "Failed to load project.";
    loadError.value = String(message);
  },
  { immediate: true }
);

/* =======================================
   ON MOUNT - HERO ROTATION & LISTENERS
   ======================================= */

onMounted(() => {
  // Always revalidate on client navigation to ensure latest edits are shown
  refresh();

  // Auto-rotate hero image every 3 seconds
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    if (!hasImages.value) return;
    const imgs = project.value.images;
    currentImageIndex.value = (currentImageIndex.value + 1) % imgs.length;
  }, 5000);

  // Keyboard controls for modal
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  if (heroTimer) {
    clearInterval(heroTimer);
    heroTimer = null;
  }
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("scroll", handleScroll);
});

watch(
  () => project.value?.images?.length,
  () => {
    currentImageIndex.value = 0;
    previewIndex.value = 0;
  }
);
</script>
<style scoped>
/* Page entrance */
.page-enter {
  animation: pageEnter 520ms ease-out both;
}
@keyframes pageEnter {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hero fade when image changes */
@keyframes heroFade {
  from { opacity: 0.35; transform: scale(1.01); }
  to { opacity: 1; transform: scale(1); }
}

/* Thumbnail card micro animation */
.thumb-card {
  transition: transform 420ms ease, box-shadow 240ms ease;
}
.thumb-card:hover {
  transform: translateY(-2px);
}

/* Modal transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 440ms ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.modal-fade {
  animation: modalFade 440ms ease-out;
}
@keyframes modalFade {
  from { opacity: 0.55; transform: scale(0.995); }
  to { opacity: 1; transform: scale(1); }
}

.hero-parallax {
  will-change: transform;
  transition: transform 0.05s linear;
}

/* Hero slide + zoom */
.hero-img-wrap {
  animation: heroZoom 18s ease-in-out infinite alternate;
  overflow: hidden;
}
.hero-img {
  will-change: transform, opacity;
}
@keyframes heroZoom {
  from { transform: scale(1.02); }
  to { transform: scale(1.06); }
}

.hero-swap-enter-active,
.hero-swap-leave-active {
  transition: opacity 320ms ease, transform 320ms ease;
}
.hero-swap-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.hero-swap-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

@media (max-width: 720px) {
  .close-btn-mobile {
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(0,0,0,0.45);
    border-radius: 999px;
    width: 44px;
    height: 44px;
    padding: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 60;
  }
}
</style>

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
        <img
          :key="currentHeroUrl"
          :src="currentHeroUrl"
          :alt="currentHeroAlt"
          class="absolute inset-0 w-full h-full object-cover object-center hero-fade hero-parallax"
          :style="{ transform: `translateY(${heroParallaxY}px)` }"
        />

      </div>

      <!-- =============================== -->
      <!-- 2. TITLE + DESCRIPTION + META   -->
      <!-- =============================== -->
      <section
        class="max-w-5xl mx-auto px-6 page-enter"
        :style="{ marginTop: CONTENT_TOP_MARGIN_REM + 'rem' }"
      >
        <div
          class="grid grid-cols-1 md:grid-cols-2"
          :style="{ gap: CONTENT_COL_GAP_REM + 'rem' }"
        >
          <!-- LEFT: title + description -->
          <div>
            <h1
              class="font-semibold"
              :style="{
                fontSize: TITLE_FONT_SIZE_REM + 'rem',
                letterSpacing: TITLE_TRACKING,
                marginBottom: TITLE_BOTTOM_MARGIN_REM + 'rem'
              }"
            >
              {{ project.title[locale] }}
            </h1>

            <p
              class="leading-relaxed"
              :style="{
                opacity: DESCRIPTION_TEXT_OPACITY,
                textAlign: 'justify',
                textJustify: 'inter-word',
                fontSize: BODY_FONT_SIZE_REM + 'rem'
              }"
            >
              {{ project.description[locale] }}
            </p>
          </div>

          <!-- RIGHT: meta info -->
          <!-- RIGHT: meta info -->
                        <div
                        class="text-xs md:text-[0.78rem] leading-relaxed space-y-3"
                        :style="{ color: META_TEXT_COLOR }"
                        >
                        <p v-if="project.location">
                            <span class="font-semibold tracking-wider">Project Location:</span>
                            {{ " " + project.location }}
                        </p>

                        <p v-if="project.client">
                            <span class="font-semibold tracking-wider">Client:</span>
                            {{ " " + project.client }}
                        </p>

                        <p v-if="project.status">
                            <span class="font-semibold tracking-wider">Project Status:</span>
                            {{ " " + project.status }}
                        </p>

                        <p v-if="project.service">
                            <span class="font-semibold tracking-wider">Service:</span>
                            {{ " " + project.service }}
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
          >
            <!-- close -->
            <button
              class="absolute -top-10 right-0 text-[#ECEBC7] opacity-80 hover:opacity-100 transition-opacity"
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

    <!-- loading state -->
    <div v-else class="text-center py-20 text-[#ECEBC7]/50 tracking-wider">
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useLocale } from "~/composables/useLocale";
import { useTheme } from "~/composables/useTheme";
const { setTheme } = useTheme();

const { locale } = useLocale();
const route = useRoute();
const project = ref<any>(null);
const currentImageIndex = ref(0);

const previewOpen = ref(false);
const previewIndex = ref(0);
let heroTimer: ReturnType<typeof setInterval> | null = null;

const heroParallaxY = ref(0);

const previewUrl = computed(() => {
  if (!project.value) return "";
  if (!hasImages.value) return project.value.coverImageUrl || "";
  return project.value.images?.[previewIndex.value]?.url || "";
});

const previewAlt = computed(() => {
  if (!project.value) return "";
  if (!hasImages.value) return project.value.title?.[locale] || "";
  const img = project.value.images?.[previewIndex.value];
  return img?.alt?.[locale] || project.value.title?.[locale] || "";
});

const previewCaption = computed(() => {
  if (!project.value || !hasImages.value) return "";
  const img = project.value.images?.[previewIndex.value];
  return img?.alt?.[locale] || "";
});

/* =======================================
   CONFIG — VISUAL VARIABLES
   ======================================= */

// Page
const PAGE_BG_COLOR = "#000C05";
const TEXT_COLOR = "#ECEBC7";
const TITLE_TRACKING = "0.18em";

// Hero
const HERO_HEIGHT_REM = 36;          // hero image height
const HERO_TOP_OFFSET_REM = 3.5;     // gap below navbar
const HERO_NAVBAR_FADE = "rgba(0,0,0,0.45)";

// Content layout
const CONTENT_TOP_MARGIN_REM = 4;
const CONTENT_COL_GAP_REM = 6;

// Title / body
const TITLE_FONT_SIZE_REM = 1.7;
const TITLE_BOTTOM_MARGIN_REM = 2;
const BODY_FONT_SIZE_REM = 0.92;
const DESCRIPTION_TEXT_OPACITY = 0.88;

// Meta column
const META_TEXT_COLOR = "#ECEBC7";
const META_BLOCK_GAP_REM = 1.8;

// Gallery
const GALLERY_TOP_MARGIN_REM = 6;
const GALLERY_GAP_REM = 2.4;
const GALLERY_CARD_HEIGHT_REM = 10.5;
const PAGE_BOTTOM_PADDING_REM = 8;

/* =======================================
   HERO IMAGE LOGIC
   ======================================= */

const hasImages = computed(
  () => project.value && Array.isArray(project.value.images) && project.value.images.length > 0
);

const currentHeroUrl = computed(() => {
  if (!project.value) return "";
  if (hasImages.value) {
    return project.value.images[currentImageIndex.value]?.url || project.value.coverImageUrl;
  }
  return project.value.coverImageUrl;
});

const currentHeroAlt = computed(() => {
  if (!project.value) return "";
  if (hasImages.value) {
    const img = project.value.images[currentImageIndex.value];
    return img?.alt?.[locale] || project.value.title[locale];
  }
  return project.value.title[locale];
});

function prevImage() {
  if (!hasImages.value) return;
  const imgs = project.value.images;
  currentImageIndex.value =
    (currentImageIndex.value - 1 + imgs.length) % imgs.length;
}

function nextImage() {
  if (!hasImages.value) return;
  const imgs = project.value.images;
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
  const imgs = project.value.images;
  previewIndex.value = (previewIndex.value - 1 + imgs.length) % imgs.length;
}

function previewNext() {
  if (!hasImages.value) return;
  const imgs = project.value.images;
  previewIndex.value = (previewIndex.value + 1) % imgs.length;
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
   DATA FETCH
   ======================================= */

onMounted(async () => {
  const slug = route.params.slug;
  project.value = await $fetch(`/api/projects/get?slug=${slug}`);
// Assign theme based on stored project.theme
if (project.value) {
  const key = project.value.theme;
  if (["landscape", "lighting", "youngArt"].includes(key)) {
    setTheme(key);
  } else {
    setTheme("landscape");
  }
}
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
.hero-fade {
  animation: heroFade 720ms ease-out;
}
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
</style>
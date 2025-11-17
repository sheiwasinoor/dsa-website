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
        <!-- subtle dark strip so navbar reads on top -->
        <div
          class="absolute top-0 left-0 w-full h-full pointer-events-none"
          :style="{ backgroundColor: HERO_NAVBAR_FADE }"
        ></div>

        <!-- arrows -->
        <button
          v-if="hasImages"
          @click="prevImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white text-3xl opacity-70 hover:opacity-100"
        >
          ‹
        </button>
        <button
          v-if="hasImages"
          @click="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white text-3xl opacity-70 hover:opacity-100"
        >
          ›
        </button>

        <!-- main hero image -->
        <img
          :src="currentHeroUrl"
          :alt="currentHeroAlt"
          class="w-full h-full object-cover object-center"
        />

        <!-- dark overlay for mood -->
        <div
          class="absolute inset-0"
          :style="{ backgroundColor: 'rgba(0,0,0,' + COVER_OVERLAY_OPACITY + ')' }"
        ></div>
      </div>

      <!-- =============================== -->
      <!-- 2. TITLE + DESCRIPTION + META   -->
      <!-- =============================== -->
      <section
        class="max-w-5xl mx-auto px-6"
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
            v-for="img in project.images"
            :key="img.id"
            class="overflow-hidden rounded"
            :style="{ height: GALLERY_CARD_HEIGHT_REM + 'rem' }"
          >
            <img
              :src="img.url"
              :alt="img.alt ? img.alt[locale] : project.title[locale]"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- loading state -->
    <div v-else class="text-center py-20 text-[#ECEBC7]/50 tracking-wider">
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useLocale } from "~/composables/useLocale";

const { locale } = useLocale();
const route = useRoute();
const project = ref<any>(null);
const currentImageIndex = ref(0);

/* =======================================
   CONFIG — VISUAL VARIABLES
   ======================================= */

// Page
const PAGE_BG_COLOR = "#000C05";
const TEXT_COLOR = "#ECEBC7";
const TITLE_TRACKING = "0.18em";

// Hero
const HERO_HEIGHT_REM = 32;          // hero image height
const HERO_TOP_OFFSET_REM = 3.5;     // gap below navbar
const HERO_NAVBAR_FADE = "rgba(0,0,0,0.45)";
const COVER_OVERLAY_OPACITY = 0.25;  // dark overlay strength

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

/* =======================================
   DATA FETCH
   ======================================= */

onMounted(async () => {
  const slug = route.params.slug;
  project.value = await $fetch(`/api/projects/get?slug=${slug}`);
});
</script>
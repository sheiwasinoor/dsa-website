<template>
  <div class="min-h-screen bg-[#000C05] text-[#ECEBC7] pt-28 pb-20 relative overflow-hidden">
    <!-- Mosaic backdrop -->
    <div class="pointer-events-none absolute inset-0 opacity-30 mosaic-mask"></div>

    <!-- ============================= -->
    <!-- MASONRY GRID -->
    <!-- ============================= -->
    <section class="max-w-6xl mx-auto px-6">
      <!-- Masonry grid (left-to-right fill) -->
      <div
        ref="masonryEl"
        class="masonry-grid relative"
        style="--masonry-row-height: 8px; --masonry-gap: 24px;"
      >
        <div class="absolute inset-0 pointer-events-none neon-grid"></div>
        <article
          v-for="(post, idx) in posts"
          :key="post.id"
          class="group cursor-pointer transform transition duration-700 hover:-translate-y-2 hover:scale-[1.04]"
          :data-masonry-id="post.id"
          :class="{
            'is-visible': visibleMap[post.id],
            'is-mobile-hover': hoverMap[post.id]
          }"
          :style="[
            tileStyle(idx),
            masonryStyle(post.id),
            { '--reveal-delay': `${idx * 60}ms` }
          ]"
          @click="toggleInline(post)"
        >
          <div
            class="overflow-hidden rounded-xl shadow-2xl border border-transparent"
            :style="{ backgroundColor: STYLE.tileBg, borderColor: STYLE.tileBorderColor, borderWidth: '0px' }"
            :data-post-id="post.id"
            data-masonry-item
          >
            <div class="relative overflow-hidden">
              <img
                v-if="post.imageUrl"
                :src="post.imageUrl"
                :alt="post.title[locale]"
                class="w-full h-auto object-cover transition duration-700 ease-out group-hover:scale-105 mobile-hover-scale"
                :class="{ 'mobile-hover-scale': hoverMap[post.id] }"
                @load="scheduleMasonry"
              />
              <div
                v-else
                class="w-full h-48 bg-[#1A241F] flex items-center justify-center text-center px-4"
              >
                <div class="space-y-2 text-left">
                  <p class="text-[#ECEBC7] font-black text-xl leading-tight tracking-[0.1em] uppercase line-clamp-2">
                    {{ post.title[locale] || post.body[locale] || (locale === 'en' ? 'YOUNG NEWS' : 'YOUNG 新闻') }}
                  </p>
                  <p class="text-[#ECEBC7]/80 text-sm leading-snug tracking-[0.04em] line-clamp-3">
                    {{ post.body[locale] || post.title[locale] || (locale === 'en' ? 'YOUNG NEWS' : 'YOUNG 新闻') }}
                  </p>
                </div>
              </div>

              <div
                :class="{ 'always-show-overlay': activePost?.id === post.id || hoverMap[post.id] }"
                class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/35 to-transparent p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <p
                  :style="{ fontSize: STYLE.overlayTitleSize, letterSpacing: STYLE.overlayTitleLS }"
                  class="uppercase mb-3 font-bold drop-shadow"
                >
                  {{ post.title[locale] }}
                </p>
                <p
                  class="text-[#ECEBC7]/85 drop-shadow"
                  :class="activePost?.id === post.id ? '' : 'line-clamp-3'"
                  :style="{ fontSize: STYLE.overlayBodySize }"
                >
                  {{ post.body[locale] }}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ============================= -->
    <!-- MODAL: FULL ARTICLE -->
    <!-- ============================= -->
    <transition name="fade">
      <div
        v-if="activePost"
        class="fixed inset-0 z-[9999] flex items-center justify-center px-4 pt-16"
        style="background: rgba(0,0,0,0.75); backdrop-filter: blur(6px);"
        @click.self="activePost = null"
      >
        <div class="bg-[#0B1510] rounded-2xl max-w-3xl w-full shadow-2xl border border-[#2f3d34] overflow-y-auto modal-pop my-8 max-h-[90vh] flex flex-col">
          <div class="relative shrink-0">
            <img
              v-if="activePost.imageUrl"
              :src="activePost.imageUrl"
              :alt="activePost.title[locale]"
              class="w-full h-auto max-h-[70vh] object-contain"
            />
            <button
              class="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/60 text-[#ECEBC7] flex items-center justify-center hover:bg-black/80 transition z-[10000]"
              @click="activePost = null"
              aria-label="Close article"
            >
              ✕
            </button>
          </div>
          <div class="p-6 space-y-3">
            <h3 class="font-bold text-2xl leading-tight">
              {{ activePost.title[locale] }}
            </h3>
            <p class="text-base leading-relaxed text-[#ECEBC7]/90 whitespace-pre-line">
              {{ activePost.body[locale] }}
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { useLocale } from "~/composables/useLocale";

const STYLE = {
  headingSize: '3rem',
  headingLetterSpacing: '0.14em',
  headingMarginBottom: '1.1rem',
  descColor: 'rgba(236,235,199,0.72)',
  overlayTitleSize: '0.9rem',
  overlayTitleLS: '0.12em',
  overlayBodySize: '0.8rem',
  tileBorderColor: '#29352F',
  tileBg: '#050E0A'
};

const { locale } = useLocale();

// Shape of what /api/news/list returns
interface LocalizedText {
  en: string;
  zh: string;
}

interface NewsPost {
  id: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  bodyEn: string;
  bodyZh: string;
  imageUrl?: string | null;
  createdAt: string;
}

// convert flat fields → { title: {en,zh}, body: {en,zh} }
function mapPost(raw: NewsPost) {
  return {
    id: raw.id,
    slug: raw.slug,
    imageUrl: raw.imageUrl ?? undefined,
    createdAt: raw.createdAt,
    title: {
      en: raw.titleEn,
      zh: raw.titleZh,
    } as LocalizedText,
    body: {
      en: raw.bodyEn,
      zh: raw.bodyZh,
    } as LocalizedText,
  };
}

const posts = ref<
  Array<
    ReturnType<typeof mapPost>
  >
>([]);

const activePost = ref<ReturnType<typeof mapPost> | null>(null);

const masonryEl = ref<HTMLElement | null>(null);
const masonrySpans = ref<Record<string, number>>({});
const visibleMap = ref<Record<string, boolean>>({});
const observerRef = ref<IntersectionObserver | null>(null);
const hoverMap = ref<Record<string, boolean>>({});
const hoverObserverRef = ref<IntersectionObserver | null>(null);
const isMobile = ref(false);
let mobileQuery: MediaQueryList | null = null;

// Load posts from API
onMounted(async () => {
  try {
    const raw = await $fetch<NewsPost[]>("/api/news/list");
    posts.value = raw.map(mapPost);
    scheduleMasonry();
    nextTick(() => {
      initObserver();
      setMobileState();
    });
  } catch (err) {
    console.error("Failed to load news posts", err);
  }
  window.addEventListener("resize", scheduleMasonry);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", scheduleMasonry);
  observerRef.value?.disconnect();
  hoverObserverRef.value?.disconnect();
  if (mobileQuery) {
    mobileQuery.removeEventListener("change", setMobileState);
  }
});

function toggleInline(post) {
  activePost.value = activePost.value?.id === post.id ? null : post;
}

// ESC to close
if (import.meta.client) {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      activePost.value = null;
    }
  });
}

function tileStyle(idx: number) {
  return {
    borderColor: "transparent",
    boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
    backgroundImage: STYLE.tileBg,
  };
}

function scheduleMasonry() {
  nextTick(() => {
    requestAnimationFrame(updateMasonry);
  });
}

function updateMasonry() {
  if (!masonryEl.value) return;
  const styles = getComputedStyle(masonryEl.value);
  const rowHeight = parseFloat(styles.getPropertyValue("--masonry-row-height")) || 8;
  const gap = parseFloat(styles.getPropertyValue("--masonry-gap")) || 24;
  const items = masonryEl.value.querySelectorAll<HTMLElement>("[data-masonry-item]");

  items.forEach((item) => {
    const wrapper = item.closest<HTMLElement>("[data-masonry-id]");
    const id = wrapper?.dataset.masonryId;
    if (!id) return;
    const height = item.getBoundingClientRect().height;
    const span = Math.ceil((height + gap) / (rowHeight + gap));
    masonrySpans.value[id] = span;
  });
}

function masonryStyle(id: string) {
  const span = masonrySpans.value[id];
  return span ? { gridRowEnd: `span ${span}` } : undefined;
}

function initObserver() {
  if (!masonryEl.value) return;
  observerRef.value?.disconnect();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = (entry.target as HTMLElement).dataset.masonryId;
        if (id) visibleMap.value[id] = true;
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  masonryEl.value
    .querySelectorAll<HTMLElement>("[data-masonry-id]")
    .forEach((el) => observer.observe(el));

  observerRef.value = observer;
  initHoverObserver();
}

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
  if (!masonryEl.value || !isMobile.value) return;
  hoverObserverRef.value?.disconnect();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.masonryId;
        if (!id) return;
        hoverMap.value[id] = entry.isIntersecting;
      });
    },
    { threshold: 0.6, rootMargin: "0px 0px -15% 0px" }
  );

  masonryEl.value
    .querySelectorAll<HTMLElement>("[data-masonry-id]")
    .forEach((el) => observer.observe(el));

  hoverObserverRef.value = observer;
}
</script>

<style scoped>
.always-show-overlay { opacity: 1 !important; }
.always-show-overlay .line-clamp-3 { display: none; }
.mosaic-mask {
  background-image:
    radial-gradient(circle at 20% 20%, rgba(236,235,199,0.08), transparent 22%),
    radial-gradient(circle at 80% 10%, rgba(142,178,158,0.12), transparent 28%),
    radial-gradient(circle at 60% 70%, rgba(64,50,126,0.1), transparent 30%);
  mix-blend-mode: screen;
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-auto-flow: row dense;
  grid-auto-rows: var(--masonry-row-height);
  gap: var(--masonry-gap);
}

.masonry-grid > article {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

.masonry-grid > article.is-visible {
  animation: newsFadeUp 1000ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
  animation-delay: var(--reveal-delay, 0ms);
}

@keyframes newsFadeUp {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.neon-grid {
  background-image: linear-gradient(rgba(142,178,158,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(142,178,158,0.08) 1px, transparent 1px);
  background-size: 44px 44px, 44px 44px;
  filter: drop-shadow(0 0 6px rgba(142,178,158,0.25));
  opacity: 0.35;
}

.tile-sheen {
  position: relative;
  overflow: hidden;
}

.tile-sheen::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(130deg, rgba(255,255,255,0.06), transparent 35%);
  opacity: 0;
  transition: opacity 600ms ease, transform 600ms ease;
  transform: translateX(-10%);
}

.group:hover .tile-sheen::after {
  opacity: 1;
  transform: translateX(5%);
}

@media (max-width: 900px) {
  .masonry-grid > article.is-mobile-hover .mobile-hover-scale {
    transform: scale(1.05);
  }
}

.modal-pop {
  animation: popIn 320ms ease-out;
}

@keyframes popIn {
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 250ms ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="min-h-screen bg-[#000C05] text-[#ECEBC7] pt-28 pb-20">
    <!-- ============================= -->
    <!-- PAGE HEADER -->
    <!-- ============================= -->
    <section class="max-w-6xl mx-auto px-6 mb-10">
      <h1
        class="uppercase font-semibold"
        :style="{
          fontSize: STYLE.headingSize,
          letterSpacing: STYLE.headingLetterSpacing,
          marginBottom: STYLE.headingMarginBottom
        }"
      >
        {{ locale === 'en' ? 'YOUNG NEWS' : 'YOUNG 新闻' }}
      </h1>

      <p
        class="max-w-2xl text-sm leading-relaxed"
        :style="{ color: STYLE.descColor }"
      >
        {{
          locale === 'en'
            ? 'Short updates about public art, landscape, and lighting projects — all in one place.'
            : '关于公共艺术、景观与灯光项目的日常更新。'
        }}
      </p>
    </section>

    <!-- ============================= -->
    <!-- MASONRY GRID -->
    <!-- ============================= -->
    <section class="max-w-6xl mx-auto px-6">
      <!-- Pinterest-style masonry using CSS grid -->
      <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <article
          v-for="post in posts"
          :key="post.id"
          class="group break-inside-avoid cursor-pointer"
          @click="toggleInline(post)"
        >
          <div
            class="overflow-hidden rounded-md"
            :style="{ backgroundColor: STYLE.tileBg, borderColor: STYLE.tileBorderColor, borderWidth: '1px' }"
            :data-post-id="post.id"
          >
            <div class="relative">
              <img
                v-if="post.imageUrl"
                :src="post.imageUrl"
                :alt="post.title[locale]"
                class="w-full h-auto object-cover"
              />
              <div
                v-else
                class="w-full h-48 bg-[#1A241F] flex items-center justify-center text-xs tracking-[0.18em] uppercase"
              >
                {{ locale === 'en' ? 'YOUNG NEWS' : 'YOUNG 新闻' }}
              </div>

              <div
                :class="{ 'always-show-overlay': activePost?.id === post.id }"
                class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <p
                  :style="{ fontSize: STYLE.overlayTitleSize, letterSpacing: STYLE.overlayTitleLS }"
                  class="uppercase mb-1"
                >
                  {{ post.title[locale] }}
                </p>
                <p
                  class="text-[#ECEBC7]/80"
                  :class="activePost?.id === post.id ? '' : 'line-clamp-2'"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import { useLocale } from "~/composables/useLocale";

const STYLE = {
  headingSize: '2.1rem',
  headingLetterSpacing: '0.22em',
  headingMarginBottom: '0.75rem',
  descColor: 'rgba(236,235,199,0.72)',
  overlayTitleSize: '0.8rem',
  overlayTitleLS: '0.18em',
  overlayBodySize: '0.7rem',
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

const tileHeights = ref({});

// Load posts from API
onMounted(async () => {
  try {
    const raw = await $fetch<NewsPost[]>("/api/news/list");
    posts.value = raw.map(mapPost);
    nextTick(() => {
      document.querySelectorAll('[data-post-id]').forEach(el => {
        tileHeights.value[el.dataset.postId] = el.offsetHeight;
      });
    });
  } catch (err) {
    console.error("Failed to load news posts", err);
  }
});

function toggleInline(post) {
  activePost.value = activePost.value?.id === post.id ? null : post;
}

// Format date nicely
const formattedDate = computed(() => {
  if (!activePost.value?.createdAt) return "";
  const d = new Date(activePost.value.createdAt);
  return d.toLocaleDateString(locale.value === "en" ? "en-US" : "zh-CN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
});

// ESC to close
if (import.meta.client) {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      activePost.value = null;
    }
  });
}
</script>

<style scoped>
.always-show-overlay { opacity: 1 !important; }
.always-show-overlay .line-clamp-2 { display: none; }
</style>
<!-- pages/about.vue -->
<template>
  <div class="bg-[#000C05] text-[#ECEBC7] min-h-screen">
    <!-- =================================================== -->
    <!-- 1. HERO (TRANSPARENT PNG, FULL-HEIGHT SECTION)      -->
    <!-- =================================================== -->
    <section
      class="w-full flex items-center justify-center relative"
      :style="{
        minHeight: ABOUT_HERO_SECTION_MIN_HEIGHT + 'px',
        paddingTop: ABOUT_HERO_SECTION_PADDING_TOP + 'px',
        paddingBottom: ABOUT_HERO_SECTION_PADDING_BOTTOM + 'px'
      }"
    >
      <img
        src="/images/about-hero.png"
        alt="About Hero"
        class="object-contain"
        :style="{
          width: ABOUT_HERO_IMAGE_WIDTH + 'px',
          maxWidth: ABOUT_HERO_IMAGE_MAX_WIDTH + 'px',
          maxHeight: ABOUT_HERO_IMAGE_HEIGHT + 'px',
          opacity: ABOUT_HERO_IMAGE_OPACITY
        }"
      />
    </section>

    <!-- =================================================== -->
    <!-- 2. LETTER SECTION                                   -->
    <!-- =================================================== -->
    <section
      class="w-full bg-cover bg-center relative"
      :style="{
        backgroundImage: `url('/images/about-letter-bg.png')`,
        paddingLeft: ABOUT_LETTER_PADDING_X + 'px',
        paddingRight: ABOUT_LETTER_PADDING_X + 'px',
        paddingTop: ABOUT_LETTER_PADDING_Y + 'px',
        paddingBottom: ABOUT_LETTER_PADDING_Y + 'px'
      }"
    >
      <div
        class="mx-auto transition-opacity duration-500"
        :style="{ maxWidth: ABOUT_LETTER_MAX_WIDTH + 'px' }"
      >
      <!-- LETTER TITLE -->
<h2
  class="tracking-[0.02em]"
  :style="{
    fontSize: ABOUT_LETTER_TITLE_SIZE + 'rem',
    fontWeight: ABOUT_LETTER_TITLE_WEIGHT,
    opacity: ABOUT_LETTER_TITLE_OPACITY,
    marginBottom: ABOUT_LETTER_TITLE_MARGIN_BOTTOM + 'px'
  }"
>
  {{ locale === 'en' ? ABOUT_LETTER_TITLE_EN : ABOUT_LETTER_TITLE_ZH }}
</h2>
        <div
          class="w-full letter-columns-wrapper"
          :style="{ minHeight: ABOUT_LETTER_MIN_HEIGHT + 'px' }"
        >
          <div
  class="columns-2 text-[#ECEBC7]/85 text-justify"
  :style="{
    columnGap: ABOUT_LETTER_COLUMN_GAP + 'rem',
    fontSize: ABOUT_LETTER_FONT_SIZE + 'rem',
    lineHeight: ABOUT_LETTER_LINE_HEIGHT,
    textAlign: 'justify',
    textJustify: 'inter-word'
  }"
>
  <p
    v-for="(p, i) in letterText[locale]"
    :key="'letter-' + i"
    class="break-inside-avoid-column"
    :style="{ marginBottom: ABOUT_LETTER_PARAGRAPH_GAP + 'px' }"
  >
    {{ p }}
  </p>
</div>
        </div>

        <!-- Signature -->
        <div
          class="flex justify-end signature-block"
          :style="{
            marginTop: ABOUT_SIGNATURE_TOP_MARGIN + 'px',
            marginBottom: ABOUT_SIGNATURE_BOTTOM_MARGIN + 'px'
          }"
        >
          <img
            src="/images/signature.png"
            alt="Signature"
            :style="{
              height: ABOUT_SIGNATURE_HEIGHT + 'px',
              width: 'auto',
              opacity: ABOUT_SIGNATURE_OPACITY
            }"
          />
        </div>

        <p
          class="text-right text-[#ECEBC7]/90"
          :style="{
            fontSize: ABOUT_SIGNATURE_TEXT_SIZE + 'rem',
            lineHeight: ABOUT_SIGNATURE_LINE_HEIGHT,
            marginBottom: ABOUT_SIGNATURE_TEXT_BOTTOM_MARGIN + 'px'
          }"
        >
          {{ ABOUT_FOOTER_TEXT[locale].regards }}<br />
          <span class="font-semibold tracking-wide">
            {{ ABOUT_FOOTER_TEXT[locale].name }}
          </span><br />
          {{ ABOUT_FOOTER_TEXT[locale].location }}
        </p>
      </div>
    </section>

    <!-- =================================================== -->
    <!-- 3. MAIN CONTENT                                     -->
    <!-- =================================================== -->
    <main
      class="mx-auto"
      :style="{
        maxWidth: ABOUT_MAIN_MAX_WIDTH + 'px',
        paddingTop: ABOUT_MAIN_PADDING_TOP + 'px',
        paddingBottom: ABOUT_MAIN_PADDING_BOTTOM + 'px',
        paddingLeft: ABOUT_MAIN_PADDING_X_REM + 'rem',
        paddingRight: ABOUT_MAIN_PADDING_X_REM + 'rem'
      }"
    >
      <div
        class="grid grid-cols-1 lg:grid-cols-2"
        :style="{ gap: ABOUT_MAIN_GRID_GAP + 'px' }"
      >
        <!-- =============================== -->
        <!-- LEFT COLUMN                     -->
        <!-- =============================== -->
        <div
          class="flex flex-col"
          :style="{ rowGap: ABOUT_LEFT_COLUMN_SECTION_SPACING + 'px' }"
        >
          <!-- INTRO SECTION -->
          <div>
            <p
              class="tracking-[0.22em] text-[#ECEBC7]/70"
              :style="{
                fontSize: ABOUT_INTRO_HEADING_SIZE + 'rem',
                marginBottom: ABOUT_INTRO_HEADING_SPACING + 'px'
              }"
            >
              简介 | INTRODUCTION
            </p>

            <div
              class="text-[#ECEBC7]/80 flex flex-col text-justify"
              :style="{
                fontSize: ABOUT_INTRO_TEXT_SIZE + 'rem',
                lineHeight: ABOUT_INTRO_LINE_HEIGHT,
                rowGap: ABOUT_INTRO_PARAGRAPH_GAP + 'px',
                textAlign: 'justify',
                textJustify: 'inter-word'
              }"
            >
              <p
                v-for="(p, i) in introText[locale]"
                :key="'intro-' + i"
              >
                {{ p }}
              </p>
            </div>
          </div>

          <!-- BIO CARD -->
          <div
            class="bg-[#111C14] rounded-2xl shadow-lg border border-[#ECEBC7]/10 overflow-hidden bio-card-transition"
            :class="bioCardClass"
            :style="{
              maxWidth: ABOUT_BIO_MAX_WIDTH + 'px',
              padding: ABOUT_BIO_PADDING + 'px'
            }"
          >
            <h2
              class="font-semibold tracking-[0.16em]"
              :style="{
                fontSize: ABOUT_BIO_TITLE_SIZE + 'rem',
                marginBottom: ABOUT_BIO_TITLE_SPACING + 'px'
              }"
            >
              <span v-if="active.group === 'chinese'">
                {{ active.nameEn }} | {{ active.nameCn }}
              </span>
              <span v-else>
                {{ active.nameEn }}
              </span>
            </h2>

            <p
              class="text-[#ECEBC7]/80"
              :style="{
                fontSize: ABOUT_BIO_ROLE_SIZE + 'rem',
                marginBottom: ABOUT_BIO_ROLE_SPACING + 'px'
              }"
            >
              {{ active.role[locale] }}
            </p>

            <div
              class="text-[#ECEBC7]/80 transition-opacity duration-700 flex flex-col"
              :class="bioTextVisible ? 'opacity-100' : 'opacity-0'"
              :style="{
                fontSize: ABOUT_BIO_TEXT_SIZE + 'rem',
                lineHeight: ABOUT_BIO_LINE_HEIGHT,
                rowGap: ABOUT_BIO_PARAGRAPH_GAP + 'px'
              }"
            >
              <p
                v-for="(p, i) in active.bio[locale]"
                :key="'bio-' + i"
              >
                {{ p }}
              </p>
            </div>
          </div>
        </div>

        <!-- =============================== -->
        <!-- RIGHT COLUMN: TEAM GRID         -->
        <!-- =============================== -->
        <div
          class="flex flex-col"
          :style="{
            rowGap: ABOUT_TEAM_SECTION_SPACING + 'px',
            marginTop: ABOUT_TEAM_TOP_OFFSET + 'px'
          }"
        >
          <!-- Chinese Creativity -->
          <div class="flex justify-center text-center">
            <p
              class="tracking-[0.28em] text-[#ECEBC7]/80"
              :style="{ fontSize: ABOUT_TEAM_LABEL_EN_SIZE + 'rem' }"
            >
              中国创意&nbsp;&nbsp;CHINESE CREATIVITY
            </p>
          </div>

          <!-- TEAM GRID - CHINESE -->
          <div
            class="grid grid-cols-2 md:grid-cols-3"
            :style="{ gap: ABOUT_TEAM_GRID_GAP + 'px' }"
          >
            <button
              v-for="m in chineseMembers"
              :key="m.id"
              class="flex flex-col items-center text-center group focus:outline-none"
              @click="selectMember(m.id)"
            >
              <div
                class="rounded-full overflow-hidden border border-transparent transition-all ease-out"
                :class="avatarClass(m.id)"
                :style="{
                  width: ABOUT_AVATAR_SIZE + 'px',
                  height: ABOUT_AVATAR_SIZE + 'px'
                }"
              >
                <img
                  :src="m.avatar"
                  :alt="m.nameEn"
                  class="w-full h-full object-cover"
                />
              </div>

              <p
                class="tracking-[0.16em]"
                :class="{
                  'text-[#ECEBC7] font-semibold': activeId === m.id,
                  'text-[#ECEBC7]/70': activeId !== m.id
                }"
                :style="{
                  fontSize: ABOUT_AVATAR_NAME_SIZE + 'rem',
                  marginTop: ABOUT_AVATAR_NAME_TOP_MARGIN + 'px'
                }"
              >
                {{ m.nameEn }} | {{ m.nameCn }}
              </p>

              <p
                class="text-[#ECEBC7]/60"
                :style="{ fontSize: ABOUT_AVATAR_ROLE_SIZE + 'rem' }"
              >
                {{ m.role[locale] }}
              </p>
            </button>
          </div>

          <!-- International Perspective -->
          <div
            class="flex justify-center text-center"
            :style="{ paddingTop: ABOUT_TEAM_SECOND_LABEL_TOP_PADDING + 'px' }"
          >
            <p
              class="tracking-[0.28em] text-[#ECEBC7]/80"
              :style="{ fontSize: ABOUT_TEAM_LABEL_EN_SIZE + 'rem' }"
            >
              国际视野&nbsp;&nbsp;INTERNATIONAL PERSPECTIVE
            </p>
          </div>

          <!-- TEAM GRID - INTERNATIONAL -->
          <div
            class="grid grid-cols-2"
            :style="{ gap: ABOUT_TEAM_GRID_GAP + 'px' }"
          >
            <button
              v-for="m in internationalMembers"
              :key="m.id"
              class="flex flex-col items-center text-center group focus:outline-none"
              @click="selectMember(m.id)"
            >
              <div
                class="rounded-full overflow-hidden border border-transparent transition-all duration-500 ease-out"
                :class="avatarClass(m.id)"
                :style="{
                  width: ABOUT_AVATAR_SIZE + 'px',
                  height: ABOUT_AVATAR_SIZE + 'px'
                }"
              >
                <img
                  :src="m.avatar"
                  :alt="m.nameEn"
                  class="w-full h-full object-cover"
                />
              </div>

              <p
                class="tracking-[0.16em]"
                :class="{
                  'text-[#ECEBC7] font-semibold': activeId === m.id,
                  'text-[#ECEBC7]/70': activeId !== m.id
                }"
                :style="{
                  fontSize: ABOUT_AVATAR_NAME_SIZE + 'rem',
                  marginTop: ABOUT_AVATAR_NAME_TOP_MARGIN + 'px'
                }"
              >
                {{ m.nameEn }}
              </p>

              <p
                class="text-[#ECEBC7]/60"
                :style="{ fontSize: ABOUT_AVATAR_ROLE_SIZE + 'rem' }"
              >
                {{ m.role[locale] }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
/* =============================================================
   ABOUT CONFIG — ALL NUMERIC VALUES LIVE HERE
   ============================================================= */

/* ---------- HERO ---------- */
const ABOUT_HERO_SECTION_MIN_HEIGHT = 950; // px: overall hero "length"
const ABOUT_HERO_SECTION_PADDING_TOP = 80;  // px: space above PNG
const ABOUT_HERO_SECTION_PADDING_BOTTOM = 20; // px: space below PNG

const ABOUT_HERO_IMAGE_WIDTH = 1150;        // px: visual width of PNG
const ABOUT_HERO_IMAGE_MAX_WIDTH = 1500;   // px: hard cap
const ABOUT_HERO_IMAGE_HEIGHT = 1000;       // px: max height constraint
const ABOUT_HERO_IMAGE_OPACITY = 1.0;      // 0–1

// ===== LETTER TITLE =====
const ABOUT_LETTER_TITLE_EN = "To My Friends and Partners,";
const ABOUT_LETTER_TITLE_ZH = "致我的朋友伙伴，";

const ABOUT_LETTER_TITLE_SIZE = 1.2;       // rem
const ABOUT_LETTER_TITLE_WEIGHT = 600;     // font-weight
const ABOUT_LETTER_TITLE_OPACITY = 0.92;
const ABOUT_LETTER_TITLE_MARGIN_BOTTOM = 32; // px

/* ---------- LETTER SECTION ---------- */
const ABOUT_LETTER_PADDING_Y = 96;
const ABOUT_LETTER_PADDING_X = 24;
const ABOUT_LETTER_MIN_HEIGHT = 800;
const ABOUT_LETTER_MAX_WIDTH = 1000;
const ABOUT_LETTER_COLUMN_GAP = 4;
const ABOUT_LETTER_FONT_SIZE = 1.0;
const ABOUT_LETTER_LINE_HEIGHT = 1.6;
const ABOUT_LETTER_PARAGRAPH_GAP = 16;

/* ---------- LETTER FOOTER ---------- */
const ABOUT_FOOTER_TEXT = {
  en: {
    regards: "Regards,",
    name: "Demi Young",
    location: "Shenzhen, 2025",
  },
  zh: {
    regards: "致敬，",
    name: "Demi Young",
    location: "深圳，2025",
  },
} as const;

/* ---------- SIGNATURE ---------- */
const ABOUT_SIGNATURE_HEIGHT = 56;
const ABOUT_SIGNATURE_OPACITY = 0.9;
const ABOUT_SIGNATURE_TOP_MARGIN = -200;
const ABOUT_SIGNATURE_BOTTOM_MARGIN = 8;
const ABOUT_SIGNATURE_TEXT_SIZE = 0.9;
const ABOUT_SIGNATURE_LINE_HEIGHT = 1.5;
const ABOUT_SIGNATURE_TEXT_BOTTOM_MARGIN = 100;

/* ---------- MAIN CONTENT ---------- */
const ABOUT_MAIN_MAX_WIDTH = 1200;
const ABOUT_MAIN_PADDING_TOP = 96;
const ABOUT_MAIN_PADDING_BOTTOM = 128;
const ABOUT_MAIN_PADDING_X_REM = 1.5; // left/right padding in rem
const ABOUT_MAIN_GRID_GAP = 80;

/* ---------- LEFT COLUMN ---------- */
const ABOUT_LEFT_COLUMN_SECTION_SPACING = 80;

/* ---------- INTRO ---------- */
const ABOUT_INTRO_HEADING_SIZE = 1.05;
const ABOUT_INTRO_HEADING_SPACING = 24;
const ABOUT_INTRO_TEXT_SIZE = 0.8;
const ABOUT_INTRO_LINE_HEIGHT = 1.6;
const ABOUT_INTRO_PARAGRAPH_GAP = 16;

/* ---------- BIO CARD ---------- */
const ABOUT_BIO_MAX_WIDTH = 530;
const ABOUT_BIO_PADDING = 32;
const ABOUT_BIO_TITLE_SIZE = 1.1;
const ABOUT_BIO_TITLE_SPACING = 8;
const ABOUT_BIO_ROLE_SIZE = 0.9;
const ABOUT_BIO_ROLE_SPACING = 16;
const ABOUT_BIO_TEXT_SIZE = 0.8;
const ABOUT_BIO_LINE_HEIGHT = 1.3;
const ABOUT_BIO_PARAGRAPH_GAP = 10;

/* ---------- TEAM ---------- */
const ABOUT_TEAM_SECTION_SPACING = 40;
const ABOUT_TEAM_TOP_OFFSET = 100;
const ABOUT_TEAM_LABEL_EN_SIZE = 0.9;
const ABOUT_TEAM_GRID_GAP = 10;
const ABOUT_TEAM_SECOND_LABEL_TOP_PADDING = 20;

/* ---------- AVATARS ---------- */
const ABOUT_AVATAR_SIZE = 90;
const ABOUT_AVATAR_NAME_SIZE = 0.75;
const ABOUT_AVATAR_NAME_TOP_MARGIN = 12;
const ABOUT_AVATAR_ROLE_SIZE = 0.68;

/* =============================================================
   LOGIC (UNCHANGED)
   ============================================================= */
import { ref, computed, nextTick } from "vue";
import { useLocale } from "~/composables/useLocale";
import {
  letterText,
  introText,
  members as membersData,
} from "~/content/about";

definePageMeta({ layout: "default" });

const { locale } = useLocale();

/* TEAM + BIOS */
const members = ref(membersData);
const activeId = ref("demi");

const active = computed(() =>
  members.value.find((m) => m.id === activeId.value)!
);

const chineseMembers = computed(() =>
  members.value.filter((m) => m.group === "chinese")
);

const internationalMembers = computed(() =>
  members.value.filter((m) => m.group === "international")
);

/* BIO CARD ANIMATION */
const bioTextVisible = ref(true);
const bioCardClass = ref("scale-100 opacity-100");

async function selectMember(id: string) {
  if (id === activeId.value) return;

  bioTextVisible.value = false;

  bioCardClass.value =
    "scale-95 opacity-80 origin-top-left transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]";

  await new Promise((r) => setTimeout(r, 350));

  activeId.value = id;
  await nextTick();

  bioCardClass.value =
    "scale-100 opacity-100 origin-top-left transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]";

  setTimeout(() => {
    bioTextVisible.value = true;
  }, 50);
}

function avatarClass(id: string) {
  return id === activeId.value
    ? [
        "scale-[1.04]",
        "shadow-[0_0_12px_rgba(236,235,199,0.35)]",
        "transition-all",
        "duration-500",
        "ease-out",
        "ring-2",
        "ring-[#ECEBC7]",
        "ring-offset-4",
        "ring-offset-[#000C05]",
      ].join(" ")
    : "transition-all duration-500 ease-out";
}
</script>

<style scoped>
.letter-columns-wrapper {
  break-inside: avoid;
  column-fill: balance;
}
.break-inside-avoid-column {
  break-inside: avoid-column;
}
.bio-card-transition {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition-duration: 500ms;
}
.signature-block {
  break-inside: avoid;
}
@supports (-webkit-touch-callout: none) {
  .columns-2 {
    column-gap: 3rem;
  }
}
</style>
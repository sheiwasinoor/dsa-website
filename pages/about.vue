<!-- pages/about.vue -->
<template>
  <div class="bg-[#000C05] text-[#ECEBC7] min-h-screen">
    <!-- =================================================== -->
    <!-- 1. HERO (TRANSPARENT PNG, FULL-HEIGHT SECTION)      -->
    <!-- =================================================== -->
    <section
      ref="heroSection"
      :class="[
        'bg-[#000A04] w-full flex items-center justify-center relative',
        'reveal-block',
        { 'reveal-visible': reveals.hero }
      ]"
      :style="{
        minHeight: ABOUT_HERO_SECTION_MIN_HEIGHT + 'px',
        paddingTop: ABOUT_HERO_SECTION_PADDING_TOP + 'px',
        paddingBottom: ABOUT_HERO_SECTION_PADDING_BOTTOM + 'px'
      }"
    >
      <div
        class="mx-auto grid grid-cols-1 md:grid-cols-2 items-center"
        :style="{
          maxWidth: ABOUT_HERO_MAX_WIDTH + 'px',
          columnGap: ABOUT_HERO_COLUMN_GAP + 'px',
          paddingLeft: ABOUT_HERO_CONTAINER_PADDING_LEFT + 'px',
          paddingRight: ABOUT_HERO_CONTAINER_PADDING_RIGHT + 'px',
        }"
      >
        <!-- LEFT: HERO TEXT IMAGE -->
        <div
          class="flex justify-center md:justify-end hero-text-float"
          :style="{
            paddingRight: ABOUT_HERO_TEXT_PADDING_RIGHT + 'px',
          }"
        >
          <img
            src="/images/hero-text.png"
            alt="Hero Text"
            :style="{
              width: ABOUT_HERO_TEXT_WIDTH + 'px',
              maxWidth: '100%',
            }"
          />
        </div>

        <!-- RIGHT: HERO VIDEO -->
        <div
          class="flex justify-center md:justify-start"
          :style="{
            paddingLeft: ABOUT_HERO_VIDEO_PADDING_LEFT + 'px',
          }"
        >
          <video
            src="/videos/dsa-about.mp4"
            playsinline
            autoplay
            muted
            class="h-auto"
            :style="{
              width: ABOUT_HERO_VIDEO_WIDTH * ABOUT_HERO_VIDEO_SCALE + 'px',
            }"
          ></video>
        </div>
      </div>
    </section>

    <!-- =================================================== -->
    <!-- 2. LETTER SECTION                                   -->
    <!-- =================================================== -->
    <section
      ref="letterSection"
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
    marginBottom: ABOUT_LETTER_TITLE_MARGIN_BOTTOM + 'px',
    color: ABOUT_TEXT_COLORS.letterTitle[locale]
  }"
>
  {{ locale === 'en' ? ABOUT_LETTER_TITLE_EN : ABOUT_LETTER_TITLE_ZH }}
</h2>
        <div
          class="w-full stagger-parent"
          :style="{ minHeight: ABOUT_LETTER_MIN_HEIGHT + 'px' }"
        >
          <div
            class="grid grid-cols-1 lg:grid-cols-2"
            :style="{
              columnGap: ABOUT_LETTER_COLUMN_GAP + 'rem',
              fontSize: ABOUT_LETTER_FONT_SIZE + 'rem',
              fontWeight: ABOUT_LETTER_BODY_WEIGHT,
              lineHeight: ABOUT_LETTER_LINE_HEIGHT,
              color: ABOUT_TEXT_COLORS.letterBody[locale]
            }"
          >
            <!-- LEFT COLUMN -->
            <div
              :class="[
                'flex flex-col text-justify stagger-item reveal-block',
                { 'reveal-visible': reveals.letter }
              ]"
              style="--reveal-delay: 120ms;"
            >
              <p
                v-for="(p, i) in letterParagraphs[locale].left"
                :key="'letter-left-' + i"
                :style="{ marginBottom: ABOUT_LETTER_PARAGRAPH_GAP + 'px' }"
              >
                {{ p }}
              </p>
            </div>

            <!-- RIGHT COLUMN -->
            <div
              :class="[
                'flex flex-col text-justify stagger-item reveal-block',
                { 'reveal-visible': reveals.letter }
              ]"
              style="--reveal-delay: 220ms;"
            >
              <p
                v-for="(p, i) in letterParagraphs[locale].right"
                :key="'letter-right-' + i"
                :style="{ marginBottom: ABOUT_LETTER_PARAGRAPH_GAP + 'px' }"
              >
                {{ p }}
              </p>
            </div>
          </div>
        </div>

        <!-- Signature -->
        <div
          class="flex justify-end signature-block"
          :style="{
            marginTop: ABOUT_SIGNATURE_TOP_MARGIN[locale] + 'px',
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
            class="text-right"
            :style="{
              fontSize: ABOUT_SIGNATURE_TEXT_SIZE + 'rem',
              lineHeight: ABOUT_SIGNATURE_LINE_HEIGHT,
              marginBottom: ABOUT_SIGNATURE_TEXT_BOTTOM_MARGIN + 'px',
              color: ABOUT_TEXT_COLORS.signatureText[locale]
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
      ref="mainSection"
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
          :style="{ gap: ABOUT_MAIN_GRID_GAP + 'px',  }"
        >
        <!-- =============================== -->
        <!-- LEFT COLUMN                     -->
        <!-- =============================== -->
        <div
          ref="introSection"
          :class="[
            'flex flex-col reveal-block',
            { 'reveal-visible': reveals.intro }
          ]"
          :style="{ rowGap: ABOUT_LEFT_COLUMN_SECTION_SPACING + 'px', }"
        >
          <!-- INTRO SECTION -->
          <div>
            <p
              class="tracking-[0.10em]"
              :style="{
                fontSize: ABOUT_INTRO_HEADING_SIZE + 'rem',
                marginBottom: ABOUT_INTRO_HEADING_SPACING + 'px',
                color: ABOUT_TEXT_COLORS.introHeading[locale],
                fontWeight: 100,
                fontStyle: 'italic'
              }"
            >
              简介 | INTRODUCTION
            </p>

            <div
              class="flex flex-col text-justify"
              :style="{
                fontSize: ABOUT_INTRO_TEXT_SIZE + 'rem',
                lineHeight: ABOUT_INTRO_LINE_HEIGHT,
                color: ABOUT_TEXT_COLORS.introHeading[locale],
                rowGap: ABOUT_INTRO_PARAGRAPH_GAP + 'px',
                textAlign: 'justify',
                textJustify: 'inter-word',
                fontWeight: 100,
                maxWidth: 510 + 'px',
                paddingLeft: 10 + 'px'
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
            ref="bioSection"
            class="bg-[#151E17] rounded-2xl shadow-lg border border-[#ECEBC7]/10 overflow-hidden bio-card-transition opa"
            :class="[bioCardClass, 'reveal-block', { 'reveal-visible': reveals.bio }]"
            :style="{
              maxWidth: ABOUT_BIO_MAX_WIDTH + 'px',
              padding: ABOUT_BIO_PADDING + 'px',
              borderRadius: '10px'
            }"
          >
            <h2
              class="font-semibold tracking-[2px]"
              :style="{
                fontSize: ABOUT_BIO_TITLE_SIZE + 'rem',
                marginBottom: ABOUT_BIO_TITLE_SPACING + 'px',
                fontWeight: 400,
                color: ABOUT_TEXT_COLORS.bioTitle[locale]
              }"
            >
              <span v-if="active.group === 'chinese'">
                {{ active.nameEn }} | {{ active.nameCn }}
              </span>
              <span v-else>
                {{ active.nameEn }}
              </span>
            </h2>


            <div
              class="transition-opacity duration-700 flex flex-col justify-center"
              :class="bioTextVisible ? 'opacity-100' : 'opacity-0'"
              :style="{
                fontWeight: 200,
                fontSize: ABOUT_BIO_TEXT_SIZE + 'rem',
                lineHeight: ABOUT_BIO_LINE_HEIGHT,
                rowGap: ABOUT_BIO_PARAGRAPH_GAP + 'px',
                textWrap: 'pretty',
                color: ABOUT_TEXT_COLORS.bioRole[locale],
                marginTop: ABOUT_BIO_TEXT_TOP_MARGIN + 'px',
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
          ref="teamSection"
          :class="[
            'flex flex-col reveal-block',
            { 'reveal-visible': reveals.team }
          ]"
          :style="{
            rowGap: ABOUT_TEAM_SECTION_SPACING + 'px',
            marginTop: ABOUT_TEAM_TOP_OFFSET + 'px'
          }"
        >
          <!-- Chinese Creativity -->
          <div class="flex justify-center text-center">
            <p
  :style="{
    fontSize: ABOUT_TEAM_LABEL_EN_SIZE + 'rem',
    color: ABOUT_TEXT_COLORS.bioClass[locale],
  }"
>
  <span
    :style="{ letterSpacing: ABOUT_TEAM_LABEL_KERNING_ZH }"
  >
    中国创意
  </span>

  <span
    :style="{ marginInline: ABOUT_TEAM_LABEL_GAP + 'px' }"
  ></span>

  <span
    :style="{ letterSpacing: ABOUT_TEAM_LABEL_KERNING_EN }"
  >
    CHINESE CREATIVITY
  </span>
</p>
          </div>

        <!-- TEAM GRID - CHINESE -->
<div class="flex flex-col items-center">
  
  <!-- ROW 1 — 4 columns -->
  <div
    class="grid grid-cols-2 md:grid-cols-4 justify-items-center"
    :style="{ gap: ABOUT_TEAM_GRID_GAP + 'px' }"
  >
    <button
      v-for="m in chineseRowOne"
      :key="m.id"
      class="flex flex-col items-center text-center group focus:outline-none"
      @click="selectMember(m.id)"
    >
      <div
        class="rounded-full transition-all ease-out"
        :class="avatarClass(m.id)"
        :style="{
          width: ABOUT_AVATAR_SIZE + 'px',
          height: ABOUT_AVATAR_SIZE + 'px'
        }"
      >
        <div class="w-full h-full rounded-full overflow-hidden">
          <img
            :src="m.avatar"
            :alt="m.nameEn"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <p
        class="tracking-[0em]"
        :class="{
          ' opacity-100, text-[#ECEBC7]': activeId === m.id,
          'opacity-100': activeId !== m.id
        }"
        :style="{
          fontSize: ABOUT_AVATAR_NAME_SIZE + 'rem',
          marginTop: ABOUT_AVATAR_NAME_TOP_MARGIN + 'px',
          paddingBottom: '3px',
          color: activeId === m.id ? '#ECEBC7' : ABOUT_TEXT_COLORS.avatarName[locale]
        }"
      >
        {{ m.nameEn }} | {{ m.nameCn }}
      </p>

      <p
        class="text-[#8C8C8C]/100"
        :style="{ fontWeight: 200,
        whiteSpace: 'pre-line',
        lineHeight: 14 + 'px',
          fontSize: ABOUT_AVATAR_ROLE_SIZE + 'rem' }"
      >
        {{ m.role[locale] }}
      </p>
    </button>
  </div>

  <!-- ROW 2 — centered 3 -->
<div
  v-if="chineseRowTwo.length"
  class="mt-12 grid justify-center"
>
  <div
    class="grid grid-cols-3 justify-items-center"
    :style="{ columnGap: ABOUT_TEAM_ROW_TWO_GAP + 'px' }"
  >
    <button
      v-for="m in chineseRowTwo"
      :key="m.id"
      class="flex flex-col items-center text-center group focus:outline-none"
      @click="selectMember(m.id)"
    >
      <div
        class="rounded-full transition-all ease-out"
        :class="avatarClass(m.id)"
        :style="{
          width: ABOUT_AVATAR_SIZE + 'px',
          height: ABOUT_AVATAR_SIZE + 'px'
        }"
      >
        <div class="w-full h-full rounded-full overflow-hidden">
          <img
            :src="m.avatar"
            :alt="m.nameEn"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <p
        class="tracking-[0em]"
        :class="{
          ' opacity-100': activeId === m.id,
          'opacity-100': activeId !== m.id
        }"
        :style="{
          fontSize: ABOUT_AVATAR_NAME_SIZE + 'rem',
          marginTop: ABOUT_AVATAR_NAME_TOP_MARGIN + 'px',
          paddingBottom: '3px',
          color: activeId === m.id ? '#ECEBC7' : ABOUT_TEXT_COLORS.avatarName[locale]
        }"
      >
        {{ m.nameEn }} | {{ m.nameCn }}
      </p>

      <p
        class="text-[#8C8C8C]/100"
        :style="{ fontWeight: 200,
        lineHeight: 14 + 'px',
          fontSize: ABOUT_AVATAR_ROLE_SIZE + 'rem' }"
      >
        {{ m.role[locale] }}
      </p>
    </button>
  </div>
</div>
</div>
          <!-- International Perspective -->
          <div
            class="flex justify-center text-center"
            :style="{ paddingTop: ABOUT_TEAM_SECOND_LABEL_TOP_PADDING + 'px' }"
          >
            <p
  :style="{
    fontSize: ABOUT_TEAM_LABEL_EN_SIZE + 'rem',
    color: ABOUT_TEXT_COLORS.bioClass[locale],
  }"
>
  <span
    :style="{ letterSpacing: ABOUT_TEAM_LABEL_KERNING_ZH }"
  >
    国际视野
  </span>

  <span
    :style="{ marginInline: ABOUT_TEAM_LABEL_GAP + 'px' }"
  ></span>

  <span
    :style="{ letterSpacing: ABOUT_TEAM_LABEL_KERNING_EN }"
  >
    INTERNATIONAL PERSPECTIVE
  </span>
</p>
          </div>

          <!-- TEAM GRID - INTERNATIONAL -->
<div
  class="flex justify-center cursor-default"
>
  <div
    class="flex items-start"
    :style="{ gap: ABOUT_TEAM_GRID_GAP * 2 + 'px' }"
  >
    <div
      v-for="m in internationalMembers"
      :key="m.id"
      class="flex flex-col items-center text-center"
    >
      <div
        class="rounded-full transition-all duration-500 ease-out"
        :style="{
          width: ABOUT_AVATAR_SIZE + 'px',
          height: ABOUT_AVATAR_SIZE + 'px'
        }"
      >
        <div class="w-full h-full rounded-full overflow-hidden">
          <img
            :src="m.avatar"
            :alt="m.nameEn"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <p
        class="tracking-[0em] font-regular opacity-100"
        :style="{
          fontSize: ABOUT_AVATAR_NAME_SIZE + 'rem',
          marginTop: ABOUT_AVATAR_NAME_TOP_MARGIN + 'px',
          color: ABOUT_TEXT_COLORS.avatarName[locale],
          paddingBottom: 3 + 'px'
        }"
      >
        {{ m.nameEn }}
      </p>

      <p
        class="text-[#ECEBC7]/60"
        :style="{ fontSize: ABOUT_AVATAR_ROLE_SIZE + 'rem',
        whiteSpace: 'pre-line',
        lineHeight: 14 + 'px',
        color: ABOUT_TEXT_COLORS.avatarRole[locale]
        }"
      >
        {{ m.role[locale] }}
      </p>
    </div>
  </div>
</div>
      </div> <!-- END RIGHT COLUMN -->
    </div> <!-- END MAIN GRID -->
  </main>
  </div>
</template>

<script setup lang="ts">
/* =============================================================
   ABOUT CONFIG — ALL NUMERIC VALUES LIVE HERE
   ============================================================= */

/* ---------- HERO ---------- */
const ABOUT_HERO_SECTION_MIN_HEIGHT = 750; // px: overall hero "length"
const ABOUT_HERO_SECTION_PADDING_TOP = 10;  // px: space above PNG
const ABOUT_HERO_SECTION_PADDING_BOTTOM = 20; // px: space below PNG

const ABOUT_HERO_IMAGE_WIDTH = 1150;        // px: visual width of PNG
const ABOUT_HERO_IMAGE_MAX_WIDTH = 1500;   // px: hard cap
const ABOUT_HERO_IMAGE_HEIGHT = 1000;       // px: max height constraint
const ABOUT_HERO_IMAGE_OPACITY = 1.0;      // 0–1

// NEW HERO CONSTANTS FOR ABOUT PAGE
const ABOUT_HERO_MAX_WIDTH = 3200;          // overall hero container width
const ABOUT_HERO_COLUMN_GAP = 0;           // gap between text & video
const ABOUT_HERO_CONTAINER_PADDING_LEFT = 120;   // shift hero block right
const ABOUT_HERO_CONTAINER_PADDING_RIGHT = 220;  // shift hero block left

const ABOUT_HERO_TEXT_WIDTH = 420;           // hero-text.png width (20% smaller)
const ABOUT_HERO_TEXT_PADDING_RIGHT = 10;    // spacing from center

const ABOUT_HERO_VIDEO_WIDTH = 1680;          // video width (20% larger)
const ABOUT_HERO_VIDEO_PADDING_LEFT = 10;    // spacing from center
const ABOUT_HERO_VIDEO_SCALE = 1.2; // 👈 THIS is your 20%

// ===== LETTER TITLE =====
const ABOUT_LETTER_TITLE_EN = "To My Friends and Partners,";
const ABOUT_LETTER_TITLE_ZH = "致我的朋友伙伴，";

const ABOUT_LETTER_TITLE_SIZE = 1.5;       // rem
const ABOUT_LETTER_TITLE_WEIGHT = 600;     // font-weight
const ABOUT_LETTER_TITLE_OPACITY = 0.92;
const ABOUT_LETTER_TITLE_MARGIN_BOTTOM = 74; // px

/* ---------- LETTER SECTION ---------- */
const ABOUT_LETTER_PADDING_Y = 100;
const ABOUT_LETTER_PADDING_X = 24;
const ABOUT_LETTER_MIN_HEIGHT = 1000;
const ABOUT_LETTER_MAX_WIDTH = 900;
const ABOUT_LETTER_COLUMN_GAP = 4;
const ABOUT_LETTER_FONT_SIZE = 1;
const ABOUT_LETTER_LINE_HEIGHT = 1.6;
const ABOUT_LETTER_BODY_WEIGHT = 100;
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
const ABOUT_SIGNATURE_TOP_MARGIN = {en:-180 , zh:-450};
const ABOUT_SIGNATURE_BOTTOM_MARGIN = 8;
const ABOUT_SIGNATURE_TEXT_SIZE = 0.9;
const ABOUT_SIGNATURE_LINE_HEIGHT = 1.5;
const ABOUT_SIGNATURE_TEXT_BOTTOM_MARGIN = 100;

/* ---------- MAIN CONTENT ---------- */
const ABOUT_MAIN_MAX_WIDTH = 1200;
const ABOUT_MAIN_PADDING_TOP = 100;
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
const ABOUT_BIO_TITLE_SPACING = 6;
const ABOUT_BIO_ROLE_SIZE = 0.8;
const ABOUT_BIO_ROLE_SPACING = 16;
const ABOUT_BIO_TEXT_SIZE = 0.8;
const ABOUT_BIO_LINE_HEIGHT = 2;
const ABOUT_BIO_PARAGRAPH_GAP = 8;
const ABOUT_BIO_TEXT_TOP_MARGIN = 32;

/* ---------- TEAM ---------- */
const ABOUT_TEAM_SECTION_SPACING = 40;
const ABOUT_TEAM_TOP_OFFSET = 100;
const ABOUT_TEAM_LABEL_EN_SIZE = 1.375;
const ABOUT_TEAM_GRID_GAP = 14;
const ABOUT_TEAM_ROW_TWO_GAP = 30; // 👈 NEW, px
const ABOUT_TEAM_SECOND_LABEL_TOP_PADDING = 20;
const chineseRowOne = computed(() => chineseMembers.value.slice(0, 4));
const chineseRowTwo = computed(() => chineseMembers.value.slice(4));
const ABOUT_TEAM_LABEL_GAP = -2; // px — tweak freely

/* ---------- AVATARS ---------- */
const ABOUT_AVATAR_SIZE = 90;
const ABOUT_AVATAR_NAME_SIZE = 0.813;
const ABOUT_AVATAR_NAME_TOP_MARGIN = 12;
const ABOUT_AVATAR_ROLE_SIZE = 0.688;

/* ---------- TEXT COLOR MAP (EN vs ZH, per section) ---------- */
const ABOUT_TEXT_COLORS = {
  letterTitle:    { en: "#D9D9D9", zh: "#D9D9D9" },
  letterBody:     { en: "#D9D9D9", zh: "#D9D9D9" },
  signatureText:  { en: "#D9D9D9", zh: "#D9D9D9" },

  introHeading:   { en: "#ECEBC7", zh: "#ECEBC7" },
  introBody:      { en: "#ECEBC7", zh: "#ECEBC7" },

  bioTitle:       { en: "#D9D9D9", zh: "#D9D9D9" },
  bioRole:        { en: "#D9D9D9", zh: "#D9D9D9" },
  bioBody:        { en: "#D9D9D9", zh: "#D9D9D9" },
  bioClass:       { en: "#ECEBC7", zh: "#ECEBC7" },

  teamLabel:      { en: "#8C8C8C", zh: "#8C8C8C" },
  avatarName:     { en: "#D9D9D9", zh: "#D9D9D9" },
  avatarRole:     { en: "#8C8C8C", zh: "#8C8C8C" },
} as const;

const ABOUT_TEAM_LABEL_KERNING = { en: -0.3, zh: -0.3}

const ABOUT_TEAM_LABEL_KERNING_ZH = '8px'; // Chinese wants tighter
const ABOUT_TEAM_LABEL_KERNING_EN = '0.1em';  // English wants air


/* =============================================================
   LOGIC (UNCHANGED)
   ============================================================= */
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useLocale } from "~/composables/useLocale";
import {
  letterParagraphs,
  introText,
  members as membersData,
} from "~/content/about";

definePageMeta({
  layout: "default",
  themeName: "landscape"
});

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
        "scale-[1.08]",
        "ring-1",
        "ring-[#ECEBC7]",
        "ring-opacity-100",
        "animate-ring-draw",
        "transition-transform",
        "duration-300",
        "ease-out",
        "hover:-translate-y-0.5",
      ].join(" ")
    : "transition-transform duration-300 ease-out hover:-translate-y-0.5";
}

/* SCROLL-TRIGGERED REVEALS */
const heroSection = ref<HTMLElement | null>(null);
const letterSection = ref<HTMLElement | null>(null);
const mainSection = ref<HTMLElement | null>(null);
const introSection = ref<HTMLElement | null>(null);
const bioSection = ref<HTMLElement | null>(null);
const teamSection = ref<HTMLElement | null>(null);

const reveals = ref({
  hero: false,
  letter: false,
  intro: false,
  bio: false,
  team: false,
});

const observerRef = ref<IntersectionObserver | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        if (target === heroSection.value) reveals.value.hero = true;
        if (target === letterSection.value) reveals.value.letter = true;
        if (target === introSection.value) reveals.value.intro = true;
        if (target === bioSection.value) reveals.value.bio = true;
        if (target === teamSection.value) reveals.value.team = true;
        observer.unobserve(target);
      });
    },
    {
      threshold: 0.25,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  [
    heroSection.value,
    letterSection.value,
    introSection.value,
    bioSection.value,
    teamSection.value,
    mainSection.value,
  ].forEach((el) => el && observer.observe(el));

  observerRef.value = observer;
});

onBeforeUnmount(() => {
  observerRef.value?.disconnect();
});
</script>

<style scoped>
.bio-card-transition {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition-duration: 500ms;
}

.signature-block {
  break-inside: avoid;
}

/* Reveal system */
.reveal-block {
  opacity: 0;
  transform: translateY(26px);
  transition:
    opacity 900ms cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 1000ms cubic-bezier(0.25, 0.1, 0.25, 1);
  transition-delay: var(--reveal-delay, 0ms);
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

.stagger-parent {
  --reveal-delay: 0ms;
}

.stagger-item {
  transition-delay: var(--reveal-delay, 0ms);
}

/* Ring draw animation */
@keyframes ringDraw {
  from {
    box-shadow: 0 0 0 0 rgba(236, 235, 199, 0);
  }
  to {
    box-shadow: 0 0 0 1px rgba(236, 235, 199, 1);
  }
}

.animate-ring-draw {
  animation: ringDraw 220ms ease-out forwards;
}

/* Hero texture: slow drift + glow */
@keyframes slowFloat {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}

.hero-text-float {
  animation: slowFloat 9s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .reveal-block,
  .stagger-item,
  .hero-text-float {
    animation: none !important;
    transition-duration: 0ms !important;
  }
}
</style>

<!-- pages/about.vue -->
<template>
  <div
    class="bg-[#000C05] text-[#ECEBC7] min-h-screen"
    :style="{ '--footer-margin-top': '0px' }"
  >
    <!-- =================================================== -->
    <!-- 1. HERO (TRANSPARENT PNG, FULL-HEIGHT SECTION)      -->
    <!-- =================================================== -->
    <section
      ref="heroSection"
      :class="[
        'bg-[#000A04] w-full flex items-center justify-center relative about-hero',
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
        class="mx-auto flex items-center justify-center about-hero-inner"
        :style="{
          maxWidth: ABOUT_HERO_MAX_WIDTH + 'px',
          paddingLeft: ABOUT_HERO_CONTAINER_PADDING_LEFT + 'px',
          paddingRight: ABOUT_HERO_CONTAINER_PADDING_RIGHT + 'px',
        }"
      >
        <video
          src="/videos/dsa-about-update-update.webm"
          playsinline
          autoplay
          muted
          class="h-auto reveal-block about-hero-video"
          :class="{ 'reveal-visible': reveals.hero }"
          :style="{
            width: ABOUT_HERO_VIDEO_WIDTH * ABOUT_HERO_VIDEO_SCALE + 'px',
            maxWidth: '100%',
          }"
        ></video>
      </div>
    </section>

    <!-- =================================================== -->
    <!-- 1B. INTRO HERO                                      -->
    <!-- =================================================== -->
    <section
      class="w-full about-intro-hero bg-[#151E17]"
      :style="{
        paddingTop: ABOUT_INTRO_HERO_PADDING_Y + 'px',
        paddingBottom: ABOUT_INTRO_HERO_PADDING_Y + 'px',
        paddingLeft: ABOUT_INTRO_HERO_PADDING_LEFT + 'px',
        paddingRight: ABOUT_INTRO_HERO_PADDING_RIGHT + 'px'
      }"
    >
      <div
        class="mx-auto about-intro-hero-inner about-intro-hero-anim"
        :style="{
          maxWidth: ABOUT_INTRO_HERO_MAX_WIDTH + 'px',
          columnGap: ABOUT_INTRO_HERO_GAP + 'px',
          width: '100%'
        }"
      >
        <div class="about-intro-hero-text">
          <p
            :style="{
              fontSize: ABOUT_INTRO_HERO_TITLE_SIZE + 'rem',
              marginBottom: ABOUT_INTRO_HERO_TITLE_SPACING + 'px',
              paddingTop: ABOUT_INTRO_HERO_TITLE_PADDING_TOP + 'px',
              letterSpacing: ABOUT_INTRO_HERO_TITLE_TRACKING + 'em',
              color: '#8C8C8C',
              fontWeight: 100,
              fontStyle: 'italic'
            }"
          >
            简介 | INTRODUCTION
          </p>
          <h3
            class="font-semibold"
            :style="{
              fontSize: ABOUT_INTRO_HERO_NAME_SIZE + 'rem',
              marginBottom: ABOUT_INTRO_HERO_NAME_SPACING + 'px',
              color: ABOUT_TEXT_COLORS.introHeading[locale]
            }"
          >
            DSA Dayoung
          </h3>

          <div
            class="flex flex-col text-justify"
            :style="{
              fontSize: ABOUT_INTRO_HERO_TEXT_SIZE + 'rem',
              lineHeight: ABOUT_INTRO_HERO_LINE_HEIGHT,
              color: ABOUT_TEXT_COLORS.introHeading[locale],
              rowGap: ABOUT_INTRO_HERO_PARAGRAPH_GAP + 'px',
              textAlign: 'justify',
              textWrap: 'pretty',
              textJustify: 'inter-word',
              fontWeight: 100
            }"
          >
            <p>
              DSA大漾一家以新生态文化艺术美学为导向，致力于公共环境空间营造的创新设计平台。通过景观建筑、动态光影、公共艺术专业共创实践，创造多维度高价值空间使用体验。大以中国创意 +国际视野，系统重塑公共环境空间价值，即可提供从环境更新、光环境到环境艺术的全过程综合解决方案，实现空间活化、长效运营与生态可持续发展。
            </p>
            <p>
              DSA Dayoung is an innovative design platform guided by a new ecological art aesthetic, dedicated to creating public environmental spaces. Through collaborative practice in landscape architecture, dynamic lighting, and public art, we create multi-dimensional, high-value spatial experiences. With Chinese creativity and an international perspective, Danyang systemically reshapes the value of public environmental spaces, providing comprehensive solutions for the entire process, from environmental renewal and lighting environments to environmental art, achieving spatial revitalization, long-term operation, and ecological sustainability.
            </p>
          </div>
        </div>

        <div class="about-intro-hero-image">
            <img
              src="/images/Introduction-Background-Image.jpg"
              alt="Introduction background"
            />
        </div>
      </div>
    </section>

    <!-- =================================================== -->
    <!-- 2. HOME ECHO SECTION                                -->
    <!-- =================================================== -->
    <section
      class="w-full about-home-echo"
      :style="{
        paddingTop: ABOUT_HOME_ECHO_PADDING_TOP + 'px',
        paddingBottom: ABOUT_HOME_ECHO_PADDING_BOTTOM + 'px',
        paddingLeft: ABOUT_HOME_ECHO_PADDING_X + 'px',
        paddingRight: ABOUT_HOME_ECHO_PADDING_X + 'px'
      }"
    >
      <div
        class="mx-auto about-home-echo-inner about-home-echo-anim"
        :style="{
          maxWidth: ABOUT_HOME_ECHO_MAX_WIDTH + 'px',
          columnGap: ABOUT_HOME_ECHO_GAP + 'px'
        }"
      >
        <div class="about-home-echo-left about-home-echo-anim">
          <img
            :src="HOME_HERO_SRC"
            alt="DSA Home Hero"
            :style="{
              width: HOME_HERO_WIDTH + 'px',
              maxWidth: HOME_HERO_MAX_WIDTH + 'px',
              height: HOME_HERO_HEIGHT + 'px'
            }"
          />
          <h3
            :style="{
              fontSize: HOME_HEADLINE_CN_SIZE + 'px',
              letterSpacing: HOME_HEADLINE_CN_SPACING + 'em',
              marginTop: ABOUT_HOME_ECHO_HEADLINE_MARGIN_TOP + 'px',
              color: HOME_TEXT_COLOR
            }"
          >
            {{ ABOUT_HOME_ECHO_HEADLINE_CN }}
          </h3>
          <p
            :style="{
              fontSize: HOME_HEADLINE_EN_SIZE + 'px',
              letterSpacing: HOME_HEADLINE_EN_SPACING + 'em',
              marginTop: HOME_HEADLINE_EN_MARGIN_TOP + 'px',
              color: HOME_TEXT_COLOR
            }"
          >
            {{ HOME_HEADLINE_EN }}
          </p>
        </div>

        <div
          class="about-home-echo-right about-home-echo-anim"
          :style="{
            maxWidth: HOME_BODY_MAX_WIDTH * 0.85 + 'px',
            fontSize: HOME_BODY_SIZE + 'px',
            lineHeight: HOME_BODY_LINE_HEIGHT,
            color: HOME_TEXT_COLOR_SOFT
          }"
        >
          <p
            v-for="(p, i) in HOME_BODY_CN"
            :key="'home-cn-' + i"
            class="text-justify"
            :style="{
              marginBottom: HOME_BODY_PARAGRAPH_GAP + 'px',
              fontWeight: HOME_BODY_WEIGHT_CN,
              letterSpacing: HOME_BODY_SPACING_CN + 'px',
              textWrap: 'pretty',
              textAlign: 'justify',
              textJustify: 'inter-word'
            }"
          >
            {{ p }}
          </p>
          <p
            v-for="(p, i) in HOME_BODY_EN"
            :key="'home-en-' + i"
            class="text-justify"
            :style="{
              marginBottom: HOME_BODY_PARAGRAPH_GAP + 'px',
              fontWeight: HOME_BODY_WEIGHT,
              letterSpacing: HOME_BODY_SPACING_EN + 'px',
              textWrap: 'pretty',
              textAlign: 'justify',
              textJustify: 'inter-word'
            }"
          >
            {{ p }}
          </p>
        </div>
      </div>
    </section>

    <!-- =================================================== -->
    <!-- 3. MAIN CONTENT                                     -->
    <!-- =================================================== -->
    <main
      ref="mainSection"
      class="mx-auto about-main"
      :style="{
        maxWidth: ABOUT_MAIN_MAX_WIDTH + 'px',
        paddingTop: ABOUT_MAIN_PADDING_TOP + 'px',
        paddingBottom: ABOUT_MAIN_PADDING_BOTTOM + 'px',
        paddingLeft: ABOUT_MAIN_PADDING_X_REM + 'rem',
        paddingRight: ABOUT_MAIN_PADDING_X_REM + 'rem'
      }"
    >
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 about-main-grid"
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
                color: '#8C8C8C',
                fontWeight: 100,
                fontStyle: 'italic'
              }"
            >
              团队 | TEAM
            </p>
          </div>

          <!-- BIO CARD -->
          <div
          ref="bioSection"
          class="bg-[#151E17] rounded-2xl shadow-lg border border-[#ECEBC7]/10 overflow-hidden bio-card-transition opa bio-card"
          :class="[bioCardClass, 'reveal-block', { 'reveal-visible': reveals.bio }]"
          v-if="!isMobile"
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
        class="rounded-full transition-all ease-out avatar-circle"
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
        class="rounded-full transition-all ease-out avatar-circle"
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
    <button
      v-for="m in internationalMembers"
      :key="m.id"
      type="button"
      class="flex flex-col items-center text-center group focus:outline-none"
      @click="selectMember(m.id)"
    >
      <div
        class="rounded-full transition-all duration-500 ease-out"
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
        class="tracking-[0em] font-regular opacity-100"
        :style="{
          fontSize: ABOUT_AVATAR_NAME_SIZE + 'rem',
          marginTop: ABOUT_AVATAR_NAME_TOP_MARGIN + 'px',
          color: activeId === m.id ? '#ECEBC7' : ABOUT_TEXT_COLORS.avatarName[locale],
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
    </button>
  </div>
</div>

        <!-- Mobile Bio (after team) -->
        <div
          v-if="hydrated && isMobile"
          class="bg-[#151E17] rounded-2xl shadow-lg border border-[#ECEBC7]/10 overflow-hidden bio-card-transition opa bio-card mt-10 bio-card-mobile"
          :class="[bioCardClass, 'reveal-block', { 'reveal-visible': reveals.bio }]"
          :style="{
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

          <p
            :style="{
              color: ABOUT_TEXT_COLORS.bioRole[locale],
              fontSize: ABOUT_BIO_ROLE_SIZE + 'rem',
              letterSpacing: ABOUT_BIO_ROLE_TRACKING + 'px',
              marginBottom: ABOUT_BIO_ROLE_MARGIN_BOTTOM + 'px'
            }"
          >
            {{ active.role[locale] }}
          </p>

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
              :key="'bio-mobile-' + i"
            >
              {{ p }}
            </p>
          </div>
        </div>
      </div> <!-- END RIGHT COLUMN -->
    </div> <!-- END MAIN GRID -->
  </main>

    <!-- =================================================== -->
    <!-- 4. LETTER SECTION                                   -->
    <!-- =================================================== -->
    <section
      ref="letterSection"
      class="w-full bg-cover bg-center relative about-letter"
      :style="{
        backgroundImage: `url('/images/about-letter-bg.png')`,
        paddingLeft: ABOUT_LETTER_PADDING_X + 'px',
        paddingRight: ABOUT_LETTER_PADDING_X + 'px',
        paddingTop: ABOUT_LETTER_PADDING_TOP + 'px',
        paddingBottom: ABOUT_LETTER_PADDING_BOTTOM + 'px'
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
          class="w-full stagger-parent about-letter-flow"
          :style="{
            minHeight: ABOUT_LETTER_MIN_HEIGHT + 'px',
            fontSize: ABOUT_LETTER_FONT_SIZE + 'rem',
            fontWeight: ABOUT_LETTER_BODY_WEIGHT,
            lineHeight: ABOUT_LETTER_LINE_HEIGHT,
            color: ABOUT_TEXT_COLORS.letterBody[locale]
          }"
        >
          <div
            :class="[
              'flex flex-col text-justify stagger-item reveal-block',
              { 'reveal-visible': reveals.letter }
            ]"
            style="--reveal-delay: 120ms;"
          >
            <p
              v-for="(p, i) in letterParagraphsCombined[locale]"
              :key="'letter-' + i"
              :style="{ marginBottom: ABOUT_LETTER_PARAGRAPH_GAP + 'px' }"
            >
              {{ p }}
            </p>

            <p
              class="about-letter-signature text-right"
              :style="{
                fontSize: (isMobile ? ABOUT_SIGNATURE_TEXT_SIZE * 0.9 : ABOUT_SIGNATURE_TEXT_SIZE) + 'rem',
                lineHeight: ABOUT_SIGNATURE_LINE_HEIGHT,
                marginBottom: (isMobile ? 12 : ABOUT_SIGNATURE_TEXT_BOTTOM_MARGIN) + 'px',
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
        </div>

        <!-- Signature -->
        <!--
        <div
          class="flex justify-end signature-block"
          :style="{
            marginTop: isMobile
              ? (locale === 'zh' ? '-200px' : '4px')
              : ABOUT_SIGNATURE_TOP_MARGIN[locale] + 'px',
            marginBottom: isMobile ? '10px' : ABOUT_SIGNATURE_BOTTOM_MARGIN + 'px'
          }"
        >
          <img
            src="/images/signature.png"
            alt="Signature"
            :style="{
              height: (isMobile ? ABOUT_SIGNATURE_HEIGHT * 0.75 : ABOUT_SIGNATURE_HEIGHT) + 'px',
              width: 'auto',
              opacity: ABOUT_SIGNATURE_OPACITY
            }"
          />
        </div>
        -->

      </div>
    </section>
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
const ABOUT_HERO_CONTAINER_PADDING_LEFT = 220;   // shift hero block right
const ABOUT_HERO_CONTAINER_PADDING_RIGHT = 220;  // shift hero block left

const ABOUT_HERO_TEXT_WIDTH = 420;           // hero-text.png width (20% smaller)
const ABOUT_HERO_TEXT_PADDING_RIGHT = 10;    // spacing from center

const ABOUT_HERO_VIDEO_WIDTH = 1000;          // video width (20% larger)
const ABOUT_HERO_VIDEO_PADDING_LEFT = 10;    // spacing from center
const ABOUT_HERO_VIDEO_SCALE = 1; // 👈 THIS is your 20%

// INTRO HERO (NEW SECTION BELOW HERO)
const ABOUT_INTRO_HERO_MAX_WIDTH = 1600;
const ABOUT_INTRO_HERO_PADDING_LEFT = 24;
const ABOUT_INTRO_HERO_PADDING_RIGHT = 0;
const ABOUT_INTRO_HERO_PADDING_Y = 0;
const ABOUT_INTRO_HERO_GAP = 30;
const ABOUT_INTRO_HERO_TITLE_SIZE = 1.05;
const ABOUT_INTRO_HERO_TITLE_SPACING = 150;
const ABOUT_INTRO_HERO_TITLE_PADDING_TOP = 50;
const ABOUT_INTRO_HERO_TITLE_TRACKING = 0.02;
const ABOUT_INTRO_HERO_NAME_SIZE = 1.35;
const ABOUT_INTRO_HERO_NAME_SPACING = 18;
const ABOUT_INTRO_HERO_TEXT_SIZE = 0.9;
const ABOUT_INTRO_HERO_LINE_HEIGHT = 1.7;
const ABOUT_INTRO_HERO_PARAGRAPH_GAP = 18;

// HOME ECHO SECTION (BELOW INTRO HERO)
const ABOUT_HOME_ECHO_MAX_WIDTH = 1400;
const ABOUT_HOME_ECHO_PADDING_X = 24;
const ABOUT_HOME_ECHO_PADDING_TOP = 220;
const ABOUT_HOME_ECHO_PADDING_BOTTOM = 80;
const ABOUT_HOME_ECHO_GAP = 90;
const ABOUT_HOME_ECHO_HEADLINE_MARGIN_TOP = HOME_HEADLINE_MARGIN_TOP * 0.4;
const ABOUT_HOME_ECHO_HEADLINE_CN = "系统化营造空间整体氛围";

// ===== LETTER TITLE =====
const ABOUT_LETTER_TITLE_EN = "To My Friends and Partners,";
const ABOUT_LETTER_TITLE_ZH = "致我的朋友伙伴，";

const ABOUT_LETTER_TITLE_SIZE = 1.5;       // rem
const ABOUT_LETTER_TITLE_WEIGHT = 600;     // font-weight
const ABOUT_LETTER_TITLE_OPACITY = 0.92;
const ABOUT_LETTER_TITLE_MARGIN_BOTTOM = 74; // px

/* ---------- LETTER SECTION ---------- */
const ABOUT_LETTER_PADDING_TOP = 120;
const ABOUT_LETTER_PADDING_BOTTOM = 40;
const ABOUT_LETTER_PADDING_X = 24;
const ABOUT_LETTER_MIN_HEIGHT = 700;
const ABOUT_LETTER_MAX_WIDTH = 900;
const ABOUT_LETTER_COLUMN_GAP = 4;
const ABOUT_LETTER_FONT_SIZE = 1;
const ABOUT_LETTER_LINE_HEIGHT = 1.6;
const ABOUT_LETTER_BODY_WEIGHT = 100;
const ABOUT_LETTER_PARAGRAPH_GAP = 16;

/* ---------- LETTER FOOTER ---------- */
const ABOUT_FOOTER_TEXT = {
  en: {
    regards: "",
    name: "Ouyang Xiaoping",
    location: "2026 · Shenzhen",
  },
  zh: {
    regards: "",
    name: "欧阳小平",
    location: "2026 年 · 深圳",
  },
} as const;

/* ---------- SIGNATURE ---------- */
const ABOUT_SIGNATURE_HEIGHT = 56;
const ABOUT_SIGNATURE_OPACITY = 0.9;
const ABOUT_SIGNATURE_TOP_MARGIN = {en:-180 , zh:-450};
const ABOUT_SIGNATURE_BOTTOM_MARGIN = 8;
const ABOUT_SIGNATURE_TEXT_SIZE = 0.9;
const ABOUT_SIGNATURE_LINE_HEIGHT = 1.5;
const ABOUT_SIGNATURE_TEXT_BOTTOM_MARGIN = 40;

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

const letterParagraphsCombined = {
  en: [
    ...letterParagraphs.en.left,
    ...letterParagraphs.en.right,
  ],
  zh: [
    ...letterParagraphs.zh.left,
    ...letterParagraphs.zh.right,
  ],
};


/* =============================================================
   LOGIC (UNCHANGED)
   ============================================================= */
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useLocale } from "~/composables/useLocale";
import {
  letterParagraphs,
  members as membersData,
} from "~/content/about";
import {
  HOME_BODY_CN,
  HOME_BODY_EN,
  HOME_BODY_LINE_HEIGHT,
  HOME_BODY_MAX_WIDTH,
  HOME_BODY_PARAGRAPH_GAP,
  HOME_BODY_SIZE,
  HOME_BODY_SPACING_CN,
  HOME_BODY_SPACING_EN,
  HOME_BODY_WEIGHT,
  HOME_BODY_WEIGHT_CN,
  HOME_HEADLINE_CN,
  HOME_HEADLINE_CN_SIZE,
  HOME_HEADLINE_CN_SPACING,
  HOME_HEADLINE_EN,
  HOME_HEADLINE_EN_SIZE,
  HOME_HEADLINE_EN_SPACING,
  HOME_HEADLINE_EN_MARGIN_TOP,
  HOME_HEADLINE_MARGIN_TOP,
  HOME_HERO_HEIGHT,
  HOME_HERO_MAX_WIDTH,
  HOME_HERO_SRC,
  HOME_HERO_WIDTH,
  HOME_TEXT_COLOR,
  HOME_TEXT_COLOR_SOFT,
} from "~/content/home";

definePageMeta({
  layout: "default",
  themeName: "landscape"
});

const { locale } = useLocale();

/* TEAM + BIOS */
const members = ref(membersData);
const activeId = ref("bitch");
const isMobile = ref(false);
const hydrated = ref(false);

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
  if (id === activeId.value) {
    if (isMobile.value) scrollToBio();
    return;
  }

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
    if (isMobile.value) scrollToBio();
  }, 50);
}

function scrollToBio() {
  // On mobile, scroll to the mobile bio card placed after the team list
  const target = document.querySelector(".bio-card-mobile");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  }
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
  if (import.meta.client) {
    const mq = window.matchMedia("(max-width: 700px)");
    const setMobile = (e: MediaQueryList | MediaQueryListEvent) => {
      isMobile.value = e.matches;
      if (isMobile.value) {
        // Ensure content is visible even if the observer misses on small screens
        reveals.value.hero = true;
        reveals.value.letter = true;
        reveals.value.intro = true;
        reveals.value.bio = true;
        reveals.value.team = true;
      }
    };
    setMobile(mq);
    mq.addEventListener("change", setMobile);
    onBeforeUnmount(() => mq.removeEventListener("change", setMobile));
  }
  hydrated.value = true;

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

.about-intro-hero-inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.about-intro-hero-text {
  max-width: 620px;
  padding-left: 130px;
}

.about-intro-hero-image {
  width: 50vw;
  max-width: 50vw;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: calc(50% - 50vw);
}

.about-intro-hero-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-home-echo-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
}

.about-home-echo-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
}

.about-home-echo-left img {
  display: block;
  margin: 0 auto;
}

.about-letter-flow {
  column-gap: 0;
}

.about-letter-signature {
  break-inside: avoid;
  margin-top: 24px;
}

.about-home-echo-anim {
  opacity: 0;
  transform: translateY(16px);
  animation: homeEchoFade 1s ease-out forwards;
}

.about-home-echo-left.about-home-echo-anim {
  animation-delay: 120ms;
}

.about-home-echo-right.about-home-echo-anim {
  animation-delay: 240ms;
}

.about-home-echo-left.about-home-echo-anim img {
  animation: homeEchoFloat 9s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes homeEchoFade {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes homeEchoFloat {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.about-intro-hero-anim {
  opacity: 0;
  transform: translateY(18px);
  animation: introFadeUp 1.1s ease-out forwards;
}

.about-intro-hero-text.about-intro-hero-anim {
  animation-delay: 120ms;
}

.about-intro-hero-image.about-intro-hero-anim {
  animation-delay: 240ms;
  animation-name: introFadeUp, introFloat;
  animation-duration: 1.1s, 10s;
  animation-timing-function: ease-out, ease-in-out;
  animation-iteration-count: 1, infinite;
  animation-fill-mode: forwards, none;
  animation-delay: 240ms, 1.1s;
}

@keyframes introFadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes introFloat {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
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
  .hero-text-float,
  .about-intro-hero-anim,
  .about-home-echo-anim {
    animation: none !important;
    transition-duration: 0ms !important;
  }
}

@media (min-width: 701px) and (max-width: 1100px) {
  .about-hero {
    padding-top: 88px !important;
    padding-bottom: 72px !important;
  }

  .about-hero-inner {
    max-width: 92vw !important;
    padding-left: 12px !important;
    padding-right: 12px !important;
  }

  .about-hero-video {
    width: clamp(520px, 68vw, 760px) !important;
  }

  .about-letter {
    padding-left: 32px !important;
    padding-right: 32px !important;
    padding-top: 72px !important;
    padding-bottom: 72px !important;
  }

  .about-letter-grid {
    column-gap: 1.8rem !important;
    font-size: 1.05rem !important;
  }

  .about-main {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
    padding-top: 84px !important;
    padding-bottom: 96px !important;
  }

  .about-main-grid {
    gap: 32px !important;
  }
}

@media (min-width: 1024px) {
  .about-letter-flow {
    column-count: 2;
    column-gap: 1.8rem;
  }

  .about-letter-signature {
    column-span: all;
  }
}

@media (max-width: 900px) {
  .about-intro-hero {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .about-intro-hero-inner {
    flex-direction: column;
    row-gap: 32px;
  }

  .about-intro-hero-text {
    max-width: 100%;
    padding-left: 30px;
    padding-right: 30px;
  }

  .about-intro-hero-image {
    width: 100vw;
    max-width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }

  .about-home-echo-inner {
    grid-template-columns: 1fr;
    row-gap: 40px;
  }
}

@media (min-width: 1101px) {
  .about-home-echo-left {
    padding-left: 55px;
  }
}

@media (max-width: 700px) {
  .about-hero {
    padding: 72px 0 16px 0 !important;
    min-height: auto !important;
  }

  .about-hero-inner {
    max-width: 100vw !important;
    width: 100vw !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .about-hero-video {
    width: 100vw !important;
    max-width: none !important;
    min-width: 360px !important;
    margin: 0 auto;
  }

  .about-letter {
    padding-left: 18px !important;
    padding-right: 18px !important;
    padding-top: 40px !important;
    padding-bottom: 40px !important;
    background-size: cover;
  }

  .about-letter-grid {
    font-size: 1rem !important;
    color: #ecebc7 !important;
  }

  .about-main {
    padding-left: 1.2rem !important;
    padding-right: 1.2rem !important;
    padding-top: 56px !important;
    padding-bottom: 56px !important;
  }

  .about-main-grid {
    gap: 24px !important;
  }

  .bio-card {
    max-width: 100% !important;
  }

  .avatar-circle {
    transform: scale(0.9);
  }
}
</style>

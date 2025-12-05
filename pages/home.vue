<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start px-6 text-center"
    :style="{
      backgroundColor: HOME_BG_COLOR,
      color: HOME_TEXT_COLOR,
      paddingTop: HOME_TOP_PADDING + 'px'
    }"
  >
    <!-- HERO IMAGE — CLICKABLE -->
    <div
      class="cursor-pointer select-none transition-transform duration-500 ease-out"
      @mousemove="handleMouseMove"
      @mouseleave="resetTilt"
      @click="goAbout"
      :style="{ transform: tiltStyle }"
    >
      <img
        :src="HOME_HERO_SRC"
        alt="DSA Home Hero"
        class="h-auto"
        :style="{
          width: HOME_HERO_WIDTH + 'px',
          maxWidth: HOME_HERO_MAX_WIDTH + 'px'
        }"
      />
    </div>

    <!-- HEADLINE CN -->
    <h2
      :style="{
        fontFamily: HOME_TYPO.HEADLINE_CN_FONT,
        fontWeight: HOME_TYPO.HEADLINE_CN_WEIGHT,
        fontSize: HOME_HEADLINE_CN_SIZE + 'px',
        marginTop: HOME_HEADLINE_MARGIN_TOP + 'px',
        letterSpacing: HOME_HEADLINE_CN_SPACING + 'em',
      }"
    >
      {{ HOME_HEADLINE_CN }}
    </h2>

    <!-- HEADLINE EN -->
    <p
      :style="{
        fontFamily: HOME_TYPO.HEADLINE_EN_FONT,
        fontWeight: HOME_TYPO.HEADLINE_EN_WEIGHT,
        fontSize: HOME_HEADLINE_EN_SIZE + 'px',
        marginTop: HOME_HEADLINE_EN_MARGIN_TOP + 'px',
        letterSpacing: HOME_HEADLINE_EN_SPACING + 'em',
        marginBottom: '45px',
      }"
    >
      {{ HOME_HEADLINE_EN }}
    </p>

    <!-- EN BODY TEXT -->
    <div
      class="mx-auto text-center"
      :style="{
        maxWidth: HOME_BODY_MAX_WIDTH + 'px',
        fontSize: HOME_BODY_SIZE + 'px',
        lineHeight: HOME_BODY_LINE_HEIGHT,
        marginTop: HOME_BODY_EN_MARGIN_TOP + 'px',
        color: HOME_TEXT_COLOR_SOFT
      }"
    >
      <p
        v-for="(p, i) in HOME_BODY_EN"
        :key="'en-' + i"
        class="text-justify"
        :style="{ marginBottom: HOME_BODY_PARAGRAPH_GAP + 'px', fontWeight: HOME_BODY_WEIGHT, }"
      >
        {{ p }}
      </p>
    </div>

    <!-- CN BODY TEXT -->
    <div
      class="mx-auto text-center"
      :style="{
        maxWidth: HOME_BODY_MAX_WIDTH + 'px',
        fontSize: HOME_BODY_SIZE + 'px',
        lineHeight: HOME_BODY_LINE_HEIGHT,
        marginTop: HOME_BODY_CN_MARGIN_TOP + 'px',
        color: HOME_TEXT_COLOR_SOFT
      }"
    >
      <p
        v-for="(p, i) in HOME_BODY_CN"
        :key="'cn-' + i"
        class="text-justify"
        :style="{ marginBottom: HOME_BODY_PARAGRAPH_GAP + 'px' , fontWeight: HOME_BODY_WEIGHT_CN}"
      >
        {{ p }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGlobalFade } from "~/composables/useGlobalFade";

import {
  HOME_BG_COLOR,
  HOME_TEXT_COLOR,
  HOME_TEXT_COLOR_SOFT,
  HOME_TOP_PADDING,
  HOME_HERO_SRC,
  HOME_HERO_WIDTH,
  HOME_HERO_MAX_WIDTH,
  HOME_HERO_HOVER_SCALE,
  HOME_HEADLINE_CN,
  HOME_HEADLINE_EN,
  HOME_HEADLINE_CN_SIZE,
  HOME_HEADLINE_EN_SIZE,
  HOME_HEADLINE_MARGIN_TOP,
  HOME_HEADLINE_EN_MARGIN_TOP,
  HOME_BODY_EN,
  HOME_BODY_CN,
  HOME_BODY_MAX_WIDTH,
  HOME_BODY_SIZE,
  HOME_BODY_LINE_HEIGHT,
  HOME_BODY_PARAGRAPH_GAP,
  HOME_BODY_EN_MARGIN_TOP,
  HOME_BODY_CN_MARGIN_TOP,
  HOME_HEADLINE_EN_SPACING,
  HOME_HEADLINE_CN_SPACING,
  HOME_BODY_WEIGHT,
  HOME_BODY_WEIGHT_CN
} from "~/content/home";

const HOME_TYPO = { HEADLINE_EN_FONT: "Inter",
HEADLINE_EN_WEIGHT: 200,
HEADLINE_CN_FONT: "Heiti SC",
HEADLINE_CN_WEIGHT: 500,
  BODY_EN_FONT: "Inter",
  BODY_CN_FONT: "Heiti SC",

};



definePageMeta({
  layout: "landing",
});

// Fade navigation → about page
const { navigateWithFade } = useGlobalFade();
const goAbout = () => navigateWithFade("/home");

/* --------------------------------
   PARALLAX HOVER
-------------------------------- */
const tiltStyle = ref("rotateX(0deg) rotateY(0deg)");

function handleMouseMove(e: MouseEvent) {
  const maxTilt = 3;
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();

  const percentX = (e.clientX - rect.left) / rect.width - 0.5;
  const percentY = (e.clientY - rect.top) / rect.height - 0.5;

  const tiltX = maxTilt * percentY;
  const tiltY = -maxTilt * percentX;

  tiltStyle.value = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${HOME_HERO_HOVER_SCALE})`;
}

function resetTilt() {
  tiltStyle.value = "rotateX(0deg) rotateY(0deg) scale(1)";
}
</script>

<style scoped></style>